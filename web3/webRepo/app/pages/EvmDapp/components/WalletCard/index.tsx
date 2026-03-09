import { Button, Card, Space } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { useEvmDappContext } from '../../context'

const WalletCard = () => {
  const { publicClient, setAccount, account } = useEvmDappContext()
  const [balance, setBalance] = useState<string>('-')
  const handleConnect = useCallback(async () => {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (!accounts || accounts.length === 0) return
      const nextAccount = accounts[0] as `0x${string}`
      setAccount(nextAccount)
    } catch (err) {
      console.error(err)
    }
  }, [setAccount])

  useEffect(() => {
    if (!account) return

    publicClient.getBalance({ address: account as `0x${string}` }).then((rawBalance) => {
      setBalance(formatEther(rawBalance))
    })
  }, [account])

  return (
    <Card title="连接钱包">
      <Space orientation="vertical" className="w-full">
        <Button type="primary" block onClick={handleConnect}>
          Connect Wallet
        </Button>
        <Card size="small" title="当前账号">
          <p className="mt-1 break-all text-sm">{account || '尚未连接钱包, 请点击上方按钮连接'}</p>
          <p className="text-xs text-slate-500">当前钱包余额（ETH）</p>
          <p className="mt-1 text-lg font-semibold">{balance === '-' ? '—' : balance}</p>
        </Card>
      </Space>
    </Card>
  )
}

export default WalletCard
