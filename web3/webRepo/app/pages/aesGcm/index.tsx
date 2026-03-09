import { Alert, Button, Card, Input, Space } from 'antd'
import { useState } from 'react'
import { decryptWithPassword, encryptWithPassword, type EncryptedPayload } from './utils'

const AesGcm = () => {
  const [plainText, setPlainText] = useState('hello world')
  const [password, setPassword] = useState('111111')
  const [encryptedText, setEncryptedText] = useState('')
  const [decryptedText, setDecryptedText] = useState('')
  const [payload, setPayload] = useState<EncryptedPayload | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleEncrypt = async () => {
    try {
      setErrorMessage('')
      const nextPayload = await encryptWithPassword(plainText, password)
      setPayload(nextPayload)
      setEncryptedText(nextPayload.ciphertext)
      setDecryptedText('')
    } catch (error) {
      console.error(error)
      setErrorMessage('加密失败，请稍后重试。')
    }
  }

  const handleDecrypt = async () => {
    if (!payload) {
      setErrorMessage('请先执行一次加密，再进行解密。')
      return
    }

    try {
      setErrorMessage('')
      const nextDecryptedText = await decryptWithPassword(payload, password)
      setDecryptedText(nextDecryptedText)
    } catch (error) {
      console.error(error)
      setErrorMessage('解密失败，请确认密码和密文参数是否一致。')
      setDecryptedText('')
    }
  }

  return (
    <main className="min-h-screen px-6 py-12 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Card title="Encrypt Demo" className="shadow-md">
          {errorMessage ? <Alert type="error" message={errorMessage} showIcon /> : null}
          <Space orientation="vertical" className="w-full">
            <Input
              placeholder="请输入需要加密的文本"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
            />
            <Input.Password
              placeholder="请输入用于加解密的密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Space orientation="horizontal" className="w-full">
              <Button type="primary" onClick={handleEncrypt}>
                加密
              </Button>
              <Button onClick={handleDecrypt}>解密</Button>
            </Space>

            <div className="grid gap-4 md:grid-cols-2">
              <Card size="small">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  加密结果
                </p>
                <p className="mt-2 break-all text-sm">{encryptedText || '暂未生成加密文本'}</p>
              </Card>
              <Card size="small">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  解密结果
                </p>
                <p className="mt-2 break-all text-sm">{decryptedText || '暂未生成解密文本'}</p>
              </Card>
            </div>

            <p className="border-t border-slate-200 pt-4 text-xs text-slate-500">
              提示：当前示例会保存解密所需参数（salt、iv、iterations 等）并使用密码重新派生密钥。
            </p>
          </Space>
        </Card>
      </div>
    </main>
  )
}

export default AesGcm
