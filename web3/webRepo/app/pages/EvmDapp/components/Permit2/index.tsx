import { Button, Card, Space } from 'antd'
import { useCallback, useState } from 'react'
import { PERMIT2_ADDRESS } from '@uniswap/permit2-sdk'

import findAbi from '../../utils/findAbi'
import { useEvmDappContext } from '../../context'
import AllowanceTransfer from './AllowanceTransfer'
import addresses from '../../../../../evm/contracts/addresses.json'
import QUANTokenAbi from '../../../../../evm/contracts/abis/QUANToken.json'
import SignatureTransfer from './SignatureTransfer'

const QUANToken = addresses.QUANToken as `0x${string}`

const Permit2Card = () => {
  const { publicClient, walletClient, account } = useEvmDappContext()

  const [approveLoading, setApproveLoading] = useState(false)
  const approvePermit2 = useCallback(async () => {
    try {
      setApproveLoading(true)
      await walletClient.writeContract({
        chain: publicClient.chain,
        account: account as `0x${string}`,
        address: QUANToken,
        abi: findAbi(QUANTokenAbi, { name: 'approve', type: 'function' }),
        functionName: 'approve',
        args: [PERMIT2_ADDRESS, 2n ** 256n - 1n]
      })
    } catch (error) {
      console.log(error)
    } finally {
      setApproveLoading(false)
    }
  }, [account])

  return (
    <Card title="Permit2">
      <Space orientation="vertical" style={{ width: '100%' }}>
        <Button block loading={approveLoading} onClick={approvePermit2}>
          Approve QUANToken to Permit2
        </Button>
        <AllowanceTransfer />
        <SignatureTransfer />
      </Space>
    </Card>
  )
}

export default Permit2Card
