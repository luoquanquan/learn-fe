const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')

const {getReqData, db} = require('./utils')

const conf = {
    PORT: 3333,
    storePath: path.resolve(__dirname, 'store'),
    tempPath: path.resolve(__dirname, 'temp'),
    chunkTemp: path.resolve(__dirname, 'chunk-temp')
}

// 保证必要目录存在
if (!fs.existsSync(conf.storePath)) {
    fs.mkdirSync(conf.storePath)
}

if (!fs.existsSync(conf.tempPath)) {
    fs.mkdirSync(conf.tempPath)
}

if (!fs.existsSync(conf.chunkTemp)) {
    fs.mkdirSync(conf.chunkTemp)
}

const app = new Koa()
const router = new KoaRouter()

router.prefix('/upload')

router.get('/fileCheck/:md5', async ctx => {
    const [{md5}] = getReqData(ctx)
    const file = db.getFile(md5)
    const ret = {errno: 0}
    if (file) {
        ret.data = file
    } else {
        ret.errno = 1
    }

    ctx.body = ret
})

router.get('/chunkCheck/:fileMd5/:chunkId', async ctx => {
    const [{fileMd5, chunkId}] = getReqData(ctx)
    const ret = {errno: 1, msg: 'not have'}
    if (fs.existsSync(`${conf.chunkTemp}/${fileMd5}/${chunkId}`)) {
        ret.errno = 0
        ret.msg = 'already'
    }

    ctx.body = ret
})

router.post('/:fileMd5/:chunkId', async ctx => {
    const [{fileMd5, chunkId},,, files] = getReqData(ctx)
    if (!fs.existsSync(`${conf.chunkTemp}/${fileMd5}`)) {
        fs.mkdirSync(`${conf.chunkTemp}/${fileMd5}`)
    }
    const {file: {path}} = files
    const newChunkPath = `${conf.chunkTemp}/${fileMd5}/${chunkId}`
    await fs.rename(path, newChunkPath)
    ctx.body = { errno: 0 }
})

router.post('/fileMerge/:md5/:chunks/:fileName/:size', async ctx => {
    let [{md5, chunks, fileName, size}] = getReqData(ctx)

    size = +size
    chunks = +chunks

    for (i = 0; i < chunks; i++) {
        fs.appendFileSync(`${conf.storePath}/${fileName}`, fs.readFileSync(`${conf.chunkTemp}/${md5}/${i}`));
        fs.unlinkSync(`${conf.chunkTemp}/${md5}/${i}`);
    }

    fs.rmdirSync(`${conf.chunkTemp}/${md5}`)
    db.setFile({md5, fileName, size})
    ctx.body = {errno: 0, data: {md5, fileName, size}}
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
