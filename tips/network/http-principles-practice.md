# HTTP协议原理+实践

课程链接: <https://coding.imooc.com/class/225.html>

![](http://handle-note-img.niubishanshan.top/2020-03-04-20-55-42.png)

## 基础部分

### 概念

HTTP (HyperText Transfer Protocol): 超文本传输协议, 它是建立在 TCP/IP 协议之上的应用层规范. 是互联网上应用最广泛的一种网络协议.

### HTTP 5 层网络模型

![](http://handle-note-img.niubishanshan.top/2020-03-04-20-46-44.png)

各个层级概述
- 物理层, 主要作用是定义物理设备如何连接和传输数据
- 数据链路层, 在通信实体间建立数据链路连接
- 网络层, 为数据在节点之间传输创建逻辑链路
- 传输层, 用于向用户提供端到端(end to end)的服务. 传输层向上层屏蔽了下层数据通信的细节. 例如, 包体过大时的分包问题.
- 应用层, 为软件提供服务, 构建与 TCP 协议之上, 向应用软件屏蔽了网络传输相关的细节

### HTTP 的发展历史

![](http://handle-note-img.niubishanshan.top/2020-03-04-20-58-06.png)

#### HTTP / 0.9

发布于 1991 年, 该版本极其简单.
- 只有一个命令 GET
- 没有 HEADER 等描述数据的信息
- 服务端内容发送完成之后就关闭 TCP 连接

#### HTTP / 1.0

- 任何格式的内容都可以发送, 使得互联网不仅能传递文字还能传输图片 / 视频 / 二进制文件, 为互联网的大发展奠定了基础
- 增加了 POST / PUT / HEADER 等命令
- 增加了 status code 和 header 相关内容.
- 增加了多字符集的支持, 多部分发送(multi-part), 权限(authorization), 缓存(cache), 内容编码(content encoding)等

HTTP / 1.0 的缺点, 就是每个 TCP 连接只能发送一个请求. 数据发送完毕就会断开 TCP 连接, 如果需要请求其他资源就需要重新创建 TCP 连接

#### HTTP / 1.1

- 持久连接, 设置 TCP 连接在数据发送完成后默认不关闭, 可以被后续的请求复用. 解决了 1.0 版本中的问题. 客户端或者服务端发现对方一段时间没有活动就可以主动关闭连接. 规范的做法是, 客户端在最后一个请求时发送`Connection: close` 明确通知服务器关闭 TCP 连接
- 增加了管道机制, 可以在一个 TCP 连接里发送多个 http 请求, 但是在 1.1 版本中虽然可以在同一个 TCP 连接里发送多个 http 请求, 但是服务器对于进来的请求时按照顺序进行数据返回的. 如果前一个请求等待时间非常长, 而后一个请求处理得比较快. 这个时候后一个请求不能先发送, 而是要等第一个请求数据全部发送完成之后, 才能进行发送. 即是串行的.
- 增加了 HOST 头, 有了 HOST 之后就可以在一台服务器(物理机)上同时跑多个 web 服务, 提升了物理机的利用率

#### HTTP / 2

- 所有数据都以二进制传输, 在 HTTP/1.1 里面大部分的数据传输是通过字符串, 所以数据的分片方式是不太一样的. 在 HTTP/2 里面所有的数据都是以帧进行传输的
- 同一个连接里面发送多个请求时, 服务器端不再需要按照顺序来返回处理后的数据. 而是可以在返回第一个请求里面数据的时候, 同时返回第二个请求里面的数据. 这样的并行传输能够更大限度地提高 web 应用的传输效率
- 新增头信息压缩, 有效减少带宽使用
- 新增推送等功能, HTTP/2之前, 只能由客户端发送数据, 服务器端返回数据. 客户端是主动方, 服务器端永远是被动方. 在 HTTP/2 里面有了 "推送" 的概念, 也就是说服务器端可以主动向客户端发起一些数据传输
- HTTP/2 其实主要就是改善了 HTTP/1.1 里面造成性能低下的一些问题

推送功能实例, 一个web页面加载时会要求一些html, css, js等文件, css和js文件是以链接的形式在 html 文本里面显示的, 只有通过浏览器解析了 html 里面的内容之后, 才能根据链接里面包含的URL地址去请求对应的 css 和 js 文件.
在HTTP/2之前, 这个传输过程会包含顺序问题, 需要先请求到 html 的文件, 通过浏览器运行解析这个 html 文件之后, 才能去发送 css 的请求和 js 的请求.
HTTP/2 中有了推送功能之后, 在请求 html 的同时, 服务器端可以主动把 html 里面所引用到的 css 和 js 文件推送到客户端, 这样html, css 和 js 的发送就是并行的而不是串行的

### 三次握手

![](http://handle-note-img.niubishanshan.top/2020-03-04-21-47-22.png)

### cache-control

- public, 请求发送过程中的任何一个环节(如, 代理服务器)都可以缓存请求的内容
- private, 只有发起请求的浏览器能够缓存请求的内容
- no-cache, 可以存储请求的内容, 但是缓存的内容是否可用需要向服务器发请求查询. no-cache的响应实际是可以存储在本地缓存中的, 只是在与原始服务器进行新鲜度再验证之前, 缓存不能将其提供给客户端使用
- no-store, 禁用缓存, 禁止本地和代理服务器缓存请求的文件
- max-age = <second> 缓存到期时间
- s-maxage = <second> 代理服务器上缓存的内容过期时间
- max-stale = <second> 即使缓存已经过了有效期, 但是仍然可以使用缓存(浏览器中用不到)
- must-revalidate, 缓存必须在使用之前验证旧资源的状态, 并且不可使用过期资源. 表示如果页面过期, 则去服务器进行获取
- proxy-revalidate, 与must-revalidate作用相同, 但它仅适用于共享缓存(例如代理), 并被私有缓存忽略
- no-transform, 禁止代理服务器修改请求信息

### 其他内容

- 数据协商 Accept / Content-Type 这些
- Redirect (301 from disk cache, 302, 307 / POST)
- CSP(content security policy)

## 实战部分

## 安装

```shell
brew install nginx
```

安装成功后 `nginx` 的位置在 `/usr/local/etc/nginx` 目录下.

## 启动

```shell
nginx
```

运行 `nginx` 命令没有报错说明安装启动成功, 验证方式为浏览器直接访问 [localhost](http://localhost) 查看是否成功展示 `nginx` 欢迎页面

## 配置

> 正式线上配置的 nginx 需要配置 DNS 来把域名指向我们的服务器 IP. 由于本地开发, 直接修改 hosts 即可

```hosts
12.0.0.1 quanquan.com
```

PS: 每次修改配置文件以后都要执行 `nginx -s reload` 重启 `nginx`

### 导入额外配置文件

安装 `nginx` 成功后, 其配置文件的默认配置文件为 `/usr/local/etc/nginx/nginx.conf` 文件,
打开配置文件, 取消 `include servers/*;` 这一行前边的注释, 就可以随意在 `servers` 目录下创建配置文件了. 本次笔记中只创建 `test.conf` 配置文件

### 配置一个简单的代理服务器

编写 nginx 配置文件如下
```nginx
server {
    listen 80;
    server_name quanquan.com;
    location / {
        proxy_pass http://127.0.0.1:3333;
    }
}
```

创建一个 `server` 文件
```js
const http = require('http')

http.createServer((request, response) => {
    console.log(request.headers);
    response.end('<h1>Hello world<h1>')
}).listen(3333, () => {
    console.log('the server is running~')
})
```

服务文件中, 对于所有的请求直接返回了 `<h1>Hello world<h1>`, 并且打印了请求的头信息, 可以看到以上的代理服务虽然能够成功代理到业务服务但是打印的 HOST 头信息, 变成了代理服务请求的 HOST: 127.0.0.1:3333

### 修正 HOST 头信息

把 location 块修改为以下内容即可
```conf
...
location / {
    proxy_pass http://127.0.0.1:3333;
    proxy_set_header Host $host;
}
...
```

### 配置代理缓存服务器

第一步, 指定缓存信息
```conf
proxy_cache_path /Users/quanquanluo/nginx_cache levels=1:2 keys_zone=cache:10m max_size=10g inactive=60m use_temp_path=off;
```
在此步骤中我们指定了, nginx 缓存的目录重启 nginx 之后会在指定的缓存目录创建一个

第二步, 把 location 块修改为以下内容即可
```conf
...
location / {
    proxy_cache my_cache;
    proxy_pass http://127.0.0.1:3333;
    proxy_set_header Host $host;
}
...
```

第三步, 升级 `server.js`

```js
const http = require('http')
const fs = require('fs')
const sleep = () => new Promise(resolve => setTimeout(() => resolve(), 2e3))

const img = fs.readFileSync('./test.jpg')

http.createServer(async (request, response) => {
    const {url} = request
    console.log(url);
    if (url === '/') {
        response.end('<h1>Hello world<h1><img src="/test.jpg" />')
    }

    if (url === '/test.jpg') {
        await sleep()
        response.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'max-age=5, s-maxage=10'
        })
        response.end(img)
    }

    response.end()
}).listen(3333, () => {
    console.log('the server is running~')
})
```

第四步, 通过 Vary 字段可以指定只有某个请求头一致的时候才能使用缓存

示例,
```js
response.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'max-age=5, s-maxage=10',
    Vary: 'User-Agent'
})
```

以上配置指定了只有请求头 `User-Agent` 一致的时候才能使用缓存. 这个的使用场景就是为相同的终端提供一致的缓存信息

### 在本地配置 https 服务

第一步, 生成证书.
```shell
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -keyout localhost-privkey.pem -out localhost-cert.pem
```
执行该步骤后, 会在当前目录创建 `localhost-privkey.pem` `localhost-cert.pem` 两个文件

第二步, 修改配置爱文件中的 server 块
```nginx
server {
    listen 443 ssl;
    server_name quanquan.com;

    ssl_certificate_key    path to /localhost-privkey.pem;
    ssl_certificate        path to /localhost-cert.pem;
    ....
}
```
新版的 chrome 中, 自建的证书, 没有了不安全页面的继续访问入口. 所以有了下一步

第三步, 安装并信任刚刚创建的证书

- 在 finder 中找到生成的 localhost-cert.pem 文件并双击
- 在钥匙串登录类别中找到创建证书时候输入的证书名字, 我写的是 CN
- 双击刚刚安装的证书弹出以下图片, 按照图示设置

![](http://handle-note-img.niubishanshan.top/2020-03-05-15-58-30.png)

至此, 再通过 https 访问 `quanquan.com` 弹出的不安全页面就可以通过高级, 选择仍要前往了. 本地配置 https 环境完成

### 访问 http 自动跳转到 https

在配置文件中添加以下配置即可
```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name quanquan.com;
  return 302 https://$server_name$request_uri;
}
```

### 升级 http2

就这么一句
```nginx
listen 443 http2 ssl;
```

### 开启 http2 Server-Push

第一步, nginx 配置文件 `server` 块中添加 `http2_push_preload on;`
第二步, 升级服务代码

```js
...
if (url === '/') {
    response.writeHead(200, {
        'Link': '</test.jpg>; rel=preload; as=image'
    })
    response.end('<h1>Hello world<h1><img src="/test.jpg" />')
}
...
```
以上代码的意思是当浏览器访问 `/` 路径时, 主动向浏览器推送 test.jpg

由于, 自签名的证书构建的 https 会被浏览器标记为不安全的服务, 所以浏览器上看不到效果...

但是这个语法是没有问题的~

## 参考文章

- [Nginx下关于缓存控制字段cache-control的配置说明](https://www.cnblogs.com/kevingrace/p/10459429.html)
- [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
- [HTTP/2 服务器推送（Server Push）教程](http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)
- [HTTP、HTTP2.0、SPDY、HTTPS 你应该知道的一些事](https://www.cnblogs.com/wujiaolong/p/5172e1f7e9924644172b64cb2c41fc58.html)
