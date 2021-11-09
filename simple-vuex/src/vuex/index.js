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
    const {state}  = options

    this._vm = new Vue({
      data: {
        state
      }
    })

    const {getters} = options
    
    forEach(getters, (name, getterFun) => {
      Object.defineProperty(this.getters, name, {
        get: () => getterFun(state)
      })
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