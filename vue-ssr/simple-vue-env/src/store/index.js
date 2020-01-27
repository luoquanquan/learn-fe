import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
    const store = new Vuex.Store({
        state: {
            name: 'qq'
        },
        mutations: {
            setName(state, payload) {
                state.name = payload
            }
        },
        actions: {
            setName({commit}) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('setName', 'quanquan')
                        resolve()
                    }, 2e3);
                })
            }
        }
    })

    return store
}