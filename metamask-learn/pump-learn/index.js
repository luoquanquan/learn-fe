const fs = require('fs')

const readStream = fs.createReadStream('./index.js')
const writeStream = fs.createWriteStream('./dest')

setTimeout(() => {
    readStream.pipe(writeStream)
}, 1e3)
