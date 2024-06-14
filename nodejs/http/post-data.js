const http = require('http')
// 这里也可以引用第三方模块 qs
const querystring = require('querystring')

const conf = {
    PORT: 3000
}

const getRequestBody = bodyStr => {
    const obj = {}
    const reg = /([^=&]*)=([^=&]*)/g
    bodyStr.replace(reg, (...args) => {
        const [, k, v] = args
        obj[k] = v
    })
    return obj
}

const app = http.createServer((request, response) => {
    const { method }  = request
    if (method === 'POST') {
        const dataArr = []
        request.on('data', chunk => {
            dataArr.push(chunk)
        })

        request.on('end', () => {
            const data = Buffer.concat(dataArr).toString()
            const obj = querystring.parse(data)
            response.setHeader('content-type', 'application/json')
            response.end(JSON.stringify(obj))
        })

    } else {
        response.end('hello world ~')
    }

})

app.listen(conf.PORT, () => {
    console.log(`the Server is listening on ${conf.PORT}`);
})