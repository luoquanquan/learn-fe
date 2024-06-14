const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const crypto = require('crypto')
const url = require('url')
const PORT = 3333

const renderFile = (filePath, response, file = null) => {
    response.setHeader('Content-Type', mime.getType(filePath))
    file ? response.end(file) : fs.createReadStream(filePath).pipe(response)
}

const render404 = response => {
    response.statusCode = 404
    response.end('Not found')
}

const render304 = response => {
    response.statusCode = 304
    response.end('Not Modified')
}

const checkLastModified = (st, lastModifiedTime) => {
    const mtime = st.mtime.toGMTString()
    let ret = {
        hited: false,
        lastModified: mtime
    }
    if (mtime === lastModifiedTime) {
        ret = {
            hited: true,
            lastModified: lastModifiedTime
        }
    }

    return ret
}

const checkEtag = (filePath, lastEtag) => new Promise((resolve, reject) => {
    const md5 = crypto.createHash('md5')
    const rs = fs.createReadStream(filePath)
    const chunks = []

    rs.on('data', chunk => {
        chunks.push(chunk)
        md5.update(chunk)
    })

    rs.on('end', () => {
        const etag = md5.digest('base64')
        const file = Buffer.concat(chunks)

        resolve({
            file,
            etag,
            hited: lastEtag === etag
        })
    })
})

http.createServer((request, response) => {
    const { pathname } = url.parse(request.url)
    const { headers: {
        ['if-modified-since']: lastModifiedTime,
        ['if-none-match']: lastEtag
    } } = request

    const filePath = path.join(__dirname, pathname)
    fs.stat(filePath, async (err, st) => {
        if (err) {
            return void (render404(response))
        }

        if (st.isFile()) {
            // html 文件不走缓存判断直接返回
            if (path.extname(filePath) === '.html') {
                return void (renderFile(filePath, response))
            }

            response.setHeader('Expires', new Date(Date.now() + 1e4).toGMTString())
            response.setHeader('Cache-Control', 'max-age=10')

            const { hited: hitEtag, file, etag } = await checkEtag(filePath, lastEtag)
            if (hitEtag) {
                return void (render304(response))
            } else {
                response.setHeader('Etag', etag)
            }
            const { hited: hitLastModified, lastModified } = await checkLastModified(st, lastModifiedTime)
            if (hitLastModified) {
                return void (render304(response))
            } else {
                response.setHeader('Last-Modified', lastModified)
            }

            renderFile(filePath, response, file)
        } else {
            render404(response)
        }
    })
}).listen(PORT, () => {
    console.log(`the server is listening on ${PORT}`)
})
