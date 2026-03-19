const { createHash } = require('crypto')
const { ECPairFactory } = require('ecpair')
const tinysecp = require('tiny-secp256k1')
const ECPair = ECPairFactory(tinysecp)

// 私钥 - 需要自己藏起来
// 可以通过 @ethereumjs/wallet.Wallet.generate 创建
const privateKey = '1ab42cc412b618bdea3a599e3c9bae199ebf030895b039e9db1e30dafb12b727' // 请替换为你自己的私钥
const privateBuffer = Buffer.from(privateKey, 'hex')

// 公钥 - 可以发送给验签的人
const publicKey = ECPair.fromPrivateKey(privateBuffer).publicKey
console.log('Current log: publicKey: ', publicKey.toString('hex'))

// 明文 - 取哈希
const plainText = 'hello world'
const hash = createHash('sha256').update(plainText).digest()

// 发布者通过自己的私钥对明文进行签名并发布
const sigBuffer = ECPair.fromPrivateKey(privateBuffer).sign(hash)
const signature = sigBuffer.toString('hex')

// 签名结果
console.log('Current log: signature: ', signature)

// 验证者使用发布者的公钥和铭文的 hash 进行验签. 确保消息未被篡改
const ret = ECPair.fromPublicKey(publicKey).verify(hash, sigBuffer)
console.log('Current log: ret: ', ret)
