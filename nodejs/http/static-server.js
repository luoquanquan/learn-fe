const http = require('http')
const url = require('url')
const fs = require('mz/fs')
const mime = require('mime')
const {join} = require('path')

const basePath = join(__dirname, 'public')

const conf = {
    PORT: 3333
}

const server = http.createServer((request, response) => {
    const {url: reqUrl} = request
    const {pathname} = url.parse(reqUrl, true)
    const absPath = join(basePath, pathname)

    // 处理路径, 如果前前端请求的是一个目录而不是文件的话默认查找目录里边的 index.html
    const handlePath = stats => {
        let filePath = absPath
        if (stats.isDirectory()) {
            filePath = join(absPath, 'index.html')
        }
        return filePath
    }

    // 根据文件的后缀名称确定返回的响应头响应文档类型
    const setHeader = filePath => {
        response.setHeader('Content-Type', mime.getType(filePath))
        return filePath
    }

    // 使用流读取文件, 并直接写到响应里边
    const readAndSend = filePath => fs.createReadStream(filePath).pipe(response)

    // 错误捕获
    const catchError = err => {
        console.log(err)
        response.statusCode = 404
        response.end('Not found ~')
    }

    fs.stat(absPath)
        .then(handlePath)
        .then(setHeader)
        .then(readAndSend)
        .catch(catchError)
})

server.listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})