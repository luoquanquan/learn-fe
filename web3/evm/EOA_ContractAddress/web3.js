const { getWeb3 } = require('../utils')
const { rpcUrl, eoa, USDT, echoAddressType } = require('./const')

const web3 = getWeb3(rpcUrl)

const checkAddressType = (address) => {
    web3.eth.getCode(address).then(resp => {
        echoAddressType(address, resp)
    })
}

checkAddressType(eoa)
checkAddressType(USDT)
