const { erc20Abi } = require("abitype/abis");
const { tokenContractAddress, myEvmAddress2 } = require("../const");
const { getWeb3 } = require("../utils");

const web3 = getWeb3();

const encodeData = (amount = `${10 ** 2}`) => {
  // 通过 ABI 和合约地址参数化合约对象
  const contract = new web3.eth.Contract(erc20Abi, tokenContractAddress);

  // 通过合约对象进行合约调用
  return contract.methods.transfer(myEvmAddress2, amount).encodeABI();
};

module.exports = encodeData;
