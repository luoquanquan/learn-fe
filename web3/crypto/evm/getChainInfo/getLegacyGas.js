const { testRpcUrl } = require('../const')
const { getWeb3 } = require('../utils')
const web3 = getWeb3(testRpcUrl)

const getLegacyGas = () => web3.eth.getGasPrice()

module.exports = async () => {
    const gasPrice = await getLegacyGas()

    return { gasPrice }
}
