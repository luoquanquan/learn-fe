# EIP 712 (eth_signTypedData)

> eth_signTypedData 是以太坊中用于结构化签名的核心方法。旨在解决“盲签”(用户看不懂的 16 进制数据)带来的安全隐患

## eth_signTypedData_v1

### 背景

早期的实验版本，由 MM 在 2017 年前后引入。解决了 eth_sign 只能签名一串没有意义的哈希的问题。

### 特点 & 缺陷

- 用户所见即所签，杜绝了“盲签”
- 只支持简单的键值对数组，不支持复杂的嵌套结构
- 没有 Domain Separator（域分隔符），用户的同一笔签名可以在不同的 Dapp 或者不同链上被重放(Replay Attack)
- 数据格式与后来的 EIP 712 规范标准不完全相同

## eth_signTypedData_v3

eth_signTypedData 的演进过程跳过了 v2 版本。直接进入了 v3 版本

### 改进

引入了 EIP 712 的核心概念：

- 类型定义(Types): 允许定义复杂的 struct 结构
- 域分隔符（Domain Separator）：包含 chainId、verifyingContract 字段。确保了签名只在特定的链的特定合约上生效，避免了重放攻击

### 局限性

对于动态数组和递归结构的支持不够完善

## eth_signTypedData_v4

### 改进

- 完全支持 EIP 712
  - 动态数组(如：Address[])
  - 递归结构(Structs 相互引用)
- 更严谨的哈希算法 hashStruct(s) = keccak256(typeHash || encodeData(s)) 的标准公式，

### 使用场景

- NFT 上(下)架
- Permit(2)

### 如何区分一笔 eth_signTypedData_v4 签名是否为 Permit(2)

直接查看 primaryType 字段：

- Permit: 则代表是 Permit(EIP 2612) 签名
- PermitTransferFrom / PermitBatchTransferFrom: 用于 Permit2(Uniswap) 转账许可
- PermitSingle / PermitBatch: 用于 Permit2(Uniswap) 授权额度
