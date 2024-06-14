const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')

const conf = {
    PORT: 3333
}

const template = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')
const renderer = createRenderer({ template })

const app = new Koa()
const router = new KoaRouter()

router.get('/', ctx => {
    const vm = new Vue({
        template: '<div>hello world~</div>'
    })

    renderer.renderToString(vm, (err, htmlStr) => {
        if (err) {
            ctx.status = 502
            ctx.body = 'Server Error'
            return;
        }
        ctx.body = htmlStr
    })
})

app.use(router.routes(), router.allowedMethods())
app.listen(conf.PORT, () => {
    console.log(`the server is listen on ${conf.PORT}`)
})