# 常见的 html5 坑

## "专业"的前端开发注意事项

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
