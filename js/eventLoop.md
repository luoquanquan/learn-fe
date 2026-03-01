# eventLoop

## 为什么会有 eventLoop

JS 的任务分为同步和异步两种, 由于 js 执行引擎为单线程. 他们的处理方式有所不同. 同步任务直接放在主线程上依次执行. 异步任务则会存放在任务队列中, 如果有多个异步任务需执行则需要在任务队列中等待执行.

单线程的 js 只能同时做一件事情, 而对于有些异步事件(如 ajax 请求) 往往耗时较长. 主线程会在请求发出后去干别的事情. 浏览器先通过事件注册 ajax 的回调函数. 待响应返回后再添加到任务队列中等待处理. 而主线程也会在空闲时检查任务队列中是否有新添加的异步任务. 如果任务队列中存在待执行任务则拿出来执行. 整个把异步任务添加到异步队列中, 主线程空闲时检查异步任务队列非空则执行的过程就是事件环, 也是 js 实现异步逻辑的核心

## 浏览器中的 eventLoop

浏览器中的异步任务分为两种:
- 宏任务(macro-task)
- 微任务(micro-task)

常见的 macro-task:
- setTimeout
- setInterval
- script

常见的 micro-task:
- Promise.prototype.then(回调)
- MutationObserve

requestAnimationFrame 也属于异步执行的方法, 但是该方法既不属于宏任务也不属于微任务. 按照 mdn 的定义:

requestAnimationFrame(cb) 告诉浏览器希望执行一个动画. 并且要求浏览器在下一次重绘之前调用指定的回调函数更新动画. 该方法需要传入一个回调函数. 此回调函数会在浏览器下一次重绘之前执行但是会在微任务之后. requestAnimationFrame 不一定会在当前帧必须执行. 由浏览器根据当前策略自行决定在哪一帧执行.

### eventLoop 的过程

1. 检查宏任务队列是否为空, 非空执行第二步, 为空执行第三步
2. 取出宏任务队列中的第一个任务并执行
3. 检查微任务队列是否为空, 非空之心第四步, 为空执行第五步
4. 取出微任务队列中的第一个任务并执行, 执行完成后返回上一步
5. 执行视图更新

当某个宏任务执行完成后, 查看微任务队列中是否有待执行任务存在. 若存在则清空微任务队列再继续. 如果不存在则执行下一个宏任务. 在执行宏任务的过程中加入了新的微任务也会先添加到微任务队列. 待当前宏任务执行完成后查看微任务队列此时已不再为空.

## node 中的 eventLoop

node 的事件环和浏览器中不同, 其采用 v8 作为 js 的解析引擎. I/O 处理则使用了自己设计的 libuv, 作为事件驱动模型的跨平台抽象层 libuv 封装了不同操作系统的一些底层特性. 对外提供了统一的 api, 事件环机制也由此实现.

### 六大阶段

1. timer 阶段: 这个阶段执行 timer(setTimeout, setInterval) 的回调, 并且是由 poll 阶段控制的
2. I/O callbacks 阶段: 处理一些上一轮循环中的少数未执行的 I/O 回调
3. idle, prepare 阶段: 仅 node 内部使用
4. poll 阶段: 获取新的  I/O 事件, 适当条件下 node 将阻塞在这里
5. check 阶段: 执行 setImmediate 的回调
6. close callbacks 阶段: 执行 socket 的 close 事件回调

#### poll 阶段描述

poll 阶段中, 熊会做两件事:
1. 回到 timer 阶段执行回调
2. 执行 I/O 回调, 如果在进入该阶段时如果没有设定 timer 的话, 会执行以下步骤:
   1. 如果有 setImmediate 回调需要执行, poll 阶段会停止并且进入到 check 阶段执行回调
   2. 如果没有 setImmediate 回调需要执行, 会等待回调被加入到队列中并立即执行回调, 这里同样会有个超时时间防止一直等待下去. 若设定了 timer 且 poll 队列为空, 则会判断是否有 timer 超时, 如果有的话回到 timer 阶段执行回调.

### 宏任务和微任务

宏任务: setTimeout, setInterval, setImmediate, script, I/O
微任务: process.nextTick, Promise.prototype.then(回调)

### setImmediate vs setTimeout

两者非常相似, 区别主要在于调用时机的不同:
- setImmediate 在 poll 阶段完成时执行, 即 check 阶段
- setTimeout 在 poll 阶段为空闲时且设定时间达到后执行, 在 timer 阶段执行回调

```js
setTimeout(() => {
    console.log('setTimeout')
}, 0)

setImmediate(() => {
    console.log('setImmediate')
})
```

- 对于上述代码来说 setTimeout 可能先执行也可能后执行
- 首先, setTimeout(fn, 0) === setTimeout(fn, 1), 由于任务加入到事件循环也需要成本
  - 如果花费的时间大于 1ms, 那么在 timer 阶段会直接执行 setTimeout 回调
  - 如果准备花费的时间小于 1ms, 就会先执行 setImmediate 回调了

### process.nextTick

process.nextTick 独立于 eventLoop 之外, 它有一个自己的队列. 当每个阶段执行完成后如果存在 nextTick 队列, 就会清空队列中的所有任务. 并且优先于其他微任务执行.

## node vs 浏览器 eventLoop

- node 端: 微任务在事件循环的各个阶段之间执行
- 浏览器端: 微任务在事件循环的宏任务执行完成之后执行
