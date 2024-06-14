# simple-vuex

> 尝试写一个 vuex

## vuex 初始化并把 store 挂载到每个组件中

根据 vue 组件的使用, vuex 为包含两个属性的对象于是

```js
// 初始化 store, 并关联到每个组件中
const install = () => {}

// 初始化 state / mutations / actions
class Store {}
export default {
    install,
    Store
}
```

通过 `Vue.mixin` 给每一个实例添加一个 `$store` 属性, 并以此实现 `state / mutations / actions` 的各种操作

```js
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
```

## state 初始化

为了保证 `vuex` 数据的响应式, `state` 核心为初始化一个 `Vue` 实例, 如下...

```js
// 初始化一个 Vue 实例, 保证数据响应式
this._vm = new Vue({
    data: {
        state
    }
})
```
