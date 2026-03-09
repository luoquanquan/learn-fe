import { Button } from 'antd'
import { useState } from 'react'
import type { TypedDataDomain } from 'viem'
import { PERMIT2_ADDRESS, SignatureTransfer as SignatureTransferSDK } from '@uniswap/permit2-sdk'

import findAbi from '../../utils/findAbi'
import { useEvmDappContext } from '../../context'
import { MY_TEST_ADDRESS } from '../../utils/const'
import addresses from '../../../../../evm/contracts/addresses.json'
import permit2TransferAbi from '../../../../../evm/contracts/abis/Permit2Transfer.json'
import { omit } from 'lodash'
const QUANToken = addresses.QUANToken as `0x${string}`
const Permit2Transfer = addresses.Permit2Transfer as `0x${string}`

const SignatureTransfer = () => {
  const { publicClient, walletClient, account } = useEvmDappContext()
  const accountAddress = account as `0x${string}`
  const [signatureTransferLoading, setSignatureTransferLoading] = useState(false)

  const signatureTransfer = async () => {
    try {
      const chainId = await publicClient.getChainId()
      setSignatureTransferLoading(true)

      // 1. 随机 nonce（SignatureTransfer 无需链上查 nonce）
      const nonce = crypto.getRandomValues(new Uint32Array(1))[0]
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 600)

      // 2. 构造 permit（含 spender 供 SDK 签名）
      const permit = {
        permitted: { token: QUANToken, amount: 10n ** 6n },
        spender: Permit2Transfer,
        nonce: BigInt(nonce),
        deadline
      }

      // 3. 获取 EIP-712 domain / types / values
      const { domain, types, values } = SignatureTransferSDK.getPermitData(
        permit,
        PERMIT2_ADDRESS,
        chainId
      )

      // 4. 签名
      const signature = await walletClient.signTypedData({
        account: accountAddress,
        types,
        domain: domain as TypedDataDomain,
        primaryType: 'PermitTransferFrom',
        message: values as unknown as Record<string, unknown>
      })

      await walletClient.writeContract({
        chain: publicClient.chain,
        account: accountAddress,
        address: Permit2Transfer,
        abi: findAbi(permit2TransferAbi, { name: 'signatureTransfer', type: 'function' }) as any,
        functionName: 'signatureTransfer',
        args: [
          // 排除 spender, 为了防止签名被重放. Permit2 合约会读取 msg.sender 作为 spender
          omit(values, ['spender']),
          { to: MY_TEST_ADDRESS, requestedAmount: permit.permitted.amount },
          signature
        ]
      })
    } catch (error) {
      console.error(error)
    } finally {
      setSignatureTransferLoading(false)
    }
  }

  return (
    <div>
      <Button type="primary" block loading={signatureTransferLoading} onClick={signatureTransfer}>
        SignatureTransfer
      </Button>
    </div>
  )
}

export default SignatureTransfer
