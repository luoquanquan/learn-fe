import { Button } from 'antd'
import { useState } from 'react'
import type { TypedDataDomain } from 'viem'
import { PERMIT2_ADDRESS } from '@uniswap/permit2-sdk'
import { AllowanceTransfer as AllowanceTransferSDK } from '@uniswap/permit2-sdk'

import findAbi from '../../utils/findAbi'
import { useEvmDappContext } from '../../context'
import { MY_TEST_ADDRESS } from '../../utils/const'
import addresses from '../../../../../evm/contracts/addresses.json'
import permit2Abi from '../../../../../evm/contracts/abis/permit2Abi.json'
import permit2TransferAbi from '../../../../../evm/contracts/abis/Permit2Transfer.json'

const QUANToken = addresses.QUANToken as `0x${string}`
const Permit2Transfer = addresses.Permit2Transfer as `0x${string}`

const AllowanceTransfer = () => {
  const { publicClient, walletClient, account } = useEvmDappContext()
  const accountAddress = account as `0x${string}`
  const [allowanceTransferLoading, setAllowanceTransferLoading] = useState(false)
  const allowanceTransfer = async () => {
    try {
      const chainId = await publicClient.getChainId()
      setAllowanceTransferLoading(true)
      // 1. get nonce from permit2 contract
      const [, , nonce] = (await publicClient.readContract({
        address: PERMIT2_ADDRESS,
        abi: findAbi(permit2Abi, { name: 'allowance', type: 'function' }),
        functionName: 'allowance',
        args: [accountAddress, QUANToken, Permit2Transfer]
      })) as [bigint, bigint, number]

      // 2. create permit single
      const permitSingle = {
        details: {
          token: QUANToken,
          amount: 10n ** 6n,
          expiration: BigInt(Math.floor(Date.now() / 1000) + 360000),
          nonce: BigInt(nonce)
        },
        spender: Permit2Transfer,
        sigDeadline: BigInt(Math.floor(Date.now() / 1000) + 600)
      }

      // 3. get domain, types, values from permit single
      const { domain, types, values } = AllowanceTransferSDK.getPermitData(
        permitSingle,
        PERMIT2_ADDRESS,
        chainId
      )

      // 4. sign typed data
      const signature = await walletClient.signTypedData({
        account: accountAddress,
        types,
        domain: domain as TypedDataDomain,
        primaryType: 'PermitSingle',
        message: values as any
      })

      // 5. write contract
      await walletClient.writeContract({
        chain: publicClient.chain,
        account: accountAddress,
        address: Permit2Transfer,
        abi: findAbi(permit2TransferAbi, { name: 'allowanceTransfer', type: 'function' }) as any,
        functionName: 'allowanceTransfer',
        args: [permitSingle, signature, MY_TEST_ADDRESS]
      })
    } catch (error) {
      console.error(error)
    } finally {
      setAllowanceTransferLoading(false)
    }
  }
  return (
    <Button type="primary" block loading={allowanceTransferLoading} onClick={allowanceTransfer}>
      AllowanceTransfer
    </Button>
  )
}

export default AllowanceTransfer
