const url = require('url')
const http = require('http')
const { join } = require('path')
const fs = require('mz/fs')
const mime = require('mime')

const basePath = join(__dirname)

class Server {
    constructor(port) {
        this.port = port || 3333
    }

    async handleRequest(request, response) {
        const { pathname } = url.parse(request.url, true)
        let absPath = join(basePath, pathname)

        let { method, headers: { origin, cookie } } = request
        method = method.toLowerCase()

        /**
         * 跨域携带 cookie 的原理是这样的
         * 首先, 本地 hosts 设置三条 hosts
         * 127.0.0.1 a.quanquan.com
         * 127.0.0.1 b.quanquan.com
         * 127.0.0.1 quanquan.com
         * 其次, 启动本程序的静态文件服务(3333), 并把 index.html 中 ajax 请求的域名切换为 quanquan.com
         * 访问 quanquan.com:3333 并在控制台设置 cookie: document.cookie = 'origin=quanquan.com:3333'
         * 此时访问 b.quanquan.com:3333 可以看到下方 console.log() 打印的 cookie 仍然是 origin=quanquan.com:3333
         * 此时在 b.quanquan.com:3333 页面控制台中设置 document.cookie = 'origin=b.quanquan.com:3333'
         * 继续刷新浏览器, 发现后端打印的 cookie 还是 origin=quanquan.com:3333
         * 此时把 index.html 中的请求 url 切换为 b.quanquan.com 刷新, 发现后端获取的 cookie 变成了 origin=b.quanquan.com:3333
         * 此时我们在浏览器再访问 a.quanquan.com 发现后端获得的 cookie 依然是 origin=b.quanquan.com:3333
         * 综上, 可以总结出. 跨域请求携带 cookie 时候是携带的你即将请求的域名下的 cookie, 而不是当前浏览器地址栏下的 cookie
         * 这一点老司机也经常出错
         * A -- 访问 --> B: 携带 B 的 cookie
         * B -- 访问 --> B: 携带 B 的 cookie
         * 父 -- 访问 --> B: 携带 B 的 cookie
         *
         * 到这里就借宿似乎就很简单了, 然而, 这时我们浏览器访问 http://quanquan.com:3333/ 并在 Application tab 下设置把 quanquan.com 的 domain 前边加一个 "点"
         * 然后到 a.quanquan.com:3333 下刷新
         * 后端得到的 cookie: --->  origin=b.quanquan.com:3333; origin=quanquan.com:3333
         * 一级域名下的 cookie 放在了后边, 二级域名下的同名 cookie 放在了前边
         * 当存在不同名的 cookie 时候也是这样的, 二级前 一级 拼在后边
         */

        // 发送页面 *.html 请求的时候不会携带 origin 请求头, 不用设置跨域
        if (origin) {
            response.setHeader('Access-Control-Allow-Origin', origin)
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            response.setHeader('Access-Control-Allow-Headers', 'token')
            // 预检请求的有效时间, 单位是秒. 默认值为 5
            response.setHeader('Access-Control-Max-Age', 10)
            response.setHeader('Access-Control-Allow-Credentials', true)
        }

        if (method === 'options') {
            return void (response.end())
        }

        switch (pathname) {
            case '/user':
                console.log(`当前时间 ${Date.now()}: debug 的数据是 cookie: `, cookie)
                if (method === 'get') {
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify({ name: 'quanquan', method: 'get' }))
                }

                if (method === 'put') {
                    response.setHeader('Content-Type', 'application/json')
                    response.end(JSON.stringify({ name: 'quanquan', method: 'put' }))
                }
                break;
            default:
                break;
        }
        try {
            const statusObj = await fs.stat(absPath)

            if (statusObj.isDirectory()) {
                absPath = join(absPath, 'index.html')
            }

            await fs.access(absPath)

            this.renderFile(absPath, response)
        } catch (error) {
            this.renderError(response)
        }
    }

    renderFile(absPath, response) {
        response.setHeader('Content-Type', mime.getType(absPath))
        fs.createReadStream(absPath).pipe(response)
    }

    renderError(response) {
        response.statusCode = 404
        response.end('Not found~')
    }

    start() {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, () => {
            console.log(`the server is running on ${this.port}`)
        })
    }
}

new Server().start()