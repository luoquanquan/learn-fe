const { testRpcUrl } = require('../const')
const { getWeb3 } = require('../utils')
const web3 = getWeb3(testRpcUrl)

const estimateGas = (txParams) => web3.eth.estimateGas(txParams)

module.exports = estimateGas
