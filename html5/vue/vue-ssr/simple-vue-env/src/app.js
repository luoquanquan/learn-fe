import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import createRouter from './router/index'
import createStore from './store/index'

Vue.use(VueMeta)

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        store,
        router,
        render: h => h(App)
    })

    return { app, router, store }
}
