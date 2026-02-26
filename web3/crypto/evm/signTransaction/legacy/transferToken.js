const { Chain, Common, Hardfork } = require("@ethereumjs/common");
const { LegacyTransaction } = require("@ethereumjs/tx");
const {
  myEvmAddress,
  tokenContractAddress,
  etherScanUrl,
} = require("../../const");
const {
  getWeb3,
  getTransactionCount,
  estimateGas,
  getGasPrice,
  sendSignedTransaction,
} = require("../../utils");
const encodeData = require("../encodeData");
const web3 = getWeb3();

const txParams = {
  from: myEvmAddress,
  to: tokenContractAddress,
  data: encodeData(),
};

const main = async () => {
  const nonce = await getTransactionCount(myEvmAddress);
  txParams.nonce = web3.utils.numberToHex(nonce);

  const gasLimit = await estimateGas(txParams);
  txParams.gasLimit = web3.utils.numberToHex(gasLimit);

  const gasPrice = await getGasPrice(txParams);
  txParams.gasPrice = web3.utils.numberToHex(gasPrice);

  const common = new Common({
    chain: Chain.Holesky,
    hardfork: Hardfork.Istanbul,
  });
  const tx = LegacyTransaction.fromTxData(txParams, { common });

  const privateKey = Buffer.from(
    "12ce7ea8d99e6c498483bdc0c1338abc53b0b538cec05b85a08f1bf5be9b77d4",
    "hex",
  );

  const signedTx = tx.sign(privateKey);
  const serializedTx = Buffer.from(signedTx.serialize()).toString("hex");
  const txHash = Buffer.from(signedTx.hash()).toString("hex");

  console.log("Current log: serializedTx: ", serializedTx);
  console.log("Current log: txHash: ", txHash);
  await sendSignedTransaction(signedTx.serialize());
  console.log(
    `Tx published you can see the detail ${etherScanUrl}/tx/0x${txHash}`,
  );
};

main();
