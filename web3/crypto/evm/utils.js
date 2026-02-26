const { Web3 } = require("web3");
const { FMT_NUMBER, FMT_BYTES } = require("web3-types");
const { testRpcUrl } = require("./const");

const getWeb3 = (rpcUrl = testRpcUrl) => {
  const web3 = new Web3(rpcUrl);
  web3.defaultReturnFormat = {
    number: FMT_NUMBER.STR,
    bytes: FMT_BYTES.HEX,
  };
  return web3;
};
exports.getWeb3 = getWeb3;

const web3 = getWeb3();

// 进制转化
const unitConversionFromWei = (unit) => (originValue) => {
  return web3.utils.fromWei(originValue, unit);
};
const weiToGwei = unitConversionFromWei("gwei");
exports.weiToGwei = weiToGwei;
const weiToEth = unitConversionFromWei("ether");
exports.weiToEth = weiToEth;

const unitConversionToWei = (unit) => (originValue) => {
  return web3.utils.toWei(originValue, unit);
};
const gweiToWei = unitConversionToWei("gwei");
exports.gweiToWei = gweiToWei;
const ethToWei = unitConversionToWei("ether");
exports.ethToWei = ethToWei;

// 获取链上信息
exports.estimateGas = (txParams) => web3.eth.estimateGas(txParams);
exports.getChainId = () => web3.eth.getChainId();
exports.getGasPrice = () => web3.eth.getGasPrice();
exports.getTransactionCount = (from) => web3.eth.getTransactionCount(from);
exports.sendSignedTransaction = (signedTx) =>
  web3.eth.sendSignedTransaction(signedTx);
