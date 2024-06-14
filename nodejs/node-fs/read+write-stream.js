const fs = require('fs')

const rs = fs.createReadStream('./files/demo-file', {
    highWaterMark: 3
})

const ws = fs.createWriteStream('./files/write-demo-file', {
    highWaterMark: 1
})

// rs.on('data', chunk => {
//     const canDeal = ws.write(chunk)
//     // 尝试写入当前可读流的内容的时候发现撑到了, 暂停继续读取
//     if (!canDeal) rs.pause()
// })

// // 可写流抽干(也就是写完了), 启动可读流继续读取
// ws.on('drain', () => {
//     rs.resume()
// })

// // 可读流读取完毕, 尝试关闭可写流
// rs.on('end', () => {
//     ws.end('文件读写完毕~')
// })

// 使用 pipe 把可读流导入到可写流
rs.pipe(ws)