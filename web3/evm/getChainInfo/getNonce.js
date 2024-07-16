
const { testRpcUrl } = require('../const')
const { getWeb3 } = require('../utils')

const web3 = getWeb3(testRpcUrl)

module.exports = myEvmAddress => web3.eth.getTransactionCount(myEvmAddress, undefined)
