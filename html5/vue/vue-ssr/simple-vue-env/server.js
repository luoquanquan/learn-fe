const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStatic = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')


const conf = {
    PORT: 3333
}

const serverBundle = require('./dist/vue-ssr-server-bundle')
const clientManifest = require('./dist/vue-ssr-client-manifest')
const template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'), 'utf8')
const renderer = createBundleRenderer(serverBundle, { template, clientManifest })

const app = new Koa()
const router = new KoaRouter()

app.use(router.routes(), router.allowedMethods())
app.use(koaStatic(path.resolve(__dirname, './dist')))

router.get('/', async ctx => {
    try {
        const htmlStr = await renderer.renderToString(ctx)
        ctx.body = htmlStr
    } catch (error) {
        ctx.status = 502
        ctx.body = 'Server Error'
    }
})

router.get('*', async (ctx, next) => {
    if (ctx.url.includes('.js')) {
        return next()
    }
    try {
        const htmlStr = await renderer.renderToString(ctx)
        ctx.body = htmlStr
    } catch (error) {
        ctx.status = 502
        ctx.body = 'Server Error'
    }
})
app.listen(conf.PORT, () => {
    console.log(`the server is listen on ${conf.PORT}`)
})