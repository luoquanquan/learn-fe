import { protocol } from "../../utils/tron-proto";
import { toBase58 } from "../../utils";

const TransferContract = (valueBytes) => {
  // @ts-ignore 由生成代码的类型声明与实际实现不一致，这里忽略参数个数校验
  const decodedValue = protocol.TransferContract.decode(valueBytes);
  const decodedValueObject = protocol.TransferContract.toObject(decodedValue, {
    longs: String,
    enums: String,
  });

  return {
    assetType: "TRX",
    from: toBase58(decodedValueObject.ownerAddress),
    to: toBase58(decodedValueObject.toAddress),
    amount: decodedValueObject.amount,
  };
};

export default TransferContract;
