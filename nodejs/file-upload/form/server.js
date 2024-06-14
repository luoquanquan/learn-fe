const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')

const conf = {
    PORT: 3333,
    storePath: path.resolve(__dirname, 'store'),
    tempPath: path.resolve(__dirname, 'temp')
}

const app = new Koa()
const router = new KoaRouter()

router.post('/upload',async ctx => {
    const {request: {body, files}} = ctx
    const {file: {path, name}} = files
    const filePath = `${conf.storePath}/${name}`
    await fs.rename(path, filePath)
    ctx.body = '文件上传成功~'
})

app.use(koaStatic(__dirname))

// 启动 koaBody
// multipart: true 用于解析 enctype="multipart/form-data"
// formidable: 给内部插件 formidable 的配置
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: conf.tempPath
    }
}))

// 使用路由
app.use(router.routes(), router.allowedMethods())

// 监听端口号, 启动服务器
app.listen(conf.PORT, () => {
    console.log(`the server is running on ${conf.PORT}`)
})

