const { Web3 } = require('web3')
const { rpcUrl, eoa, USDT, echoAddressType } = require('./utils')

const web3 = new Web3(rpcUrl)

const checkAddressType = (address) => {
    web3.eth.getCode(address).then(resp => {
        echoAddressType(address, resp)
    })
}

checkAddressType(eoa)
checkAddressType(USDT)
