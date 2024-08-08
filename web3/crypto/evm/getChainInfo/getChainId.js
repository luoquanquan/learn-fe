
const { testRpcUrl } = require('../const')
const { getWeb3 } = require('../utils')

const web3 = getWeb3(testRpcUrl)

module.exports = () => web3.eth.getChainId()
