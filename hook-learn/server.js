const http = require('http')
const url = require('url')
const PORT = 8000

http.createServer((request, response) => {
    const {pathname, query} = url.parse(request.url, true)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.writeHead(200, {'Content-Type': 'application/json;charset=utf8'})
    if (pathname === '/api/user') {
        const ret = []
        let { offset, limit } = query
        offset = +offset
        limit = +limit

        for(let i = 0; i < limit; i++) {
            const id = offset + i
            ret.push({id, name: `我是 - ${id} - 号用户`})
        }

        response.end(JSON.stringify(ret))
    } else {
        response.end()
    }
}).listen(PORT, () => {
    console.log(`the Server is listening on ${PORT}`)
})


