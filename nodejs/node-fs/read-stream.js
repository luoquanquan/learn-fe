// 可读流 可写流 双工流 转化流(压缩)
// 流的特点: 可以分段读取, 可以控制速率

const fs = require('fs')
const path = require('path')

// 返回的是可读流的实例
const rs = fs.createReadStream('./files/1', {
    flags: 'r',
    highWaterMark: 3,
    encoding: null,
    autoClose: true,
    // 包前包后(单位 字节)
    start: 0,
    end: 14
})

const chunks = []
// 流 默认是暂停模式 - 非流动模式, 内部会监听 data 事件
rs.on('data', chunk => {
    chunks.push(chunk)
    console.log(chunk)
    rs.pause() // 暂停读取

    setTimeout(() => {
        rs.resume()
    }, 1e3);
})

// 文件读取完成时触发 end 事件
rs.on('end', () => {
    console.log(Buffer.concat(chunks).toString())
})