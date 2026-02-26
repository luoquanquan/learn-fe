## E2EE 端到端加密

展示了一个基于 secp256k1 椭圆曲线的端到端加密（E2EE）最小示例，用于理解链上常见的「先用公私钥协商共享密钥，再用对称加密通信」这一模式。

### 核心流程概览

1. **生成密钥对**
   - 使用 `@noble/secp256k1` 生成 Alice、Bob 各自的 secp256k1 私钥与（非压缩）公钥。

2. **协商共享密钥（ECDH）**
   - Alice 使用自己的私钥 + Bob 的公钥，计算共享密钥。
   - Bob 使用自己的私钥 + Alice 的公钥，计算共享密钥。
   - 通过 ECDH 性质，两边得到同一个共享密钥。

3. **派生对称密钥**
   - 对共享密钥做一次 `sha256`，取后 32 字节，作为 AES‑256‑GCM 的对称密钥。

4. **使用 AES‑256‑GCM 加解密**
   - 加密：`encryptMessage(sharedKey, message)`
     - 随机生成 12 字节 `iv`。
     - 使用 `crypto.createCipheriv('aes-256-gcm', sharedKey, iv)` 加密，得到密文 `encrypted` 与认证标签 `tag`。
   - 解密：`decryptMessage(sharedKey, { iv, encrypted, tag })`
     - 使用同一把 `sharedKey`、相同 `iv` 与 `tag` 还原出明文。

5. **双向通信示例**
   - Bob 使用共享密钥加密「Hello Alice」，Alice 用自己的共享密钥成功解密。
   - Alice 反过来加密「Hi Bob」，Bob 用共享密钥成功解密。
   - 日志中会打印出双方共享密钥的 hex 与是否相等，以及最终解密出的消息。

### 可以从这个示例学到什么

- 如何用 secp256k1 做一轮 ECDH 协商共享密钥。
- 如何基于 Node.js `crypto` 模块实现 AES‑256‑GCM 的加解密。
- 为什么只要私钥不泄露，监听者即便截获所有密文也无法还原明文（缺少共享密钥）。
- 这些原理与很多链上/钱包协议里的 E2EE、隐私聊天、加密备份的实现思路是一致的。

> 提示：这是一个最小教学 demo，只演示原理；生产环境还需要考虑公钥认证、密钥轮换、重放攻击防护等安全细节。
