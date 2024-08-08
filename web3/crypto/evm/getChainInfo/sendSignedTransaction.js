
const { testRpcUrl } = require('../const')
const { getWeb3 } = require('../utils')

const web3 = getWeb3(testRpcUrl)

module.exports = tx => web3.eth.sendSignedTransaction(tx)
