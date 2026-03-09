import type { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    /** 注入的 EIP-1193 钱包（如 MetaMask），实际运行时仍需判断是否存在 */
    ethereum?: MetaMaskInpageProvider
  }
}

export {}
