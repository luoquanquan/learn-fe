import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const appOptions = {
  el: '#vue-child',
  router,
  store,
  render: h => h(App)
}

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions
})

if (window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:8888/' // eslint-disable-line
} else {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

// 想要父应用中加载子应用, 子应用中就要导出 bootstrap mount unmount
// single-spa / single-spa-vue
// 协议接入
export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount

export default vueLifeCycle
