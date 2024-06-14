const http = require('http')
const querystring = require('querystring')


const conf = {
    PORT: 3333
}
const session = {}

const spend = cardId => session[cardId] -= 10
const gennerateId = () => Math.random().toString(16).slice(2)

const handleServer = (request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    const { headers: { cookie }, url } = request
    if (url === '/tony') {
        const { cardId } = querystring.parse(cookie, '; ')
        // 由于 session[cardId]
        if (cardId && session[cardId]) {
            spend(cardId)
            response.end(`您的卡上还有 ${session[cardId]} 元~`)
        } else {
            // 第一次来理发店-tony 办卡
            const cardId = gennerateId()
            session[cardId] = 100
            spend(cardId)
            response.setHeader('Set-Cookie', `cardId=${cardId}`)
            response.end(`您的卡上还有 ${session[cardId]} 元~`)
        }
    } else {
        response.end('为什么不去找 tony ~')
    }
}

const app = http.createServer(handleServer)
app.listen(conf.PORT, () => {
    console.log(`the server is running at ${conf.PORT}`)
})