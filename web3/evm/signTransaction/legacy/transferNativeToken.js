const { Chain, Common, Hardfork } = require('@ethereumjs/common')
const { LegacyTransaction } = require('@ethereumjs/tx')
const { myEvmAddress, myEvmAddress2 } = require('../../const')
const {
  getWeb3,
  getTransactionCount,
  estimateGas,
  getGasPrice,
  sendSignedTransaction
} = require('../../utils')
const web3 = getWeb3()

const txParams = {
  from: myEvmAddress,
  to: myEvmAddress2,
  value: web3.utils.numberToHex(10 ** 15)
}

const main = async () => {
  const nonce = await getTransactionCount(myEvmAddress)
  txParams.nonce = web3.utils.numberToHex(nonce)

  const gasLimit = await estimateGas(txParams)
  txParams.gasLimit = web3.utils.numberToHex(gasLimit)

  const gasPrice = await getGasPrice(txParams)
  txParams.gasPrice = web3.utils.numberToHex(gasPrice)

  const common = new Common({
    chain: Chain.Holesky,
    hardfork: Hardfork.Istanbul
  })
  const tx = LegacyTransaction.fromTxData(txParams, { common })

  const privateKey = Buffer.from(
    '1ab42cc412b618bdea3a599e3c9bae199ebf030895b039e9db1e30dafb12b727',
    'hex'
  )

  const signedTx = tx.sign(privateKey)
  const serializedTx = Buffer.from(signedTx.serialize()).toString('hex')
  const txHash = Buffer.from(signedTx.hash()).toString('hex')

  console.log('Current log: serializedTx: ', serializedTx)
  console.log('Current log: txHash: ', txHash)
  await sendSignedTransaction(signedTx.serialize())
}

main()
