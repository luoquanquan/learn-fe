# 常见的 js 坑

## xhr 对象的几种状态

readyState | 对应的时机
--- | ---
0 | 初始化, 也就是 new 完 XMLHttpRequest 之后的状态
1 | 启动, 调用 xhr 实例 open 方法后的状态
2 | 调用 xhr 实例 send 方法后请求已经完全发送, 服务端收到请求但是尚未解析
3 | 开始接收来自服务端的响应
4 | 完成, 接收服务端响应结束

## 不要用 js 进行小数计算

在以前的认识中, 小数的计算确实不好用. 但是可以通过乘以 10 的整数倍, 转成整数之后再进行整数计算 `16.666 * 1e3 => 16666`. 直到有一天 `16.368 * 1e3 => 16367.999999999998`, 卧槽, 卧槽, 卧槽...

鉴于此, 对于用户输入的小数点后三位有值的 input 可以先用字符串处理 `'16.368'.split('.')` 然后转化成 `16 * 1e3 + 368` 来避免因精度误差可能带来的坑 ~

当然, 时至今日. 我们可以使用 [bignumber.js](https://www.npmjs.com/package/bignumber.js) 来处理数字计算, 可以避免小数精度丢失和大数超出范围的问题

## 数据统计相关小 Tips

- 凡是计算平均值, 百分比的运算, 都要考虑所有项都是 0 的情况, 因为 0 / 0 = NaN
- 遇到需要全局唯一的变量时, 用一个自增变量比费劲搞随机字符串时间戳之类的东西靠谱方便
- 始终返回值都是布尔值的函数, 函数名称推荐用 is 开头, ex: isSameColor

# 9 种方式实现数组去重

## 方法一, 两层循环, 通过标记判断是否更新结果数组

- 定义 ret = [] 用于存放结果数组
- 定义 repeat 变量作为当前元素是否存在的标记值, 并默认赋值为 false
- 外层循环, 遍历原数组中的每一个元素, 遍历前先把 repeat 置为 false 假设当前元素没有在结果数组中出现
- 内层循环, 遍历当前的结果数组. 如果当前的结果数组中已经包含了外层循环中遍历的元素, 标记 repeat 为 true
- 判断 repeat 的值, 如果当前元素没有存在于结果数组中, 则向结果数组中添加当前值
- 遍历完成后返回结果数组, 即为不包含重复项的数组

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/57d583c49d8d6119976659fe3bf9f456a899a706)

通过 github 上的评论可以看到当前提交的代码有 bug, 修改的代码为[地址](https://github.com/luoquanquan/learn-fe/commit/8a0fc3ae271c2f703d21f2ac281d961dfbeea1c7)

## 方法二, 先给数组排序, 再逐个比较

- 定义 ret = [] 用于存放结果数组
- 备份原数组并对备份的数组进行排序
- 启动循环, 一次对比当前元素和结果数组中的最后一个元素, 相等则跳过, 不相等加入结果数组
- 遍历完成后返回结果数组, 即为不包含重复项的数组

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/c69aabd43dc0dc0166f1d7cbbaba17579acb89b2)

## 方法三, 利用对象的属性不能重复的特性

- 创建一个空对象用于存放不重复值, 这里可以优化成 `Object.create(null)`
- 创建结果数组
- 遍历原数组, 把各个值当做对象的 key 存入对象, 如果对象的 key 出现重复值后边的会直接覆盖掉前边的
- 遍历对象, 并把所有的 key 作为元素 push 到结果数组中
- 遍历完成后返回结果数组, 即为不包含重复项的数组

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/1f04c7391ca27c7c1ac6d9a0f09551cf19925614)

## 方法四, 还是利用对象的属性不能重复的特性

- 创建一个空对象用于存放不重复值, 这里可以优化成 `Object.create(null)`
- 创建结果数组
- 遍历原数组, 判断对象是否已经存在当前 item 为 key 的成员, 如果有说明之前的遍历中出现过该值-跳过, 如果没有对象中添加对应的属性同时给结果数组中添加相应的值
- 遍历完成后返回结果数组, 即为不包含重复项的数组

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/0f50bab95474fadf6d828c90f70c7bc0fa5f5764)

## 方法五, 找到一个元素看他的后边还有没有和他一样的元素

- 备份原数组, 并作为结果数组
- 遍历备份的数组
- 取出当前的元素
- 遍历当前元素到数组的结尾, 如果有和当前元素相等的元素则 splice 掉
- len-- 因为删除了一个元素故数组的长度减一
- j-- 因为和当前元素相等的后位元素已经被删除, 之后的元素迁移, 所以需要 j-- 修正内部遍历的索引值
- 遍历完成后返回结果数组, 即为不包含重复项的数组

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/43539818cea6c0e91bd6ed2b340dab491f8be2d0)

