import { createContext, useContext } from 'react'
import { type PublicClient, type WalletClient } from 'viem'

interface EvmDappContextType {
  publicClient: PublicClient
  walletClient: WalletClient
  account: `0x${string}` | string
  setAccount: (account: `0x${string}`) => void
}

const EvmDappContext = createContext<EvmDappContextType>({} as EvmDappContextType)

export default EvmDappContext

export const useEvmDappContext = () => {
  const context = useContext(EvmDappContext)
  if (!context) {
    throw new Error('useEvmDappContext must be used within a EvmDappContext')
  }
  return context
}
