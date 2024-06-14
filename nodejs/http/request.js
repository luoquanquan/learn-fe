const http = require('http')

const conf = {
    PORT: 3000
}

const app = http.createServer((request, response) => {
    const {
        method,
        url,
        httpVersion,
        headers
    } = request

    response.end(JSON.stringify({
        // 方法名是大写的
        method,
        // 请求的路径-不包含域名等信息
        url,
        httpVersion,
        // headers 里边的属性名字都是小写的
        headers
    }))
})

app.listen(conf.PORT, () => {
    console.log(`the Server is listening on ${conf.PORT}`);
})