import { Alert, Card, Row, Col } from 'antd'
import { memo, useEffect, useState } from 'react'
import WalletCard from './components/WalletCard'
import Permit2Card from './components/Permit2'
import EvmDappContext from './context'
import { createPublicClient, createWalletClient, custom } from 'viem'
import { polygon } from 'viem/chains'
import Eip7702Card from './components/Eip7702'

const EvmDapp = () => {
  const publicClient = createPublicClient({
    chain: polygon,
    transport: custom(window.ethereum!)
  })
  const walletClient = createWalletClient({
    chain: polygon,
    transport: custom(window.ethereum!)
  })
  const [account, setAccount] = useState('')
  useEffect(() => {
    ;(window.ethereum!.request({ method: 'eth_requestAccounts' }) as Promise<string[]>)
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      })
      .catch(console.error)
  }, [])

  return (
    <EvmDappContext.Provider value={{ publicClient, walletClient, account, setAccount }}>
      <main className="min-h-screen bg-slate-50 px-6 py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Card title="EvmDapp" className="shadow-md" variant="borderless">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <WalletCard />
              </Col>
              <Col xs={24} md={12}>
                <Permit2Card />
              </Col>
              <Col xs={24} md={12}>
                <Eip7702Card />
              </Col>
            </Row>
          </Card>
        </div>
      </main>
    </EvmDappContext.Provider>
  )
}

const EvmDappWrapper = () => {
  if (!window.ethereum) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <Alert
          title="Please install MetaMask or a compatible EIP-1193 wallet"
          description="Please install MetaMask or a compatible EIP-1193 wallet before using this page."
          type="warning"
          showIcon
          className="max-w-md"
        />
      </main>
    )
  }

  return <EvmDapp />
}

export default memo(EvmDappWrapper)
