import { erc20Abi } from 'viem'
import { formatAbiItem, parseAbi, toEventSelector, toFunctionSelector } from 'viem/utils'

export const erc20ExtAbiMap = {
  increaseAllowance: parseAbi([
    'function increaseAllowance(address spender, uint256 addedValue)'
  ])[0],
  decreaseAllowance: parseAbi([
    'function decreaseAllowance(address spender, uint256 subtractedValue)'
  ])[0]
}

const eventSelector = (abiItem) => toEventSelector(formatAbiItem(abiItem))
const functionSelector = (abiItem) => toFunctionSelector(formatAbiItem(abiItem))
export const erc20Info = {
  functionSelector: {
    approve: functionSelector(erc20Abi.find((x) => x.type === 'function' && x.name === 'approve')),
    transfer: functionSelector(
      erc20Abi.find((x) => x.type === 'function' && x.name === 'transfer')
    ),
    transferFrom: functionSelector(
      erc20Abi.find((x) => x.type === 'function' && x.name === 'transferFrom')
    ),
    increaseAllowance: functionSelector(erc20ExtAbiMap.increaseAllowance),
    decreaseAllowance: functionSelector(erc20ExtAbiMap.decreaseAllowance)
  },
  eventSelector: {
    // 授权 Event
    Approval: eventSelector(erc20Abi.find((x) => x.type === 'event' && x.name === 'Approval')!),
    // 授权 Event
    Transfer: eventSelector(erc20Abi.find((x) => x.type === 'event' && x.name === 'Transfer')!)
  },
  functionNameMap: {
    approve: 'approve',
    transfer: 'transfer',
    transferFrom: 'transferFrom',
    increaseAllowance: 'increaseAllowance',
    decreaseAllowance: 'decreaseAllowance'
  },
  eventNameMap: {
    Approval: 'Approval',
    Transfer: 'Transfer'
  }
}
