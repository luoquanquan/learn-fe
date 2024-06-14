const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStatic = require('koa-static')
const cors = require('@koa/cors')
const path = require('path')

const conf = {
    PORT: 3333
}

const app = new Koa()
const router = new KoaRouter()

router.get('/pwa-vue-demo', ctx => {
    ctx.body = {
        announce: '圈圈的圈'
    }
})

router.get('/api/getImage', ctx => {
    const ret = []
    while (ret.length < 99) {
        const idx = Math.ceil(Math.random() * 9)
        ret.push(`http://img.blog.niubishanshan.top/${idx}.jpeg`)
    }
    ctx.body = ret
})

app.use(cors())
app.use(router.routes(), router.allowedMethods())
app.use(koaStatic(path.resolve(__dirname, 'public')))
app.listen(conf.PORT, () => {
    console.log(`the server is runing at ${conf.PORT}`)
})
