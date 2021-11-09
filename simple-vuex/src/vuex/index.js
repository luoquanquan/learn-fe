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
        const { state, getters, mutations } = options

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
    }

    get state() {
        return this._vm.state
    }

    commit(mutationName) {
        this.mutations[mutationName]()
    }
}

export default {
    install,
    Store
}