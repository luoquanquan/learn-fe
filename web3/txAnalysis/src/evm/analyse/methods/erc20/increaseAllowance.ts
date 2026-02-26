import {
  decodeEventLog,
  decodeFunctionData,
  erc20Abi,
  isAddressEqual,
} from "viem";
import { erc20ExtAbiMap, erc20Info } from "../../../utils/hash";

const increaseAllowance = (trace) => {
  try {
    const { input = "", from, to: tokenAddress, logs = [], gasUsed } = trace;
    // 第一步: selector 校验
    const selector = input.slice(0, 10).toLowerCase();

    const selectorMatched =
      selector === erc20Info.functionSelector.increaseAllowance;

    if (!selectorMatched) return null;

    // 第二步: 基于 inputData 解码
    const decodedByInputData = decodeFunctionData({
      abi: [erc20ExtAbiMap.increaseAllowance],
      data: input,
    });
    if (
      decodedByInputData.functionName !==
      erc20Info.functionNameMap.increaseAllowance
    ) {
      return null;
    }
    const [decodedByInputDataSpender, decodedByInputDataValue] =
      decodedByInputData.args;

    // 第三步: 基于 logs 解析
    for (const log of logs) {
      if (log.topics[0] !== erc20Info.eventSelector.Approval) continue;
      if (log.topics.length !== 3) continue;

      // 解码事件
      const event = decodeEventLog({
        abi: erc20Abi,
        data: log.data,
        topics: log.topics,
      });
      if ((event as any).eventName !== erc20Info.eventNameMap.Approval)
        continue;
      const { owner } = (event as any).args as any;
      if (isAddressEqual(owner, from)) {
        return {
          from,
          gasUsed,
          tokenAddress,
          value: decodedByInputDataValue.toString(),
          spender: decodedByInputDataSpender,
        };
      }
    }
  } catch {
    // ignore non-decodable data
  }

  return null;
};

export default increaseAllowance;
