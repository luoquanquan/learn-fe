## url

统一资源定位符

![](http://handle-note-img.niubishanshan.top/2020-02-14-23-03-28.png)

## http

### 概念

超文本传输协议 `Hyper Text Transfer Protocol`

![](http://handle-note-img.niubishanshan.top/2020-02-14-23-09-51.png)

### 特征

- web 通信使用的协议
- web 的基础
- 最广泛
- ⋯⋯

### 报文

GET:
![](http://handle-note-img.niubishanshan.top/2020-02-14-23-11-25.png)

POST:
![](http://handle-note-img.niubishanshan.top/2020-02-14-23-13-52.png)

### 请求方法

请求类型 | 含义
--- | ---
POST | 创建一个资源
DELETE | 删除指定资源
PUT | 更新资源
GET | 获取资源
HEAD | 与 GET 请求类似，区别在于 HEAD 请求只需要服务器返回 HTTP 头信息，没有页面内容
OPTIONS | 咨询服务器当前情况下的可访问性

### Referer

告知服务器当前请求的来源(浏览器添加 js 不可修改)

Referer 的用途有
- 防止盗链
- 防止 CSRF

## 钓鱼网站

- 诱惑性标题
- 仿冒真实网站
- 骗取用户账号
- 骗取用户资料

## 网页篡改

修改网页，这个比较常见

## 搜索引擎技巧

- Intitle:keyword 标题中含有关键字的网页
- Intext:keyword 正文中含有关键词的网页
- Site:domain 某个域名和子域名下的所有网页

## 暗链

隐藏在网页中的链接，不能被正常人点击。主要目的是提升链接性，获得在搜索引擎爬虫的曝光度

## webshell

- 后门，可执行环境
- 功能强大
- 入侵检测系统难以发现

## 常见的攻击方式分类

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-12-50.png)
