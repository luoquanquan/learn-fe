import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Foo from '../components/Foo.vue'
import Bar from '../components/Bar.vue'

export default () => new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Foo
        }, {
            path: '/bar',
            component: Bar
        }
    ]
})