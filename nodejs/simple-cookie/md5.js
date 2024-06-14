const crypto = require('crypto')
// md5 是摘要算法, 并非加密
// 1. 相同的内容摘要的结果相同
// 2. 不同的内容摘要的结果完全不同
// 3. 长度相同
// 4. 摘要的过程不可逆
const str = crypto.createHash('md5').update('12345').digest('base64')
console.log(`当前时间 ${Date.now()}: debug 的数据是 str: `, str)