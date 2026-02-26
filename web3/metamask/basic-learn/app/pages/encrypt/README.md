# Encrypt

本目录实现了一个基于 Crypto API 的前端加密/解密演示页面，采用 `PBKDF2 + AES-GCM`。

## 目录结构

- `index.tsx`：页面组件，负责输入、按钮操作、结果展示和错误提示。
- `utils.ts`：加解密核心能力，负责密钥派生、加解密与数据格式约定。

## 当前加解密流程

1. 用户输入明文和密码。
2. 调用 `encryptWithPassword()`：
   - 随机生成 `salt`（32 字节）和 `iv`（12 字节）
   - 使用 `PBKDF2` 从密码派生 AES 密钥（`iterations=600000`, `hash=SHA-256`）
   - 使用 `AES-GCM` 加密明文
   - 返回 `EncryptedPayload`
3. 点击解密时调用 `decryptWithPassword()`：
   - 从 `payload` 读取 `salt/iv/ciphertext/iterations/hash`
   - 再次派生密钥并执行解密

## EncryptedPayload 字段

- `version`：数据版本号，便于后续升级兼容。
- `kdf`：密钥派生算法，当前固定为 `PBKDF2`。
- `iterations`：PBKDF2 迭代次数。
- `hash`：PBKDF2 哈希算法，当前为 `SHA-256`。
- `salt`：盐值（Base64）。
- `iv`：AES-GCM 初始化向量（Base64）。
- `ciphertext`：密文（Base64）。

## 设计要点

- 不持久化导出的原始密钥，解密时通过密码重新派生密钥。
- `AES-GCM` 使用 `additionalData` 绑定版本与参数，提升完整性校验能力。
- 页面层与加解密层分离，后续扩展更清晰。
