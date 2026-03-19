# 常见的 css 坑

## Safari 中 flex 包含图片高度暴走

详情：

Safari 中 flex 容器包含一个图片时图片加载完成后高度会暴走

解决方案：
- 不这样用
- 限制宽度的图片利用竖向 flex
- 限制高度的图片利用横向 flex

## 安卓文本无法垂直居中问题

> 默认情况下使用 `line-height: height` 就可以实现单行文字内容的垂直居中对齐，但是当文字字体小于 12px 的时候(或者是基数的倍数的时候) 实际上字体就会向上偏移一点。有的手机上表现着实离谱，完全没法忽悠设计的地步了⋯⋯

### 缩放的方法

既然字体是基数的倍数的时候会偏移，那么先把字体大小放大 1 倍，然后再通过 transform 缩小就搞定了

```html
<div style="height: 32px; line-height: 32px; font-size: 20px; transform: scale(0.5, 0.5); transform-origin: left top;">
    我就是要居中
</div>
```

### flex or 内边距 + line-height: nomal

```html
<div style="display: flex; align-item: center; line-height: normal; font-size: 10px;">
    我就是要居中
</div>
```

```html
<div style="box-sizing: border-box; padding: 0 10px; line-height: normal; font-size: 10px;">
    我就是要居中
</div>
```

## position: fixed; 作为 transform 元素子元素

