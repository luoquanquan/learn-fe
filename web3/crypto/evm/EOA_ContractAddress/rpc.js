const axios = require("axios");
const { echoAddressType, rpcUrl, eoa, USDT } = require("./const");

const checkAddressType = (address) => {
  axios
    .post(rpcUrl, {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getCode",
      params: [address, "latest"],
    })
    .then((resp) => {
      const {
        data: { result },
      } = resp;
      echoAddressType(address, result);
    });
};

checkAddressType(eoa);
checkAddressType(USDT);
