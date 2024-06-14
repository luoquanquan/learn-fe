const http = require('http')

const client = http.request({
    hostname: 'localhost',
    path: '/quanquan/test?name=quanquan',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    port: 3333,
    method: 'post'
}, resp => {
    const dataArr = []
    resp.on('data', chunk => {
        dataArr.push(chunk)
    })

    resp.on('end', () => {
        const dataStr = Buffer.concat(dataArr).toString()
        const { headers } = resp
        if (headers['content-type'] === 'application/json') {
            console.log(JSON.parse(dataStr))
        }
    })
})

client.end('age=18&sex=male')

// 爬虫/中间层