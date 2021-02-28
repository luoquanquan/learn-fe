import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.config.productionTip = false
let instance = null
const render = (props = {}) => {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
} else {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ // eslint-disable-line
}

// 对接协议
export async function bootstrap (props) {}
export async function mount (props) {
  console.log(`当前时间 ${Date.now()}: debug 的数据是 props: `, props)
  render(props)
}
export async function unmount (props) {
  instance.$destroy()
}
