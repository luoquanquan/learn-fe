const { ethRpcUrl } = require("../const");

module.exports = {
  rpcUrl: ethRpcUrl,
  // 币安冷钱包
  eoa: "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8",
  // 以太坊主网 USDT 地址
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  echoAddressType(address, code) {
    if (code === "0x") {
      console.log(address, "is an eoa");
    } else {
      console.log(address, "is a contract address");
    }
  },
};
