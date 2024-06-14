# http 缓存笔记

> Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 这个版本的 Chrome 的缓存逻辑应该是有 bug, 使用的是 Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0 版本的 Firefox

## 目录

- [协商缓存](#negotiation)
- [强制缓存](#force)
- [浏览器差异](#browser)

<h2 id="negotiation">协商缓存</h2>

### Last-Modified / If-Modified-Since

- 请求初次到达后端设置响应头 Last-Modified 为文件最后一次修改的时间
- 下次请求时浏览器自动携带请求头 `If-Modified-Since` 值为上次访问相同路径资源(包括 path + search...不含 hash)时返回的 Last-Modified 字段的值
- 后端判断
  - 如果请求头 `If-Modified-Since` 为文件当前的最后修改时间时, 返回 304
  - 如果没有 `If-Modified-Since` 请求头 OR 请求头和文件当前的最后修改时间不一致正常返回文件, 并携带响应头 `Last-Modified` 为新的最后更新时间
- 结束

PS: 如果文件设置了 `Last-Modified`, 下次访问时会命中浏览器默认的强缓存策略(浏览器来自上方说的 bug 版本浏览器 Chrome)
1. 没有关闭浏览器在当前页面刷新重新获取该图片的话返回 statusCode 为 200, Size tab 展示内容来自 memory cache
2. 没有关闭浏览器在当前页面刷新重新获取该图片的话返回 statusCode 为 200, Size tab 展示内容来自 disk cache
3. 关闭浏览器再打开当前 url index.html 甚至都会命中强缓存 statusCode 为 200, Size tab 展示内容来自 disk cache

项目中加入一张 svg 格式的内容以后, 打开 svg 文件没有修改其内部的内容直接保存的话刷新浏览器, 并不能命中缓存, 这是因为保存的时候文件的 modify-time 发生了改变导致的, 因此引入了根据文件内容创建 hash 值的 Etag 方式实现的缓存判断逻辑~

### Etag / If-None-Match

- 请求到来根据文件内容获取文件的 md5 值
  - 对于小文件可以对整个文件进行哈希计算
  - 对于大文件常用的方案是对文件名和文件的大小进行哈希计算并生成 md5
- 读取请求头的 `If-None-Match` 并与之前步骤获取的 md5 值进行对比
  - 若两个值相等直接返回 304 不再进行 `Last-Modified` 的比对(体现出 Etag 优先级高于 `Last-Modified`)
  - 两个值不相等的话写入响应头 Etag 为新生成的 md5 值
  - 进行字后的缓存判断逻辑 -> `Last-Modified`
- 结束

<h2 id="force">强制缓存</h2>

### Expires / Cache-Control(强缓存 - 命中的时候不发送请求)

#### Cache-Control 缓存控制

##### 特点

- 优先级最高, 设置后其他的缓存判断逻辑会被忽略
- http 1.1 规范
- 可配置的值较多

##### 可配置的值

- nostore 禁用缓存, 禁止所有的缓存判断逻辑
- nocache 禁用代理服务器缓存, 我的理解是访问 cdn 等服务时直接回源处理
- max-age 缓存有效期, 单位是 s

#### Expires 存续时间

- http 1.0 规范, 部分浏览器已经不支持了
- 节后一个 GMT 格式的时间, 为未来某时刻的一个绝对时间点

<h2 id="browser">浏览器差异</h2>

### FireFox

- 点击刷新按钮会忽略强缓存逻辑强制发送请求, 但是会携带协议缓存的请求头信息, 也就是可以命中协议缓存
- 直接在地址栏内回车访问, 命中强缓存的请求不会发送
- 新开的页签粘贴地址命中强缓存的请求也不会被发送出来

### Chromme

- 当前版本的缓存逻辑好像有问题, 只要写了缓存相关的响应头信息就会命中强缓存, 待官方修复吧
- Disable Cache 功能就是在请求头中加了 `Cache-Control: no-cache` 和 `Pragma: no-cache`, 同时移除了 `If-Modified-Since` 和 `If-None-Match` 实现了禁用代理缓存和防止协商缓存逻辑命中
