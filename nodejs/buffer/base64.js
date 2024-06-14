const buffer = Buffer.from('圈圈')

// 字符串 -> 16 进制 <Buffer e5 9c 88 e5 9c 88>
console.log(buffer)

// 可以直接转回字符串 圈圈
console.log(buffer.toString())
// ps: node 支持 utf8 格式, 可以通过 iconv-lite 把二进制的 gbk 转化为 utf8

// 编码问题 1b = 8 bit
// 二进制 11111111 255 八进制 377 十六进制

console.log(parseInt('11111111', 2))
console.log((255).toString(8))
console.log((255).toString(16))

// base64 凡是可以放链接的地方都可以放 base64
// 非常大的图片转 base64 会更大
// 原理
// 一个汉字是 3 字节 3 * 8 = 4 * 6 = 24
const r = Buffer.from('圈')
console.log(r) // <Buffer e5 9c 88>

console.log((0xe5).toString('2'))
console.log((0x9c).toString('2'))
console.log((0x88).toString('2'))

// 转化成 2 进制以后的效果 8bit * 3 = 24bit
// 11100101
// 10011100
// 10001000

// 8 * 3 => 6 * 4
// 111001011001110010001000
// 111001 011001 110010 001000
let a, b, c, d
console.log(a = parseInt('111001', 2))
console.log(b = parseInt('011001', 2))
console.log(c = parseInt('110010', 2))
console.log(d = parseInt('001000', 2))

// base64 转化规则
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLocaleLowerCase()
str += '0123456789+/'

// 从 base64 的全集中取出前边 4 位并相加  5ZyI
console.log(str[a] + str[b] + str[c] + str[d])

// 最后使用 buffer 原生的 toString 方法转一个 base64 5ZyI
console.log(r.toString('base64'))

// 两者 base64 转码的结果是一样的说明我们模拟的 base64 成功
// 通过以上步骤可以看出, base46 之能编码不能加密.
// 理论上编码后会变大 1/3. 以前是 3b 现在变成了 4b








