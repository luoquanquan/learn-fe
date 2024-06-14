const {createServer} = require('http')
const url = require('url')
const methods = require('methods')
const fs = require('fs')
const path = require('path')
const typeis = require('type-is')
const qs = require('querystring')

const application = () => {
    const routes = []

    let app = (req, res) => {
        let idx = 0
        const {pathname} = url.parse(req.url)
        const method = req.method.toLowerCase()
        const next = err => {
            if (idx === routes.length) {
                res.statusCode = 404;
                res.end('404')
                return
            }

            const {handler, path, method: mtd} = routes[idx++]

            if (err) {
                if (mtd === 'middleware' && handler.length === 4) {
                    handler(err, req, res, next)
                } else {
                    next(err)
                }
            } else {
            // 中间件
            if (mtd === 'middleware') {
                if (
                    // 所有路径可用
                    // eg: app.use((req, res, next) => {next()})
                    // eg: app.use('/', (req, res, next) => {next()})
                    path === '/'
                    // 完整匹配
                    // eg: app.use('/user'(req, res, next) => {next()})
                    //   -> http invoke http.get('/user')
                    || pathname === path
                    // 以一段开头
                    // eg: app.use('/user'(req, res, next) => {next()})
                    //   -> http invoke http.get('/user/quanquan')
                    // 后边加一个斜杠的原因是为了解决
                    //  -> http invoke http.get('/usersuper/balabala') 这样的问题
                    || pathname.startsWith(`${path}/`) ) {

                    handler(req, res, next)
                } else {
                    next()
                }
            } else {
                for (let i = 0, len = routes.length; i < len; i++) {
                    const {handler, path, method: mtd} = routes[i]
                }
                // 路由
                if (path.params) {
                    const matches = pathname.match(path)
                    if (matches) {
                        const [, ...lists] = matches
                        const params = path.params.reduce((memo, curItem, idx) => (memo[curItem] = lists[idx] ,memo), {})
                        req.params = params
                        return handler(req, res)
                    }
                }

                if (
                    // 如果当前的请求路劲和预制的路由的路径相等或者预制了所有路径路由
                    (path === pathname || path === '*')
                    // 查看请求方法
                    && mtd === method
                    || mtd === 'all'
                ) {
                    return handler(req, res)
                }

                // 路由没有匹配到直接 next
                next()
            }
            }
        }

        next()
    }

    ['all', ...methods].forEach(method => {
        app[method] = (path, handler) => {

            if (path.includes(':')) {
                const params = []
                path = path.replace(/:([^ \/]*)/g, (...args) => {
                    const [, aramName] = args
                    params.push(aramName)
                    return '([^ \/]*)'
                })

                path = new RegExp(`^${path}$`)
                path.params = params
            }

            const layer = {
                path, handler, method
            }

            routes.push(layer)
        }
    })

    app.use = (path, handler = path) => {
        // 重载 path 参数
        if (typeof path === 'function') {
            path = '/'
        }

        const layer = {
            method: 'middleware',
            path,
            handler
        }

        routes.push(layer)
    }

    // 内置中间件
    app.use((req, res, next) => {
        const {pathname, query} = url.parse(req.url, true)
        req.pathname = pathname
        req.query = query

        res.send = value => {
            const curType = typeof value

            const sendMap = {
                number() {
                    const status = require('_http_server').STATUS_CODES
                    res.statusCode = value
                    res.end(status[value])
                },
                object() {
                    res.setHeader('Content-Type', 'application/json;charset=utf-8')
                    res.end(JSON.stringify(value))
                },
                string() {
                    res.setHeader('Content-Type', 'text/html;charset=utf-8')
                    res.end(value)
                }
            }

            sendMap[curType] ? sendMap[curType](value) : sendMap['string'](value)
        }

        res.sendFile = p => {
            fs.createReadStream(p).pipe(res)
        }

        next()
    })

    // 实现一个极简版本的 body-parser
    app.use((req, res, next) => {
        const {method} = req

        if (req.method === 'POST') {
            let data = ''

            req.on('data', chunk => { data += chunk })
            req.on('end', () => {
                try {
                    if (typeis(req, ['application/json'])) {
                        req.body = JSON.parse(data)
                    } else {
                        req.body = qs.parse(data)
                    }
                } catch (e) {
                    next(e)
                }
                next()
            })
            req.on('error', e => next(e))
        } else {
            next()
        }
    })

    app.listen = (...args) => {
        createServer(app).listen(...args);
    }

    return app
}

application.static = root => (req, res, next) => {
    const p = req.pathname
    const absPath = path.join(root, p)
    fs.stat(absPath, (err, fileInfo) => {
        if (err) {
            next();
        } else {
            if (fileInfo.isFile()) {
                fs.createReadStream(absPath).pipe(res)
            } else {
                next()
            }
        }
    })
}

module.exports = application

