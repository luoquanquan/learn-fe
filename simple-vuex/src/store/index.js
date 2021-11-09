import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    newCount(state) {
      return state.count + 1
    }
  },
  mutations: {
    addCount(state) {
      state.count += 1
    }
  }
})