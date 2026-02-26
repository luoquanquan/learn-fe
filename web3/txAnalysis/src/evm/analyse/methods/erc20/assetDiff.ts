import { decodeEventLog, erc20Abi, isAddressEqual } from "viem";
import { erc20Info } from "../../../utils/hash";
import { isHexZero } from "../../../utils/const";

const assetDiff = (trace) => {
  const send = [];
  const receive = [];
  const gasUsed = trace.gasUsed;
  const from = trace.from;
  const value = trace.value;

  if (!isHexZero(value)) {
    send.push({
      tokenAddress: "",
      value: value,
    });
  }

  const analyseCall = (callTrace) => {
    const { calls = [] } = callTrace;
    for (const call of calls) {
      const { logs = [], value, to, input } = call;
      if (isHexZero(input) && !isHexZero(value) && isAddressEqual(to, from)) {
        receive.push({
          tokenAddress: "",
          value: value,
        });

        continue;
      }
      for (const log of logs) {
        try {
          if (log.topics[0] !== erc20Info.eventSelector.Transfer) continue;
          if (log.topics.length !== 3) continue;

          // 解码事件
          const event = decodeEventLog({
            abi: erc20Abi,
            data: log.data,
            topics: log.topics,
          });
          if ((event as any).eventName !== erc20Info.eventNameMap.Transfer) {
            continue;
          }

          const {
            from: eventFrom,
            to: eventTo,
            value: eventValue,
          } = (event as any).args as any;

          if (isAddressEqual(eventFrom, from)) {
            send.push({
              tokenAddress: log.address,
              value: eventValue.toString(),
            });
          }
          if (isAddressEqual(eventTo, from)) {
            receive.push({
              tokenAddress: log.address,
              value: eventValue.toString(),
            });
          }
        } catch {
          // ignore non-decodable data
        }
      }
      if (call.calls?.length && call.calls.length > 0) {
        analyseCall(call);
      }
    }
  };

  analyseCall(trace);

  if (send.length > 0 || receive.length > 0) {
    return {
      send,
      receive,
      gasUsed,
    };
  }

  return null;
};

export default assetDiff;
