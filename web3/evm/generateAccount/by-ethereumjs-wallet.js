const eip55 = require('eip55')
const { hdkey, Wallet } = require('@ethereumjs/wallet')

const generateAccount = (privateKey) => {
  const wallet = Wallet.fromPrivateKey(Buffer.from(privateKey.slice(2), 'hex'))

  // checkSum
  const address = eip55.encode(wallet.getAddressString())
  console.log('Current log: address: ', address)
}

// 导入助记词
const importMnemonic = () => {
  const mnemonic = 'sheriff educate diet concert token join pizza lend mixture tower shiver arrive'
  // 根据助记词获取拓展公 / 私钥
  const wallet = hdkey.EthereumHDKey.fromMnemonic(mnemonic)
  const childHdKey = wallet.derivePath("m/44'/60'/0'")
  const privateExtendedKey = childHdKey.privateExtendedKey()
  const extendedPrivateHdKey = hdkey.EthereumHDKey.fromExtendedKey(privateExtendedKey)
  const privateHdKey = extendedPrivateHdKey.derivePath('m/0/0')
  const childPrivateWallet = privateHdKey.getWallet()
  const privateKey = childPrivateWallet.getPrivateKeyString()
  generateAccount(privateKey)
}
importMnemonic()

// 导入私钥
const importPrivateKey = () => {
  const privateKey = '0x1ab42cc412b618bdea3a599e3c9bae199ebf030895b039e9db1e30dafb12b727'
  generateAccount(privateKey)
}
importPrivateKey()
