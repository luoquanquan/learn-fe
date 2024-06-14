const http = require('http')
const fs = require('fs')

const conf = {
    PORT: 3333
}

const html = fs.readFileSync('./index.html', 'utf8')
const img = fs.readFileSync('./test.jpg')

http.createServer((request, response) => {
    const {url} = request
    console.log(url)
    if (url === '/') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })

        response.end(html)
    }

    if (url.startsWith('/test')) {
        response.writeHead(200, {
            'Content-Type': 'image/jpg',
            Connection: 'close'
        })

        response.end(img)
    }
}).listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})
