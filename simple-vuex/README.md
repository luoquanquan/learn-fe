# simple-vuex

> 尝试写一个 vuex

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

