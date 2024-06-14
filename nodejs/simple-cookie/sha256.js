const crypto = require('crypto')
const salt = 'quan'

const str = crypto.createHmac('sha256', salt).update('123456').digest('base64')
console.log(`当前时间 ${Date.now()}: debug 的数据是 str: `, str)

