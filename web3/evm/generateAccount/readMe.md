# EVM 账户派生

## 生成助记词

```js
const bip39 = require('bip39')
const mnemonic = bip39.generateMnemonic()
console.log('Current log: mnemonic: ', mnemonic)
```

## 基于 @ethereumjs/wallet 生成账户

### 通过账户私钥获取地址

```js
const generateAccount = (privateKey) => {
  const wallet = Wallet.fromPrivateKey(Buffer.from(privateKey.slice(2), 'hex'))

  // checkSum
  const address = eip55.encode(wallet.getAddressString())
  console.log('Current log: address: ', address)
}
```

使用 [@ethereumjs/wallet](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/wallet)生成的钱包地址均为小写字母，需要根据 [eip55](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)转成符合 eip 55 规范的地址格式.

### 通过助记词派生账户

```js
// 导入助记词
const importMnemonic = () => {
  const mnemonic = 'sheriff educate diet concert token join pizza lend mixture tower shiver arrive'
  // 根据助记词获取拓展公 / 私钥
  const wallet = hdkey.EthereumHDKey.fromMnemonic(mnemonic)
  const childHdKey = wallet.derivePath("m/44'/60'/0'")
  const privateExtendedKey = childHdKey.privateExtendedKey()
  const extendedPrivateHdKey = hdkey.EthereumHDKey.fromExtendedKey(privateExtendedKey)
  // 其中，index 为派生位置
  const privateHdKey = extendedPrivateHdKey.derivePath('m/0/{index}')
  const childPrivateWallet = privateHdKey.getWallet()
  const privateKey = childPrivateWallet.getPrivateKeyString()
  generateAccount(privateKey)
}
importMnemonic()
```

## 参考文档

- [@ethereumjs/wallet](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/wallet)
- [eip55](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)