## 方法六, 同方法二, 先给数组排序, 再逐个比较, 此处利用了递归

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/3378001ce9424d10a0cb4df318b4d723f0502080)

## 方法七, 遍历数组, 看前方有没有和当前值相等的值

- 定义 ret = [] 用于存放结果数组
- 遍历原数组, 取出当前项, 如果当前项的前方存在相等的项跳过, 否则说明这是当前项最后一次在数组中出现将其加入到结果数组
- 遍历完成后返回结果数组, 即为不包含重复项的数组

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/8e9f384f9adf391ad8afc71c46096dd80d8df335)

## 方法八, 使用 reduce 原理同方法一

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/4b314b641eeaa0da4ae0ccf6ba1bbfff96bf4852)

## 方法九, 利用 Set 值不能重复的特性实现数组的去重

过于简单, 不再赘述

本方法代码[地址](https://github.com/luoquanquan/learn-fe/commit/29526d14c6e7a27315b6d4bdb1cc457f9144cf2c)

# parseInt vs Math.floor

> parseInt 和 Math.floor 都可以实现取整, 但是处理的方式存在差别

## parseInt

parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数, radix 为介于 2 - 36 之间的整数, 如果 radix 传入的是 0, 会以默认值 10 处理:

string: 是要被解析的字符串, 如果传入的值不是一个字符串则会将其转化成字符串(toString 方法), 字符串开头结尾的空白字符会被忽略

radix: 一个介于 2 - 36 的整数, 表示的是上述字符串的基数. 默认值是 10, 如果传入的 radix 小于 2 或者大于 36 则返回 NaN

- 可以处理数字(调用数字的 toString 方法将其转化成字符串)
  - parseInt(1.1) -> 1
  - parseInt(1.9) -> 1
  - parseInt(0.9) -> 0
  - parseInt(-1.9) -> -1
- 可以处理 <font color="red">数字开头的字符串</font>
  - parseInt('-1') -> -1
  - parseInt('10px') -> 10
  - ...
- 可以把 2 - 36 进制的数转为 10 进制
  - parseInt(11, 2) -> 3
  - parseInt(11, 8) -> 9
  - parseInt(11, 10) -> 11
  - parseInt(11, 16) -> 17
  - parseInt(11, 36) -> 37
  - ...

## Math.floor

Math.floor(x) ===  向下取整, 返回小于或者等于给定数字的最大整数

其中 x 是需要解析的数字

- Math.floor(1.2) -> 1
- Math.floor(1.9) -> 1
- <font color="red">Math.floor(-1.2) -> -2</font> 真正的向下取整
- Math.floor('1.9') -> 1 也可以处理字符串(不建议用)

## parseFloat

parseFloat(x) 函数可解析一个字符串, 并返回一个浮点数

其中 x 是需要解析的字符串

parseFloat 将它的字符串参数解析成为浮点数并返回. 如果在解析过程中遇到了正负号 (+ 或 -) 数字 (0-9) 小数点, 或者科学记数法中的指数 (e 或 E) 以外的字符, 则它会忽略该字符以及之后的所有字符, 返回当前已经解析到的浮点数. 同时参数字符串首位的空白符会被忽略

PS: 如果字符串的第一个字符不能被转换为数字, 那么 parseFloat() 会返回 NaN.

# substring vs substr

## substring 方法

`substring` 方法用于截取某个字符串位于起始位置到终点位置中间的字符, `substring(start[, end])`. 其中 `start` 指的是截取子串的起始下标, `end` 指的是截取子串的结束下标.

```js
var str = '012345'
console.log(str.substring(1, 4))  // 123
console.log(str.substring(1))     // 12345
console.log(str.substring(1, 1))  // ''
console.log(str.substring(2, 0))  // '01'
console.log(str.substring(-5, 2)) // '01'
```

通过示例可知:
- `substring` 的效果是包前不包后的截取
- 当忽略第二个参数的时候, 默认从第一个位置截取到字符串的末尾位置.
- 当两个参数相等的时候, 会截取一个空的字符串
- 当第二个参数小于第一个参数的时候, 会交换两个参数的位置
- 当参数中存在负数的时候会先将负数转为 0

## substr 方法

`substr` 方法用于截取字符串从指定位置开始的指定长度的字符, `substr(start[, length])`. 其中 `start` 指的是截取子串的起始下标, `length` 指的是截取子串的长度

```js
var str = '012345'
console.log(str.substr(1, 4))  // 1234
console.log(str.substr(1))     // 12345
console.log(str.substr(2, 0))  // ''
console.log(str.substr(2, -1)) // ''
console.log(str.substr(-2, 3)) // '45'
```

通过示例可知:
- 没有传入 `length` 属性的时候会截取整个字符串
- 当 `length` 属性传 0 或者负数的时候会截取空字符串
- 如果 `start` 参数传负数, 认为从字符串末尾开始倒数

# === vs ==

## 两者的区别

1. === 为恒等符, 当两边的变量类型相等的时候进行对比, 值相等返回 true 不相等则返回 false
2. == 为等值符, 两边变量类型相同时直接比较是否相等, 否则会进行转化

## 转化规则

1. 如果一个是 null 一个是 undefined, 相等
2. 如果一个是字符串一个是数字, 把字符串转化成数字再比较
3. 如果一个是Boolean 那么把布尔值转化成数字再比较
4. 如果一个是对象,  另外一个是数字 or 字符串. 把对象转成原始值在比较
5. 其他类型的都不相等

对象转原始值其实就是调用其Symbol.toPrimitive, 你可以改写对象的这个方法参考: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive
默认情况下大多是优先调用自身的 valueOf 方法. 只有 Date 对象除外, 会优先调用 toString 方法

# 内部属性[[class]]

所有 typeof 返回值为 object 的对象, 都会包含一个内部属性\[\[class\]\]. 一般来说把它当成一个内部的分类. 这个分类的值无法直接访问, 需要通过 Object.prototype.toString() 来查看

```js
Object.prototype.toString.call([])
// "[object Array]"

Object.prototype.toString.call(function() {})
// "[object Function]"
```

## null vs undefined

### 默认为 null 的情况:
- 手动设置变量的值或者对象的某一属性值为 null(表示此时没有值, 以后可能会赋值)
- js DOM 元素获取的方法中, 如果没有获取到指定的元素对象. 默认返回 null
- Object.prototype.__proto__ === null
- 正则捕获时, 捕获不到匹配的模式时会返回 null

### 默认为 undefined 的情况:
- 变量提升, 只声明未定义的变量值就是 undefined
- 严格模式下, 没有指定函数的执行上下文, 其内部的 this 就是 undefined
- 获取对象没有的属性时, 返回 undefined
- 函数定义了形参但是没有传入实参, 默认值 undefined
- 函数没有显式的返回值, 默认返回 undefined

## vuex vs localStorage

### 本质区别

- vuex 存储在内存中, 读取速度快.
- localStorage 以文件的形式存储在本地硬盘, 相对而言内存中读取内容速度更快.

### 应用场景不同

vuex 是专门为 vue 应用程序开发的状态管理工具. 采用了集中的方案管理所有组件的状态. 并以对应的规则约定了状态只能以一种可预测的方式改变. 保证了应用状态的一致性和可维护性...

localStorage 是 html5 新增的本地存储 api, 是通过 js 将数据存储到本地的方法. 一般用于跨页面的数据传递

PS: vuex 能够做到数据的响应式, localStorage 不能做到响应式. 需要自行处理

### 存续时长不同

- vuex 存储的数据均为会话级别, 刷新浏览器之后所有数据都会丢失.
- localStorage 存储的数据是长期的, 只要用户不主动删除数据, 其值可以保持存在

### 总结

由于 localStorage 存储的数据不具备响应式特性, 数据改变时无法通知引用它的组件更新. 所以无法用 localStorage 替换 vuex. 但是由于其长效存储的特性, 可以用 localStorage 存储用户编辑一半的表单. 实现本地的草稿箱

## 判断变量是否为数组

1. Array#prototype#isPrototypeOf(obj)
2. obj instanceof Array
3. Object#protorype#toString#call(obj) === '[object Array]'
4. Array#isArray(obj)

# webpack loader vs plugin

## 作用不同

loader 直译为加载器, webpack 将一切文件视为模块, 但是其原生只能解析 js 文件, 如果想要打包其他文件的话就需要用到 loader 进行一次转化. Loader 赋予了 webpack 解析非 js 文件的能力. plugin 直译为插件, 其可以拓展 webpack 的功能, 让 webpack 具备更多的灵活性. 在 webpack 运行的生命周期中会广播出很多事件. Plugin 可以监听这些事件. 在合适的时机通过 webpack 提供的 api 改变输出的结果

## 用法不同

loader 在 module#rules 中配置, 也就是说作为模块的解析规则存在. 类型为数组, 每一项都是一个 Object, 里边除了配置类型匹配规则还指定了 loader 以及 loader 的 options. Plugin 在 plugins 中单独配置. 类型为一个数组每一项都是一个 plugin 实例, 参数由构造函数传入

# sourcemap 是什么有何作用

## 概念

source map 是将编译, 打包, 压缩后的文件映射回源代码的工具. 由于打包压缩后的代码可读性不足, 于是在开发生产过程中就需要通过 source map 定位到源代码并调试.

## 常用方案

生产环境使用 source map 的方式主要有以下几种:
1. hidden-source-map: 借助第三方监控平台 Sentry 使用
2. nosource-source-map: 只会展示具体的行数以及源代码的错误栈, 相对于 source-map 更安全
3. source-map: 生成完整的 source-map, 并且通过 nginx 配置只有公司内网可以访问, 其他环境直接 deny

PS: map 文件只要用户不打开浏览器的控制台, 浏览器是不会主动加载
PS: 生产环境下不要启用 inline- 族和 eval- 族的 source-map 配置. 因为这会大大正价 bundle 包的大小, 降低页面加载的性能...

## 简述 webpack 的构建流程

1. 初始化参数: 从配置文件和 shell 语句中读取与合并参数, 得出最终的参数
2. 开始编译: 基于第一步的参数初始化 Compiler 对象. 加载所有配置的插件, 执行对象的 run 方法开始编译
3. 确定入口: 根据配置文件找到所有的入口文件
4. 编译所有模块: 从入口文件触发, 调用所有配置了 loader 进行模块编译. 找出该模块依赖的模块递归处理. 直到处理完成所有的模块
5. 完成编译模块: 在经过第四步的处理后得到了每个模块编译的结果, 并能获取到各个模块之间的关系.
6. 输出资源: 根据入口文件和模块间的依赖关系, 组装成一个个包含多个模块的 chunk 再把每个 chunk 转换成一个个单独文件加入到输出列表. 这里是可以修改输出资源的最后机会
7. 输出完成: 确定好输出内容后, 根据输出文件路径和文件名. 把文件写入到文件系统中

在上述各个步骤中, webpack 都会广播特定的事件. 插件在监听到关注的事件以后就会启动自生的逻辑. 调用 webpack 提供的 api 以影响最终生成的结果

# Vue 双向数据绑定实现原理

## 基本原理

Vue 采用了数据劫持结合发布-订阅的模式, 通过 Object#defineProperty 方法劫持各个成员的 getter, setter. 在数据变动的时候发布消息给订阅者触发相应的回调, 由于是在不同数据变动时触发的消息. 也就可以精确的将变更发送给绑定的视图. 而不是对所有的数据都进行更新. 具体的步骤为:

1. 对于需要 observer 的数据进行递归遍历, 给每个成员都加上 getter 和 setter. 这样将来给对应的成员赋值的时候就会触发 setter 实现数据变化的监听
2. Compile 解析模板指令, 将模板中的变量替换成数据. 并将每个指令对应的节点绑定更新函数. 添加监听数据的订阅者. 一旦数据有了变动便能收到通知更新视图
3. Watcher 订阅者是 Observer 和 compile 之间的通信桥梁
    - 在自生实例化时往订阅器(dep)里添加自己
    - 自生存在一个 update 方法
    - 待属性变动接收到 dep#update 通知时, 调用自生的 update 方法触发 compile 中绑定的回调
4. mvvm 作为数据绑定的入口, 整合了 observer, compile, watcher 三者. 通过 observer 监听自己的 modal 数据变化. 通过 compile 来编译模板指令. 最终通过 watcher 作为沟通两者的桥梁. 达到了数据变化可以更新视图, 视图变化也可以更新数据的双向绑定效果.

## 3.0 之前和 3.0 的比较

### 基于数据劫持 / 依赖收集的双向绑定优点

1. 不需要显式调用, 通过数据劫持 + 发布订阅的方案. 可以直接通知视图的更新
2. 直接精确得到变化的数据, 因为劫持了所有成员的 setter, 当属性值变化的时候我们可以精确的获取变化的内容 newValue 不需要进行额外的 diff 操作去查找变化的部分.

### Proxy vs Object.defineProperty

#### Proxy 的好处

1. 可以监听数组
2. 13 种监听方法, 比 defineProperty 的 getter / setter 更强大. get, set, has, deleteProperty, ownKeys, getOwnPropertyDescriptor, defineProperty, preventExtensions, getPrototypeOf, isExtensible, setPrototypeOf, apply, construct
3. 返回新的对象, 而非直接修改原对象.

#### Proxy 的缺点

兼容性不给力, 而且低版本浏览器中没法用 pollfill 实现

## Vue 中计算属性和 method 的区别

计算属性是数据层到视图层的数据转化映射, 会基于其所依赖的属性进行缓存. 只有在相关依赖变化时才会重新求值. 如果依赖没有变化每次访问计算属性都会立即返回之前计算的结果, 不再执行 get 函数. Method 则不同, 每次调用都会执行. 具体区别如下:

1. computed 是响应式的 method 不具备响应式能力
2. 调用方式不一样, computed 可以想访问vue 实例的成员一样调用, method 只能执行函数调用
3. computed 可以指定以一个函数作为只读属性, 也可以定义 get/set 变成可读写属性. 这个是 method 做不到的
4. computed 不能执行异步的逻辑, 当 computed 中包含异步逻辑时会导致取值无效
