/**
 * history 模式的前端路由, 需要后端配合总是返回 index.html
 * 这里没有 nginx 就用 nodejs 模拟一下吧~
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 3333

http.createServer((request, response) => {
    const {pathname} = url.parse(request.url)

    const renderFile = filePath => {
        fs.createReadStream(filePath).pipe(response)
    }

    response.setHeader('Content-Type', 'text/html')
    if (pathname === '/hash-router.html') {
        renderFile(path.resolve(__dirname, './hash-router.html'))
    } else {
        renderFile(path.resolve(__dirname, './history-router.html'))
    }
}).listen(PORT, () => {
    console.log(`the server is listen on ${PORT} enjoy`)
})
