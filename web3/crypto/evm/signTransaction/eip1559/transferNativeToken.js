const sendSignedTransaction = require('../../getChainInfo/sendSignedTransaction')
const { Chain } = require('@ethereumjs/common')
const { TransactionFactory } = require('@ethereumjs/tx')
const { myEvmAddress, myEvmAddress2, etherScanUrl } = require('../../const')
const getNonce = require('../../getChainInfo/getNonce')
const { getWeb3 } = require('../../utils')
const estimateGas = require('../../getChainInfo/estimateGas')
const web3 = getWeb3()

const txParams = {
    from: myEvmAddress,
    to: myEvmAddress2,
    value: web3.utils.numberToHex(10 ** 15),
    chainId: Chain.Holesky,
    maxFeePerGas: web3.utils.numberToHex(2 * 10 ** 9),
    maxPriorityFeePerGas: web3.utils.numberToHex(1.5 * 10 ** 9),
    type: '0x2'
}

const main = async () => {
    const nonce = await getNonce(myEvmAddress)
    txParams.nonce = web3.utils.numberToHex(nonce)

    const gasLimit = await estimateGas(txParams)
    txParams.gasLimit = web3.utils.numberToHex(gasLimit)

    const tx = TransactionFactory.fromTxData(txParams)

    const privateKey = Buffer.from('12ce7ea8d99e6c498483bdc0c1338abc53b0b538cec05b85a08f1bf5be9b77d4', 'hex')

    const signedTx = tx.sign(privateKey)
    const serializedTx = Buffer.from(signedTx.serialize()).toString('hex')
    const txHash = Buffer.from(signedTx.hash()).toString('hex')

    console.log('Current log: serializedTx: ', serializedTx)
    console.log('Current log: txHash: ', txHash)
    await sendSignedTransaction(signedTx.serialize())
    console.log(`Tx published you can see the detail ${etherScanUrl}/tx/0x${txHash}`)
}

main()
