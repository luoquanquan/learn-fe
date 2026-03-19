# DOM 事件

JavaScript 使用的是事件驱动的设计模式，为元素添加事件监听函数，当这个元素的相应事件被触发那么其添加的事件监听函数就被调用。作为 js 和 html 沟通的基础，任何文档或者浏览器窗口发生的交互都要通过绑定事件进行 ~

## 常用概念

### 事件流

描述的是事件在页面中传播的顺序

### 事件

发生在浏览器里的动作，这个动作可以是用户触发的。也可以是浏览器触发的。click, mouseover, onload 等等

### 事件监听函数

事件发生后，浏览器如何响应

## DOM 0 级事件

DOM 事件初期，实现事件绑定的方案还比较原始。实现的方案有两个：

1. 直接在 html 行内进行事件的绑定，两者进行了强耦合
```html
<button onclick="sayHi()">clickMe</button>

<script>
function sayHi() {
    console.log('Hi ~')
}
</script>
```
2. 通过 DOM api 选取 dom, 然后指定其事件属性
```html
<button id="btn">clickMe</button>

<script>
function sayHi() {
    console.log('Hi ~')
}

const btn = document.getElementById('btn')
btn.onclick = sayHi
</script>
```

比较苦逼的是，这种事件绑定的模型作为最为广泛的处理方案(现在还有人用)。但是并没有被 w3c 协会定位正式的标准。被人们约定俗成的定义为 DOM 0 级事件处理模型

## DOM 2 级事件

由于 1 级 DOM 标准中并没有关于事件相关的规定，所以并没有 1 级事件模型。在 2 级 DOM 中定义了事件流模型。包含了事件的冒泡和捕获两个阶段 ~

### 绑定事件的句柄

el.addEventListener(event-name, cb, useCapture)
- event-name: 事件名称
- cb: 触发事件的回调函数
- useCapture: 代表事件是否启动捕获阶段，默认为 false，即为冒泡

### 事件流

1. 捕获阶段：window -> 目标，自上而下
2. 目标阶段：目标节点事件处理
3. 冒泡阶段：目标 -> window, 自下而上

### 事件代理

由于事件会在冒泡阶段上传给父节点，因此可以把子节点监听的函数定义在父节点上，由父节点统一处理多个子元素的事件，这种方法就是事件代理

## DOM 3 级事件

DOM 3 级事件和 2 级事件类似，其中第三个参数由接收一个 Boolean 变成了接收一个 Object. 还增加了部分新的事件类型：

事件类型 | 事件
--- | ---
UI 事件 | load scroll
焦点事件 | blur focus
鼠标事件 | dbclick mouseup
滚轮事件 | mousewheel
文本事件 | input
键盘事件 | keydown keypress
合成事件 | 当为IME（输入法编辑器）输入字符时触发 compositionstar

[参考资料](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

## 事件对象

在事件处理函数中，我们可以获取到的第一个参数就是事件对象。对于事件对象中有一些常用的属性和方法，总结如下：

### currentTarget

记录了事件当前正在被那个元素接收，也就是 "正在经历哪个元素"，这个元素一直是在改变的⋯⋯

如果事件处理函数绑定的元素和当前触发的元素是一样的，那么事件处理函数中的 this, event.currentTarget, event.target 相同，都指向这个元素。通常可以以此为依据，判断当前元素是否就是目标元素

### target

记录了触发事件的具体目标，也就是最具体的那个元素。是真正的事件源。

就算事件处理函数没有绑定在具体的目标元素上，而是绑定在目标元素的父级元素上。事件通过冒泡到父级元素上触发的。那么我们可以通过 target 来获取真正触发事件的元素。

### preventDefault

阻止默认行为，常用来阻止表单元素的默认提交和 a 标签的默认跳转

### stopPropagation

阻止冒泡，这个方法用于终止事件在传播过程的捕获，目标处理或起泡阶段进一步传播。调用该方法后事件不再被分派到其他节点

## 自定义事件

```html
<div>
    <button id="a">A</button>
    <button id="b">B</button>
    <button id="c">C</button>
</div>
```

如上代码中，如果想要点击了按钮 A 之后 B, C 也能响应点击事件。由于他们没有层级关系，所以不能通过冒泡实现⋯⋯

于是就有了自定义事件

```js
// 创建自定义事件对象
const clickAEvent = new Event('clickA')

// 绑定自定义事件
btnB.addEventListener('clickA', () => {
    console.log('A clicked')
})
btnC.addEventListener('clickA', () => {
    console.log('A clicked')
})

// 点击 A 的时候触发自定义事件
btnA.addEventListener('click', () => {
    btnB.dispatchEvent(clickAEvent)
    btnC.dispatchEvent(clickAEvent)
})
```
