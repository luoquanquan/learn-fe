const fs = require('fs')
const pump = require('pump')

const readStream = fs.createReadStream('./index.js')
const writeStream = fs.createWriteStream('./dest')

setTimeout(() => {
    writeStream.destroy()

    pump(readStream, writeStream, err => {
        if (err) {
            console.log('发生错误, 写入失败 ~')
            return
        }

        console.log('写入完成')
    })
}, 1e3)
