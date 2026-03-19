# 常见的 html5 坑

## ele.append 在 Android 6.0 有兼容问题

document.body.append is not a function

具体的兼容性信息[参考文档](https://caniuse.com/mdn-api_element_append)

## “专业”的前端开发注意事项

- 凡是遇到固定大小的内容区域时，都要考虑内容长度可能超出容器(内容溢出)
  - 数字
  - 金额
  - ⋯⋯
- 凡是有表单提交的地方，都要考虑表单内容修改的回显能力

## innerHTML vs innerText vs outerHTML vs outerText

- innerHTML 设置或者获取标签所包含的 HTML 与文本信息，不含标签本身
- innerText 设置或者获取标签所包含的文本信息，不含标签本身
- outerHTML 设置或获取标签本身以及所包含的 HTML 与文本信息，包含本身
- outerText 设置或获取标签本身以及所包含的文本信息，包含本身

示例：
```html
<div id="div1"><p>this is text</p></div>
<script>
    const div = document.querySelector("div");
    console.log('div.innerHTML', div.innerHTML);
    console.log('div.innerText', div.innerText);
    console.log('div.outerHTML', div.outerHTML);
    console.log('div.outerText', div.outerText);
</script>

<!-- 控制台打印的结果为
div.innerHTML <p>this is text</p>
index.html:5 div.innerText this is text
index.html:6 div.outerHTML <div id="div1"><p>this is text</p></div>
index.html:7 div.outerText this is text
-->
```

## link 和 import 的区别

1. link 是 html 标签，而 imort 是 css 提供的关键词
2. Link 加载的 css 文件会在页面加载过程中加载而 import 的 css 文件则需页面加载完成后开始加载
3. Link 方式引入的 css 文件权重高于 @import

## 常见的语义化标签

article aside details figcaption figure footer header main mark nav section summary time and so on⋯⋯

## 优点

- 对于搜索引擎友好。有了良好的语义，网页内容更容易被搜索引擎爬虫爬取
- 开发维护更加友好。语义化代码有利于团队内其他成员阅读你的代码并基于你的代码进行改造和升级。
- 提升代码的可复用性和可移植性。方便在多种设备执行，例如移动设备，盲人设备等等

## 如何实现语义化

一般网站分为头部，导航，文章，侧栏，底部⋯⋯根据不同的部位可使用不同的标签进行书写：header nav article section footer aside

表示具体意义的区块也可以用特定意义的标签：a, abbr, address, blockquote, caption, code, datalist, del, details⋯⋯

- 尽量少的使用 div span 等无语义的标签
- 在语义化不明显时，例如既可以用 div 也可以用 p 标签的地方尽可能用 p 标签。因为 p 标签有默认的上下间距。有利于兼容特殊终端
- 不要使用纯样式标签。比方说 b font u 而是使用 css 样式代替
- 每个表单项 input 元素都添加对应的 label 标签，并且关联两者优化用户体验

# ReactRouter 的 Link 组件和 a 标签有啥关系

## 相同点

1. 渲染结果相同，两者渲染的结果都是 a 标签
2. 实现功能相同，都能够实现页面的跳转

## 不同点

1. Link 标签的跳转只会触发与之相匹配的 Route 对应的页面内容更新。不会触发整页的刷新，而 a 标签的跳转会刷新整个页面
2. Link 标签一般需要配合 Route 使用，a 标签可以随意添加
3. Link 标签实际上是禁用了 a 标签原有的跳转能力之后自行实现的跳转
```js
[...document.getElementsByTagName('a')].forEach(a => {
    a.onclick = e => {
        // 阻止默认跳转事件
        e.preventDefault()
        location.href = this.href
    }
})
```

## 常见的 content-type 值

1. application/x-www-form-urlencoded: form 表单默认格式，数据被编码为键值对
2. application/json: restful 接口常用方案，以序列化 json 的形式传递数据
3. text/xml: 以 xml 方式传递数据，现在已经不常用了
4. multipart/form-data: 这个类型主要用于表单需要上传文件的时候，因为文件需要以二进制的方式展示。不设置这个类型无法上传文件
5.  application/octet-stream: 用于响应头中，表示未分类的二进制数据。浏览器遇到这个响应头之后会直接下载文件。还可以通过设置 Content-Disposition: attachment; filename=fileName.ext 指定下载文件名

## script 中的 defer 和 async 的区别

- 默认的 script 标签引入 js 浏览器会立即加载并执行相应的 js 文件。同时会阻塞后续文档的渲染。
```html
<script src="demo.js"></script>
```

- 添加 async 属性之后，表示 js 的加载和执行和文档的渲染是并行进行的，也就是说是异步执行的
```html
<script async src="demo.js"></script>
```

- 添加 defer 属性后，js 文件的加载和文档的渲染是并行的。但是 js 文件只有在文档渲染完成后(DOMContentLoaded 触发后)才会执行。如果是需要获取 dom 元素的 js 文件需要使用 defer
```html
<script defer src="demo.js"></script>
```

1. 两者的加载过程是一样的，都是异步加载
2. 两者的区别在于加载完成之后的执行时机，async 为加载完成之后立即执行。但是 defer 为加载完成之后等待 DOMContentLoaded 才会执行
