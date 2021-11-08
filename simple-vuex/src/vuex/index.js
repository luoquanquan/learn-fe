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

class Store {
  constructor(options) {
    const {state}  = options

    this._vm = new Vue({
      data: {
        state
      }
    })
  }

  get state() {
    return this._vm.state
  }
}

export default {
  install,
  Store
}