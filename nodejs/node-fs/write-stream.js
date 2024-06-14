const fs = require('fs')
const path = require('path')

// 可写流 write end
const ws = fs.createWriteStream('./files/write', {
    flags: 'w', // w 文件不存在的时候会穿件该文件, 如果文件有内容会清空内容
    encoding: 'utf8',
    highWaterMark: 5,
    autoClose: true,
    start: 0
})

const flag = ws.write('1', err => {
    if (err) return void console.log('文件写入失败')
    console.log('写入成功')
})

// 如果写入内容的字节数大于 highWaterMark flag = false
// 否则 highWaterMark flag = false
console.log(flag)

// 可读流 + 可写流合作的时候 => 通过 flag 控制可读流的暂停 OR 继续读取
// 实现文件读写的速率控制

// 当前内容写入完成后再继续写入其他的内容, 要放在 on('drain', () => {方法里})

// end 方法传入的参数也会被写到文件中(追加到文件的最后), 写入流关闭后不能再次写入
ws.end('结束')