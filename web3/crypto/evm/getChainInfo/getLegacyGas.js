const { testRpcUrl } = require('../const')
const { getWeb3 } = require('../utils')
const web3 = getWeb3(testRpcUrl)

const estimateGas = ({ to, data }) => web3.eth.estimateGas({ to, data })
const getLegacyGas = () => web3.eth.getGasPrice()

module.exports = async ({ to = '', data = '' }) => {
    const gasLimit = await estimateGas({ to, data })
    const gasPrice = await getLegacyGas()

    return { gasLimit, gasPrice }
}
