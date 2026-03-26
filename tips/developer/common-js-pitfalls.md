# 常见的 js 坑

## substring vs substr

### substring 方法

`substring` 方法用于截取某个字符串位于起始位置到终点位置中间的字符，`substring(start[, end])`. 其中 `start` 指的是截取子串的起始下标，`end` 指的是截取子串的结束下标。

```js
var str = '012345'
console.log(str.substring(1, 4))  // 123
console.log(str.substring(1))     // 12345
console.log(str.substring(1, 1))  // ''
console.log(str.substring(2, 0))  // '01'
console.log(str.substring(-5, 2)) // '01'
```

通过示例可知：
- `substring` 的效果是包前不包后的截取
- 当忽略第二个参数的时候，默认从第一个位置截取到字符串的末尾位置。
- 当两个参数相等的时候，会截取一个空的字符串
- 当第二个参数小于第一个参数的时候，会交换两个参数的位置
- 当参数中存在负数的时候会先将负数转为 0

### substr 方法

`substr` 方法用于截取字符串从指定位置开始的指定长度的字符，`substr(start[, length])`. 其中 `start` 指的是截取子串的起始下标，`length` 指的是截取子串的长度

```js
var str = '012345'
console.log(str.substr(1, 4))  // 1234
console.log(str.substr(1))     // 12345
console.log(str.substr(2, 0))  // ''
console.log(str.substr(2, -1)) // ''
console.log(str.substr(-2, 3)) // '45'
```

通过示例可知：
- 没有传入 `length` 属性的时候会截取整个字符串
- 当 `length` 属性传 0 或者负数的时候会截取空字符串
- 如果 `start` 参数传负数，认为从字符串末尾开始倒数

## 简述 webpack 的构建流程

1. 初始化参数：从配置文件和 shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：基于第一步的参数初始化 Compiler 对象。加载所有配置的插件，执行对象的 run 方法开始编译
3. 确定入口：根据配置文件找到所有的入口文件
4. 编译所有模块：从入口文件触发，调用所有配置了 loader 进行模块编译。找出该模块依赖的模块递归处理。直到处理完成所有的模块
5. 完成编译模块：在经过第四步的处理后得到了每个模块编译的结果，并能获取到各个模块之间的关系。
6. 输出资源：根据入口文件和模块间的依赖关系，组装成一个个包含多个模块的 chunk 再把每个 chunk 转换成一个个单独文件加入到输出列表。这里是可以修改输出资源的最后机会
7. 输出完成：确定好输出内容后，根据输出文件路径和文件名。把文件写入到文件系统中

在上述各个步骤中，webpack 都会广播特定的事件。插件在监听到关注的事件以后就会启动自生的逻辑。调用 webpack 提供的 api 以影响最终生成的结果
