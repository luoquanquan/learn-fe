const http = require('http')
const querystring = require('querystring')
const url = require('url')

const conf = {
    PORT: 3333
}

const server = http.createServer((request, response) => {
    const { method, headers, url: requestUrl } = request
    const { pathname, query } = url.parse(requestUrl, true)

    if (method.toLocaleLowerCase() === 'post') {
        const dataArr = []

        request.on('data', chunk => {
            dataArr.push(chunk)
        })
        request.on('end', () => {
            let dataObj = {}
            const dataStr = Buffer.concat(dataArr).toString()
            const cType = headers['content-type']

            if (cType === 'application/x-www-form-urlencoded') {
                dataObj = querystring.parse(dataStr)
            } else if (cType === 'application/json'){
                dataObj = JSON.parse(dataStr)
            }

            // 这里就可以对 dataObj 里边的数据做处理了
            response.setHeader('content-type', 'application/json')
            response.end(JSON.stringify(dataObj))
        })

    } else {
        response.end('hello world~')
    }
})

server.listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})