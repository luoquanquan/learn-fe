const url = require('url')
const http = require('http')
const { join } = require('path')
const fs = require('mz/fs')
const mime = require('mime')

const basePath = join(__dirname, 'public')

class Server {
    constructor(port) {
        this.port = port || 3333
    }

    async handleRequest(request, response) {
        const { pathname } = url.parse(request.url, true)
        let absPath = join(basePath, pathname)

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