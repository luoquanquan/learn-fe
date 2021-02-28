import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { registerMicroApps, start } from 'qiankun'

import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)

const apps = [
  {
    name: 'vueApp',
    // 默认加载这个 html, 解析里边的 js 动态执行
    entry: '//localhost:8888',
    container: '#vue',
    activeRule: '/vue',
    props: {
      childName: '圈圈的 vue 子项目 ~'
    }
  },
  {
    name: 'reactApp',
    entry: '//localhost:9999',
    container: '#react',
    activeRule: '/react'
  }
]

registerMicroApps(apps)
start()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
