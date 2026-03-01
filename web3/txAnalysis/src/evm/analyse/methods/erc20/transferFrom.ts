import { decodeEventLog, decodeFunctionData, erc20Abi, isAddressEqual } from 'viem'
import { erc20Info } from '../../../utils/hash'

const transferFrom = (trace) => {
  try {
    const { input = '', from, to: tokenAddress, logs = [], gasUsed } = trace
    // 第一步: selector 校验
    const selector = input.slice(0, 10).toLowerCase()
    const selectorMatched = selector === erc20Info.functionSelector.transferFrom
    if (!selectorMatched) return null

    // 第二步: 基于 inputData 解码
    const decodedByInputData = decodeFunctionData({
      abi: erc20Abi,
      data: input
    })
    if (decodedByInputData.functionName !== erc20Info.functionNameMap.transferFrom) return null
    const [decodedByInputDataFrom, decodedByInputDataTo, decodedByInputDataValue] =
      decodedByInputData.args

    // 第三步: 基于 logs 解析
    for (const log of logs) {
      if (log.topics[0] !== erc20Info.eventSelector.Transfer) continue
      if (log.topics.length !== 3) continue

      // 解码事件
      const event = decodeEventLog({
        abi: erc20Abi,
        data: log.data,
        topics: log.topics
      })

      if ((event as any).eventName !== erc20Info.eventNameMap.Transfer) continue
      const { from: eventFrom, to: eventTo, value: eventValue } = (event as any).args as any
      if (
        isAddressEqual(eventFrom, decodedByInputDataFrom) &&
        eventTo === decodedByInputDataTo &&
        eventValue.toString() === decodedByInputDataValue.toString()
      ) {
        return {
          from: eventFrom,
          gasUsed,
          to: eventTo,
          value: eventValue.toString(),
          tokenAddress
        }
      }
    }
  } catch {
    // ignore non-decodable data
  }

  return null
}

export default transferFrom
