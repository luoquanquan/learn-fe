import { toByteArray, fromByteArray } from 'base64-js'

export type EncryptedPayload = {
  version: number
  kdf: 'PBKDF2'
  iterations: number
  hash: 'SHA-256'
  salt: string
  iv: string
  ciphertext: string
}

const VERSION = 1
const KDF = 'PBKDF2'
const ITERATIONS = 600_000
const HASH = 'SHA-256'

// 根据用户密码和设备信息派生密钥
const deriveAesKey = async (
  password: string,
  saltBytes: Uint8Array,
  iterations: number,
  hash: string
) => {
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(saltBytes),
      iterations,
      hash
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// 加密文本
export const encryptWithPassword = async (
  plainText: string,
  password: string
): Promise<EncryptedPayload> => {
  // 随机生成盐和初始化向量
  const saltBytes = crypto.getRandomValues(new Uint8Array(32))
  const ivBytes = crypto.getRandomValues(new Uint8Array(12))

  // 派生密钥
  const key = await deriveAesKey(password, saltBytes, ITERATIONS, HASH)

  // 加密文本
  // 生成附加数据
  const additionalData = new TextEncoder().encode(`${VERSION}|${KDF}|${ITERATIONS}|${HASH}`)
  const encryptedBytes = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: ivBytes,
      additionalData
    },
    key,
    new TextEncoder().encode(plainText)
  )

  return {
    version: VERSION,
    kdf: KDF,
    iterations: ITERATIONS,
    hash: HASH,
    salt: fromByteArray(saltBytes),
    iv: fromByteArray(ivBytes),
    ciphertext: fromByteArray(new Uint8Array(encryptedBytes))
  }
}

// 解密文本
export const decryptWithPassword = async (payload: EncryptedPayload, password: string) => {
  const saltBytes = toByteArray(payload.salt)
  const ivBytes = toByteArray(payload.iv)
  const ciphertextBytes = toByteArray(payload.ciphertext)
  const key = await deriveAesKey(password, saltBytes, payload.iterations, payload.hash)

  const additionalData = new TextEncoder().encode(
    `${payload.version}|${payload.kdf}|${payload.iterations}|${payload.hash}`
  )
  const decryptedBytes = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(ivBytes), additionalData },
    key,
    new Uint8Array(ciphertextBytes)
  )

  return new TextDecoder().decode(decryptedBytes)
}
