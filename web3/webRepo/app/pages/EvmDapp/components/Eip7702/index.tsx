import { Button, Card, Space } from 'antd'
import { useCallback, useState } from 'react'

import { useEvmDappContext } from '../../context'
import addresses from '../../../../../evm/contracts/addresses.json'

const HoneyPot7702 = addresses.HoneyPot7702 as `0x${string}`

const Eip7702Card = () => {
  const { publicClient, walletClient, account } = useEvmDappContext()
  const accountAddress = account as `0x${string}`

  const fireEip7702 = useCallback(
    async (address: `0x${string}`) => {
      const nonce = await publicClient.request({
        method: 'eth_getTransactionCount',
        params: [accountAddress, 'pending']
      })
      await walletClient.sendTransaction({
        chain: publicClient.chain,
        account: accountAddress,
        to: accountAddress,
        data: '0x',
        value: 0n,
        type: 'eip7702',
        authorizationList: [
          {
            address,
            nonce: Number(nonce) + 1,
            chainId: publicClient.chain?.id as number
          }
        ]
      })
    },
    [accountAddress, publicClient, walletClient]
  )

  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const upgradeEip7702 = useCallback(async () => {
    try {
      setUpgradeLoading(true)
      await fireEip7702(HoneyPot7702)
    } catch (error) {
      console.log(error)
    } finally {
      setUpgradeLoading(false)
    }
  }, [accountAddress, walletClient])

  const [cancelLoading, setCancelLoading] = useState(false)
  const cancelEip7702 = useCallback(async () => {
    try {
      setCancelLoading(true)
      await fireEip7702('0x0000000000000000000000000000000000000000')
    } catch (error) {
      console.log(error)
    } finally {
      setCancelLoading(false)
    }
  }, [accountAddress, walletClient])

  return (
    <Card title="Eip 7702">
      <Space orientation="vertical" style={{ width: '100%' }}>
        <Button block type="primary" loading={upgradeLoading} onClick={upgradeEip7702}>
          Upgrade Eip 7702
        </Button>

        <Button block loading={cancelLoading} onClick={cancelEip7702}>
          Cancel Eip 7702
        </Button>
      </Space>
    </Card>
  )
}

export default Eip7702Card
