import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { start, registerApplication } from 'single-spa'

Vue.config.productionTip = false

const loadScript = async url => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = url
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
})

registerApplication(
  'vue-child',
  async () => {
    console.log('load components ~')
    await loadScript('http://localhost:8888/js/chunk-vendors.js')
    await loadScript('http://localhost:8888/js/app.js')
    return window.singleVue
  },
  // 用户切换到 /vue 路径下, 才去加载刚才定义的子应用
  location => location.pathname.startsWith('/vue-child'),
  {
    name: 'quanquan'
  }
)

start()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
