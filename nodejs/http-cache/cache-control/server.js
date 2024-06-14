const http = require('http')
const conf = {
    PORT: 3333
}

http.createServer((request, response) => {
    const {url} = request
    console.log(url)
    if (url === '/') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })

        response.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>cache-control</title>
            </head>
            <body>

                <script src="/script.js"></script>
            </body>
            </html>
        `)
    }

    if (url === '/script.js') {
        response.writeHead(200, {
            'Content-Type': 'text/javascritp',
            'Cache-Control': 'max-age=200, public'
        })

        response.end('console.log("new script loaded~")')
    }
}).listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})
