# H5唤端方案

## 背景

关于网页唤起端能力的问题, 我想到了美团的大佬王兴的一个博客 ~

![](http://handle-note-img.niubishanshan.top/2021-07-19-11-56-00.png)

由于当时在创新部门, 团队时不时就要搞一个新的 App, 遍观当时项目中关于唤端的逻辑代码, 要么只兼容安卓. 要么只兼容苹果. 明明安卓的 QQ 下可以打开, 可到了苹果的 QQ 就点不动了...

鉴于这种情况, 我就尝试要不写个库. 以后的代码全部 `npm i` 一把梭就可以去划水美滋滋 ~

![](http://handle-note-img.niubishanshan.top/2021-07-19-14-30-20.png)

## 各类唤端方案简介

经过了一系列的调研工作, 我们了解到目前还没有一种可以实现跨所有终端所有 app 的唤端方案. 根据不同的终端和 app 的限制, 目前常用的方案有以下几种:

- 弹出蒙层提示用户下载打开 app
- location + Scheme Url
- a 标签 + Scheme Url
- 微信开放标签 (微信 >= 7.0.12)
- universal link (iOS >= 9; iOS 微信 >= 7.0.7 放开限制)

### 弹出引导下载的弹窗

解决问题最直接的方法往往是简单的. 所以最初的方案就是弹个蒙层提示用户去 app 打开.

![](http://handle-note-img.niubishanshan.top/2021-07-13-16-01-29.png)

优点:
- 简单易行
- 快发体验好

缺点:
- 转化率低
- 用户体验不好

### location + Scheme Url

从[这篇文章](https://www.jianshu.com/p/fdc00c4fbb83)中, 我学习到了 location + Scheme Url 的唤端方案

```js
button.onclick = () => {
    location.href = 'imv://tab/feed'
}
```

![](http://handle-note-img.niubishanshan.top/scheme.gif)

看到这个效果之后大大的松了一口气, 难怪没有大佬写过相关的库. 这么简单的一行代码, 写出来简直贻笑大方. 那么 `git push` 上线, 直到测试体验同学找过来:

A: 圈圈, 我在苹果手机 QQ 里点开分享页打不开 app 呀
B: 圈圈, 我在微信里点开分享页打不开 app 呀
C: 圈圈, 我在微博里点开分享页打不开 app 呀
D: 圈圈, 我在 Kim 里点开分享页打不开 app 呀, WTF
....

经测试, `location + Scheme Url` 唤端方案在目前只有在我的 Safari 浏览器上好使.

### a 标签 + Scheme Url

由于我们的产品的主要用户是年轻的朋友, 所以 QQ 的问题就显得很棘手. 于是, 在组里前端老鸟 @伟哥 的提示把 iOS QQ 环境下的唤端方案改成了 A 标签唤端的伪代码如下:

```js
const a = document.createElement('a')
a.style.display = 'none'
a.href = 'imv://tab/feed'
a.click()
```

修改后苹果手机 QQ 上的效果如下, 唤端成功

![](http://handle-note-img.niubishanshan.top/tagA.gif)

经过上述两种方案, 我们实现了安卓 iOS 双端的系统浏览器和 QQ 上唤起 App 的能力. 但是面对 app 界的顶流微信还是无计可施.

### 微信开放标签

好在找到了[微信开放标签](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#22)的文档. 微信在 7.0.12 版本加入了微信开放标签. **认证的服务号** 可以通过在网页中添加微信开放标签实现唤端操作.

### universal link

`universal link` 是 ios 9 推出的一种方案, 可以方便用户以访问一个链接的形式唤起 App, 这种唤端的方案体验就像是 App 端内切换页面用户无感知. 微信在其 >= 7.0.7 版本放开了对其的限制.

## 参考文档

- [h5唤起app技术deeplink方案总结](https://www.jianshu.com/p/fdc00c4fbb83)
- [微信开放标签](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#22)
- [Support Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html#//apple_ref/doc/uid/TP40016308-CH12-SW1)
