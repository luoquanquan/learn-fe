import { isHexZero } from '../utils/const'
import debugraceCall from '../utils/debugraceCall'
import erc20Approve from './methods/erc20/approve'
import erc20Transfer from './methods/erc20/transfer'
import erc20TransferFrom from './methods/erc20/transferFrom'
import erc20increaseAllowance from './methods/erc20/increaseAllowance'
import erc20decreaseAllowance from './methods/erc20/decreaseAllowance'
import erc20assetDiff from './methods/erc20/assetDiff'

const extractorMap = {
  erc20Approve,
  erc20Transfer,
  erc20TransferFrom,
  erc20increaseAllowance,
  erc20decreaseAllowance,
  erc20assetDiff
}

const analyse = async (transaction) => {
  // 合约部署
  if (transaction.data && !transaction.to) {
    return {
      method: 'deployContract',
      result: {
        from: transaction.from,
        data: transaction.data
      }
    }
  }

  // 主币转账
  if (isHexZero(transaction.data) && !isHexZero(transaction.value)) {
    return {
      method: 'erc20Transfer',
      result: extractorMap.erc20Transfer(transaction)
    }
  }
  const trace = await debugraceCall(transaction)
  const extractors = Object.entries(extractorMap)

  for (const [method, fn] of extractors) {
    const result = fn(trace)
    if (result) {
      return {
        method,
        result
      }
    }
  }

  return null
}

export default analyse
