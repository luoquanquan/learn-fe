import path from 'path'
import { TronWeb } from 'tronweb'
import protobuf from 'protobufjs'
import crypto from 'crypto'
import bs58 from 'bs58'

export const TRX_TO_SUN = 1e6

export const getTronWeb = () => {
  return new TronWeb({
    fullHost: 'https://api.trongrid.io'
  })
}

export const toSun = (trxAmount: number | string): number => {
  return Math.floor(Number(trxAmount) * TRX_TO_SUN)
}

export const toBase58 = (addressBytes: Buffer): string => {
  if (!addressBytes) return null

  const hash1 = crypto.createHash('sha256').update(addressBytes).digest()

  const hash2 = crypto.createHash('sha256').update(hash1).digest()

  const checksum = hash2.slice(0, 4)

  return bs58.encode(Buffer.concat([Buffer.from(addressBytes), checksum]))
}
