# EVM 系 dapp 交互解析

示例中主要 cover 了 ERC20 代币的授权, 转移, 资产变动信息, ERC721, ERC1155 大同小异

## ERC721

需要关注的事件:
- Transfer 资产变动
- Approval 单个授权
- ApprovalForAll 全局授权
- ConsecutiveTransfer 大批量 mint 时可能用它

## ERC1155

- TransferSingle 单个转移
- TransferBatch 批量转移
- ApprovalForAll 授权, 1155 不像 721 没有单个授权
- from === address(0) mint
- to === address(0) burn

## 离线签名

### eth_sign

用户可以通过 eth_sign 签一段 “任意字节数据”, 但是钱包不知道这段数据意味着什么. 现代钱包往往直接禁用这个方法.

合约的验签名逻辑通常为: `ecrecover(hash, signature) == user` 就认为通过. 只要 hash 对得上就可以执行敏感逻辑.

#### 攻击

##### 步骤

1. 恶意网站让你 eth_sign, 你以为是登陆
2. 实际上可能签署的内容可能为:
   1. permit
   2. metaTx
   3. Seaport order
   4. NFT 授权订单
3. 攻击者把签名提交到链上合约验证签名通过
4. 资产被转走

##### 场景

1. eth_sign 不绑定以下信息
   1. chainId
   2. nonce
   3. 合约
   4. 使用场景
2. 如果合约设置不严谨, 可能出现
   1. 签名被跨链重放
   2. 可重复提交
   3. 可被二次构造

#### 为什么 personal_sign 就是安全的

personal_sign 并非没有钓鱼的可能, 它只是比 eth_sign 好一点. 两者的本质是一样的:
```
keccak256("\x19Ethereum Signed Message:\n" + len + message)
```
主要区别在于 personal_sign 是明文签名, 钱包 UI 会展示实际签名的内容, 用户可以直接看到. 只要合约是通过 toEthSignedMessageHash 验签就有可能会被钓鱼. 前提是:
1. 用户忽略了钱包 UI 的提示内容, 直接签名
2. Hacker 对签名内容做了混淆. 用户看到的是 hex 字符串. 但是实际上是上架 NFT 请求

### eth_signTypedData

为了解决“盲签”而引入的 eth_signTypedData, 目前以太坊生态中最标准使用最广的版本是 eth_signTypedData_v4.

根据 primaryType 字段可以判断当前 V4 签名是否为 Permit(Eip 2612) 或者 Permit2(Uniswap).

primaryType | 类型 | verifyingContract
--- | --- | ---
Permit | Permit(Eip 2612) | 代币合约地址
PermitSingle | 单个代币 Permit2 | 0x000000000022D473030F116dDEE9F6B43aC78BA3(Uniswap 部署的固定标准地址)
PermitBatch | 多个代币 Permit2 | 0x000000000022D473030F116dDEE9F6B43aC78BA3(Uniswap 部署的固定标准地址)

安全层面需要注意, Permit(2) 的 spender 地址. 如果你将代币 Permit 给了恶意合约. 它可以转移你所有的代币(授权给 Permit2 合约的).
