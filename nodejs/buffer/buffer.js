// buffer 的声明方式
// 根据已知的字符串创建一个 buffer
let buffer = Buffer.from('圈圈')
console.log(buffer)

// 申请一块存放 buffer 的空间, 返回一个 3 位的 buffer
// 且每位都是 00
buffer = Buffer.alloc(3)
console.log(buffer)

// 根据已知的数组创建一个 buffer
buffer = Buffer.from([255, 255, 255])
console.log(buffer)

buffer = Buffer.from('圈圈')

// buffer 常用的方法 数组的方法
buffer.forEach(i => {
    console.log(i)
})

console.log(buffer.slice(0, 3).toString())

// buffer.length 不是原始数组的长度, 而是字节的个数
console.log(buffer.length)

// buffer 一旦声明就不能再增加长度
let b1 = Buffer.from('罗')
let b2 = Buffer.from('圈')
console.log(b1 + b2) // 直接把字符串相加打印出来了 罗圈

let big = Buffer.alloc(6)
// copy 方法
// SourceBuffer.copy(target, targetStrat, SourceBufferStart, SourceBufferEnd)
b1.copy(big, 0, 0, 3)
b2.copy(big, 3, 0, 3)
console.log(big.toString())

// concat 方法
big = Buffer.concat([b1, b2])
console.log(big.toString())

// 自己实现 concat 方法
const concat = (target, ...sources) => {
    sources.forEach((curBuffer, i) => {
        curBuffer.forEach((curBit, j) => {
            target[i * curBuffer.length + j] = curBit
        })
    })
}

// 使用自己实现的 concat 方法实现了 buffer 的拼接
big = Buffer.alloc(6)
concat(big, b1, b2)
console.log(big.toString())

