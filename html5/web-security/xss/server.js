const Koa = require('koa')
const KoaRouter  =require('koa-router')
const KoaStatic = require('koa-static')
const KoaBody = require('koa-body')
const conf = {
    PORT: 3333
}

const users = ['周杰伦', '刘德华']

const app = new Koa()
const router = new KoaRouter()
app.use(KoaStatic(__dirname))

router.get('/reflect.html', (ctx) => {
    const {userName} = ctx.query
    ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>反射型 XSS</title>
        </head>
        <body>
            <h1>Hi, <span id="user-name">${userName}</span></h1>
        </body>
        </html>
    `
})

router.post('/write', (ctx) => {
    const {userName} = ctx.request.body
    users.push(userName)
    ctx.redirect('/read.html')
})

router.get('/users', (ctx) => {
    ctx.body = users
})

app.use(KoaBody())
app.use(router.routes(), router.allowedMethods())
app.listen(conf.PORT, () => {
    console.log(`the server is listening on ${conf.PORT}`)
})
