import Vue from 'vue'

const install = _Vue => {
    const Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

const forEach = (obj, cb) => {
    for (const idx in obj) {
        if (obj.hasOwnProperty(idx)) {
            cb(idx, obj[idx])
        }
    }
}

class Store {
    constructor(options) {
        this.getters = {}
        this.mutations = {}
        this.actions = {}
        const { state, getters, mutations, actions } = options

        // 初始化一个 Vue 实例, 保证数据响应式
        this._vm = new Vue({
            data: {
                state
            }
        })

        // 初始化 getters
        forEach(getters, (name, getterFun) => {
            Object.defineProperty(this.getters, name, {
                get: () => getterFun(state)
            })
        })

        // 初始化 mutations
        forEach(mutations, (mutationName, mutationFun) => {
            this.mutations[mutationName] = () => mutationFun(state)
        })

        // 初始化 actions
        forEach(actions, (actionName, actionFun) => {
            this.actions[actionName] = () => actionFun(this)
        })

        // optimize dispatch and commit ensure the context of the function
        const {dispatch, commit} = this
        this.dispatch = actionName => {
            dispatch.call(this, actionName)
        } 
        this.commit = actionName => {
            commit.call(this, actionName)
        } 
    }

    get state() {
        return this._vm.state
    }

    // 触发 mutation
    commit(mutationName) {
        this.mutations[mutationName]()
    }

    // 触发 action
    dispatch(actionName) {
        this.actions[actionName]()
    }
}

export default {
    install,
    Store
}