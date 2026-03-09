# 防抖和节流

在诸多浏览器时间中, 有一类需要特殊处理. 那就是容易过度触发的事件. 例如: scroll, resize, mousemove... 为了防止这类事件的频繁触发. 我们就可以对事件处理函数进行防抖和节流的处理 ~

## 节流 throttle - 第一个人说了算

节流的核心是, 在某段时间内不管你触发了多少次事件. 我都只认第一次. 并在计时结束时给予响应.

### 适用场景

1. 拖拽
2. 浏览器缩放

### 代码实现

#### 时间差版本

```js
const throttle = (fn, timeout = 1e3) => {
    let last = 0

    return function (...args) {
        const now = Date.now()

        if (now - last < timeout) {
            return
        }

        // 直接使用外层的 this
        fn.apply(this, args)
        last = now
    }
}
```

时间差版本存在一个 bug, 如果最后一次调用正好在倒数第二次 now + timeout 时间断内. 就获取不到最后一次的状态的. 往往这里有坑. 于是就有了通过 setTimeout 驱动的版本

#### 定时器版本

```js
const throttle = (fn, timeout = 1e3) => {
    let timer = null

    return function (...args) {
        if (timer) {
            return
        }

        setTimeout(() => {
            // 直接使用外层的 this
            fn.apply(this, args)
            timer = null
        }, timeout);
    }
}
```

## 防抖 debounce - 最后一个人说了算

某段时间内, 无论事件触发了多少次. 只有最后一次能够调用事件处理函数.

### 适用场景

1. 按钮提交
2. 搜素框 sug

### 代码实现

```js
const debounce = (fn, timeout) => {
    let timer = null

    return function(...args) {
        // 如果当前在定时区间内说明这段时间内有了新的最后一次删除定时
        if (timer) {
            clearTimeout(timer)
        }

        // 认为当前为 "最后" 一次触发, 启动定时器
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, timeout);
    }
}
```
