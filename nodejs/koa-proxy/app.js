const Koa = require('koa')
var proxy = require('koa-proxy');
const cors = require('koa-cors')
const app = new Koa()

// 配置信息
const conf = {
  PORT: 3333,
  proxyDomain: 'https://www.baidu.com/'
}

// 支持跨域
app.use(cors())

app.use(proxy({
    host: conf.proxyDomain
}));

app.listen(conf.PORT, () => {
  console.log(`Server is listening on ${conf.PORT} now, enjoy your self`)
})
