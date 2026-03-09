# URL 跳转漏洞

## 概念

URL 跳转漏洞, 就是利用没有验证功能的 Url 跳转能力, 将应用引导到不安全
的第三方区域.

![](http://handle-note-img.niubishanshan.top/2020-02-15-19-56-30.png)

## 实现方式

- header 跳转
- JavaScript 跳转
- Meta 标签跳转

## 防范

跳转前要检验待跳转的 url 是否是合法的, 通过添加白名单控制