这是一个十年前就有人问过的问题 [stackoverflow](https://stackoverflow.com/questions/2637058/positions-fixed-doesnt-work-when-using-webkit-transform)当你的 position: fixed; 的元素包裹在使用了 transform 属性的元素的时候，fixed 定位就会失效，不能固定定位了。

参考文档：
- [那些遇到的position-fixed无效事件](https://xinpure.com/position-fixed-encountered-an-invalid-event/)
- [https://drafts.csswg.org/css-transforms-1/#containing-block-for-all-descendants](https://drafts.csswg.org/css-transforms-1/#containing-block-for-all-descendants)

## iOS 10 直接使用 ele.style = ""bug

在写 js 蒙层的时候为了方便直接写了 `modalEle.style = "width: 100%; height: 100%;"` 在安卓中没啥问题。但是在 `iOS 10` 上报了错误 <font color="red">attempted to assign to readonly property</font> 尝试分配只读属性。也就是说 `ele.style` 不能重新赋值只能修改其属性，修改为一下代码即可解决：

```js
modalEle.style.width = '100%';
modalEle.style.height = '100%';
```

参考文档：[ios设备出现attempted-to-assign-to-readonly-property报错](https://blog.csdn.net/weixin_45532305/article/details/107319854)

## 三栏布局

1. 浮动布局，两端分别设置 float: left | float: right
2. 绝对定位布局，三个盒子分别设置绝对定位
3. flex布局，两边盒子设置宽度，中间盒子设置flex: 1 实现宽度自适应
4. table 布局，父级盒子设置 display: table, 三个子盒子分别设置 display: table-cell. 然后左右两个盒子分别设置宽度即可
5. 网格布局，	父级盒子设置 display: grid; grid-template-columns: 300px auto 300px;

## 清除浮动的方法

1. 结尾添加空标签 clear: both
2. 父级设置高度
3. 父级设置 display: table
4. 父级设置 overflow: hidden | auto (同时需要设置 width 或者 zoom = 1, 且不能设置 height 靠浏览器自行检测即可)
5. 父级也设置浮动
6. 父级元素添加伪元素 ：after {clear: both}

# 伪类 vs 伪元素

## 伪类

伪类就是用来选择 DOM 树之外的信息，以及不能够被普通选择器选择的元素并进一步为之添加选择器的特殊效果的选择器。常见伪类选择器有：hover, active, visited, first-child 等等。由于元素的状态是动态变化而非静态的.所以元素达到特定的状态时，他可以命中一个伪类选择器。当特定状态消失后便不再能够匹配到该伪类。对应的样式也会消失。看上去其功能和 class 类似。但是他又是文档之外的抽象，在 html 文档中并没有 class 指明.所以叫伪类

## 伪元素

伪元素主要是只 DOM 🌲 中没有定义的虚拟元素其主要功能就是添加不存在与文档流中的元素。比如 ：before 和 ：after 分别表示元素内容之前和之后的内容。伪元素的内容和普通元素没啥差别，但是他们并不存在于文档中。故称之为伪元素。

## 区别

### 表示方法不同

1. css 2 中的伪类/伪元素都是用单 ：表示
2. Css 3 规定伪类用单 ：表示，伪元素用双 ：：表示。为了兼容性考虑 css 2 中已经存在的伪元素也可以使用单 ：语法。css 3 新增的伪元素，应该使用双 ：语法(如：：selection).

### 定义不同

1. 伪类就是虚假的类，虽然没有写在 html 中但是可以选中对应的 html 元素
2. 伪元素就是虚假的元素，通过 CSS 向 html 中添加虚假的元素。保证了 html 文档简洁的同时实现效果。

## 总结

1. 伪类和伪元素都是文档树之外的内容
2. 伪类用 ：表示，伪元素用 ：：表示
3. 区分伪类和伪元素，主要看如果没有它是否需要添加真元素才能实现效果

## 移除inline-block间隙的方法

由于编写代码的时候难免会有间隔设置为 inline-block 的元素就会出现间隔，解决方法有以下几种：
1. 去掉元素之间的空格，所有的代码都紧挨着写
2. 利用 html 注释，所有边间质检的空隙都用注释填充
3. 取消标签闭合，这样空隙的部分就算到标签里边了。经过我的测试子元素是 a 标签的时候是好使的。但是 span 标签 GG 了
```html
<style>
    a {
        display: inline-block;
    }
</style>
<div>
    <a>你好
    <a>我的间距不见了
    <a>哈哈哈, 气不气
</div>
```
4. 在父容器设置 font-size: 0; 也可以实现不展示间隔

# 重绘和回流

## 回流 - 重排

依据 Dom 渲染的流水线重新渲染 Dom 树，相当于所有的绘制流程重新走一遍的流程

### 触发条件

当我们对 DOM 结构修改引起其几何尺寸变化的时候会发生回流过程：

1. 一个 DOM 的几何属性变化：常见的几何属性有：width height padding margin border 等等…
2. DOM 节点增减或者移动
3. 读写 offset 族，scroll 族，client 族属性的时候，浏览器为了读取这些值会进行回流
4. 调用 getComputedStyle 获取样式的时候也会触发回流

## 重绘

当 render tree 中的一些元素需要更新属性，而这些属性只是影响元素的外观而不会影响布局时，元素的几何位置无需更新。从而省去了构建 DOM 树的过程。直接进行绘制。

### 触发条件

当 Dom 的修改导致了 Dom 样式的变化但是没有影响几何属性的时候就会触发重绘

由此可见，重绘不一定回流，但是回流一定重绘。

## 合成

还有一种情况，就是直接合成。如果使用了 transform, opacity, filter 等属性 Gpu 会直接跳过布局和绘制的流程。直接交给合成线程处理。好处包括：

1. 充分发挥 Gpu 的性能优势。因为 Gpu(显卡) 对于位计算性能优越
2. 没有占用主线程资源，即使主线程卡住。动画效果依然可以流畅展示

当然这就是传说中的 Gpu 加速啦 ~

## DOM Tree 与 Render Tree 之间的区别是什么

DOM Tree: 包含了所有的 HTML 标签，包括 display: none 的元素，JS动态添加的元素等。
Render Tree: DOM Tree 和样式结构体结合后构建呈现 Render Tree. Render Tree 能识别样式，每个 node 都有自己的style, 且不包含隐藏的节点(display: none)

## CSS 权重列表

权重 | 选择器
--- | ---
10000 | !important
1000 | 内联样式
100 | id 选择器
10 | 类 / 伪类 / 属性选择器
1 | 标签 / 伪元素选择器
0 | 通用选择器 * / 子选择器 > / 相邻选择器 + / 同胞选择器 ~

## 垂水居中

1. 绝对定位 + 位置偏移
    a. 已知尺寸左上 margin: -(尺寸一半)
    b. 未知尺寸 translate: (-50%, -50%, 0)
2. flex 布局
3. tabel 布局
    父元素：
        display: table-cell;
        vertical-align: middle;  // 垂直居中
        text-align: center;     // 水平居中

## margin 塌陷的解决办法

当盒子在垂直方向设置 margin 时会存在塌陷情况，解决方案如下：

1. 给父级添加 border
2. 给父盒子添加 padding-top
3. 给父盒子添加 overflow: hidden
4. 父盒子 position: fixed
5. 父盒子 display: table
6. 通过伪元素在子元素的前边添加一个兄弟元素并设置属性为 content: ''; overflow: hidden;

## display none vs visibility hidden

1. Display: none 会让元素从渲染树中消失，不占据任何空间。visibility: hidden 不会让元素消失，仍然占据渲染空间只是内容不可见
2. Display: none 是非继承属性，子孙节点的不可见原因为父节点没有在渲染树中渲染导致。visibility: hidden 是继承属性，子孙属性的不可见是由于继承了父级的 hidden. 如果设置 visibility: visible 仍然可以展示出来
3. 修改 display 属性会触发子组件的回流而修改 visibility: hidden 只会触发子组件的重绘
4. 读屏器会读取 visibility: hidden; 的内容，但是无法读取 display: none; 的元素
