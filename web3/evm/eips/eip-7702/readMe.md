# Eip 7702

> 允许普通 EOA 帐户设置一个 delegation contract, 临时拥有合约能力，但是仍然保留私钥控制。

一次正常的 7702 交互应该是，升级授权合约 -> 逻辑处理 -> 设置授权给 0 地址以实现取消授权。体现出了 7702 的“临时性”

## 升级

7702 升级交易的交易体：

```json
{
  "type": "0x4",   // 7702 类型
  "authorizationList": [
    {
      // 授权的合约地址
      "address": "delegation_contract_address",
      // 授权有效 nonce
      "nonce": 0,
      // Eip 155 链
      "chainId": 1
    }
  ]
}
```
其中 nonce 和 chainId 字段主要是为了防止 7702 授权信息被跨链和重放。假设当前用户 nonce 为 10. 一个黑客引导用户签名了 nonce 为 11 的签名但是还没有来得及广播。此时用户就可以立刻发起一笔转账，提前将 11 的 nonce 占用。黑客手里的授权签名就没有意义了。

## 逻辑处理

通过升级步骤，原本普通的 EOA 具备了合约的能力。就可以实现一些高级功能：
- gas 代付
- 稳定币支付 gas
- 批量调用
- ⋯⋯。

7702 交易的 data 字段既可以由 EOA 本人发起也可以由 Payer(代付者) 发起，这正是稳定币付 gas 的核心 -- 用户提供签名，代付人发起交易。

## 取消授权

当逻辑处理执行完成后理论上还需要把前置步骤中用户授权的 delegation contract 会退回来，具体操作为将 authorizationList 中的 address 字段设置为 0x0000000000000000000000000000000000000000. 也就是说在授权阶段 authorizationList 字段中写入两项，一项是授权，一项是取消授权。

## 安全性

### 蜜罐钓鱼

正如上文提到的，正经服务商会在服务完成后发起取消授权的请求释放用户的授权。但是黑客反而会利用这一机制，长期霸占 EOA 的控制权获利

#### 黑客

1. 创建 EOA 并转入代币，创建蜜罐
2. 部署合约设置 receive 为 payable, 添加把 msg.value 直接转到收益帐户的逻辑 [合约示例](../../contract/src/HoneyPot7702.sol)
3. 升级帐户，相关 [Dapp 代码示例](../../../webRepo/app/pages/EvmDapp/components/Eip7702/index.tsx)
4. 公开私钥，将蜜罐的私钥或者助记词发布到社交网络

#### 用户

1. 获得私钥，发现蜜罐内代币。但是主币不足以支付 gas
2. 尝试向蜜罐转入主币，此时触发代理合约的 receive 方法。主币直接被转入黑客钱包
3. 偷鸡不成蚀把米，贪小便宜吃大亏

#### 防范

作为钱包，可以通过 debug_traceCall 开启 diffMode 模拟转账后查看 from to 地址是否都有对应的资产变动。对于异常情况及时弹窗

### 诱导签名

由于 7702 的签名也是 RLP 编码签名，黑客可能会通过引导用户 eth_sign 在用户不知情的情况下得到用户的 7702 授权。进而控制用户的帐户。但是目前主流钱包都禁用了 eth_sign. 这种方式影响有限

## 相关资料

- [eip7702.io](https://eip7702.io/)
- [eip-7702](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7702.md)