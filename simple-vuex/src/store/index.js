import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex from '../vuex'

Vue.use(Vuex)

const moduleA = {
    state: () => ({
        count: 100
    }),
    getters: {
        moduleANewCount (state) {
            return state.count + 1
        }
    },
    mutations: {
        addCount (state) {
            state.count += 1
        }
    },
    actions: {
        addCount (store) {
            console.log(`当前时间 ${Date.now()}: 代码走到了这里 moduleA action addCount`)
            store.commit('addCount')
        }
    }
}

export default new Vuex.Store({
    modules: {
        moduleA
    },
    state: {
        count: 1
    },
    getters: {
        newCount (state) {
            return state.count + 1
        }
    },
    mutations: {
        addCount (state) {
            state.count += 1
        }
    },
    actions: {
        addCount (store) {
            console.log(`当前时间 ${Date.now()}: 代码走到了这里 action addCount`)
            store.commit('addCount')
        }
    }
})
