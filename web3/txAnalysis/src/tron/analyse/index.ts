import { protocol, google } from "../utils/tron-proto";
import TransferContract from "./methods/TransferContract";

const extractorMap = {
  TransferContract: TransferContract,
};

const analyse = async (transaction) => {
  const { raw_data_hex: rawDataHex } = transaction;
  // const root = await loadTronProto()

  const buffer = Buffer.from(rawDataHex, "hex");
  // @ts-ignore 由生成代码的类型声明与实际实现不一致，这里忽略参数个数校验
  const message = protocol.Transaction.raw.decode(buffer);
  // @ts-ignore
  const rawData = protocol.Transaction.raw.toObject(message, {
    longs: String, // int64 转字符串（强烈推荐）
    enums: String, // 枚举转字符串
  });

  const contract = rawData.contract[0];
  const { type, parameter } = contract;
  // const decoded
  console.log(`Current log: type: `, type);
  const extractors = Object.entries(extractorMap);
  for (const [method, fn] of extractors) {
    const result = fn(parameter.value);
    if (result) {
      return {
        method,
        result,
      };
    }
  }

  return null;

  // console.log(JSON.stringify(txData, null, 2))

  // const decoded = TronWebUtils.code.hexStr2byteArray(raw_data_hex)
  // const rawData = protocol.Transaction.raw.decode(decoded)
  // console.log(rawData)
  // const { contract = [], operation_list = [] } = transaction
  // const { type, parameter } = contract[0]
  // const { value } = operation_list[0]
  // if (type === 'TriggerSmartContract') {
  //   return {
  //     method: 'triggerSmartContract',
  //     result: {
  //       from: transaction.from,
  //       to: transaction.to,
  //       data: parameter,
  //       value: value
  //     }
  //   }
  // }
  return null;
};

export default analyse;
