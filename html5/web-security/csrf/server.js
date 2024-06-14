const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const KoaBody = require('koa-body')
const conf = {
    PORT: 3333
}

const users = [{
    key: 'quanquan',
    money: 100
}, {
    key: 'hacker',
    money: 80
}, {
    key: 'friend',
    money: 60
}]

const app = new Koa()
const router = new KoaRouter()

// 登录校验
app.use((ctx, next) => {
    const key = ctx.cookies.get('key')
    console.log(`当前时间 ${Date.now()}: debug 的数据是 ctx.origin: `, ctx.origin)
    if (
        ctx.url !== '/login.html'
        && ctx.url !== '/login'
        && ctx.origin !== 'http://hacker.com:3333'
        && !key

    ) {
        return ctx.redirect('/login.html')
    }

    return next()
})

router.get('/', ctx => {
    const key = ctx.cookies.get('key')
    ctx.set('Content-Type', 'text/html; charset=utf-8')
    ctx.body = `
        <h1>Hi ${key}</h1>
        <p>你还有 ${users.find(user => user.key === key).money} 元</p>

        <form action="/transfer" method="post">
            <input type="text" name="key" placeholder="转账给">
            <input type="text" name="money" placeholder="钱数">
            <input type="submit" value="转账">
        </form>

        ${key === 'quanquan' ? '<a href="http://hacker.com:3333/hacker.html">去看小姐姐</a>' : ''}
    `
})

router.post('/login', ctx => {
    const { key } = ctx.request.body
    if (users.find(user => user.key === key)) {
        ctx.cookies.set('key', key)
        ctx.redirect('/')
    } else {
        ctx.redirect('/login.html')
    }
})

router.post('/transfer', ctx => {
    const { key, money } = ctx.request.body
    const myKey = ctx.cookies.get('key')
    const me = users.find(user => user.key === myKey)
    const to = users.find(user => user.key === key)

    if (!me) {
        ctx.redirect('/login.html')
    }
    me.money -= +money
    to.money += +money

    ctx.redirect('/')
})



app.use(KoaStatic(__dirname))
app.use(KoaBody())
app.use(router.routes(), router.allowedMethods())
app.listen(conf.PORT, () => {
    console.log(`the server is listening on ${conf.PORT}`)
})
