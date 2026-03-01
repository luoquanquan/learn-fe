# 如何区分 EOA 和合约地址

## 背景

在[《Mastering Ethereum》](https://github.com/ethereumbook/ethereumbook/blob/develop/02intro.asciidoc#externally-owned-accounts-eoas-and-contracts) 一书中提到, 以太坊地址有两种:

- 合约地址
- EOA 地址

但是该书并没有给出如何区分这两种地址, 往往就可能会导致我们原本想要授权给合约地址的代币授权给了 eoa 地址, 原本想要转账给 eoa 然而错转给了合约地址...

> The type of account you created in the MetaMask wallet is called an externally owned account (EOA). Externally owned accounts are those that have a private key; having the private key means control over access to funds or contracts. Now, you’re probably guessing there is another type of account. That other type of account is a contract account. A contract account has smart contract code, which a simple EOA can’t have. Furthermore, a contract account does not have a private key. Instead, it is owned (and controlled) by the logic of its smart contract code: the software program recorded on the Ethereum blockchain at the contract account’s creation and executed by the EVM.

## 方法

eoa 地址和合约地址的本质区别在于 eoa 地址由用户控制, 用户存在私钥. 合约地址是开发者部署到链上智能合约后生成的地址. 不存在私钥但是链上有关联的代码. 区分两者主要是依据这个属性. 根据使用方式的不同有以下三种方法实现两者的区分.

### 使用 web3.js

开发者可以通过 web3.eth.getCode 方法获取当前查询的地址在链上是否存在关联的代码. 示例代码:

```js
// eoa 地址, 你将得到 '0x'
web3.eth.getCode('0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8').then((resp) => {
  console.log(resp)
})

// 合约地址, 你将得到合约绑定的代码二进制信息
web3.eth.getCode('0xdac17f958d2ee523a2206206994597c13d831ec7').then((resp) => {
  console.log(resp)
})
```

### 通过组装 rpc 请求链上

web3.js 实际上就是对 rpc 请求的封装, 因此我们自己拼装 rpc 请求也可以获取到链上信息. 示例代码:

```js
// eoa 地址, 你将得到 '0x'
axios
  .post(rpcUrl, {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: ['0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8', 'latest']
  })
  .then((resp) => {
    console.log(resp)
  })

// 合约地址, 你将得到合约绑定的代码二进制信息
axios
  .post(rpcUrl, {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: ['0xdac17f958d2ee523a2206206994597c13d831ec7', 'latest']
  })
  .then((resp) => {
    console.log(resp)
  })
```

### 直接使用 curl 发送 rpc 请求

上述两种方法都是便于代码区分一个地址是 eoa 还是合约地址的, 实际使用的用户可能并不需要写代码. 就可以直接在 shell 中使用以下命令来确认自己待交互的地址是 eoa 还是合约地址了 ~

```bash
# eoa 地址, 你将得到 '0x'
curl https://rpc.mevblocker.io/ \
   -X POST \
   -H "Content-Type: application/json" \
   --data '{"method":"eth_getCode","params":["0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8","latest"],"id":1,"jsonrpc":"2.0"}'

# 合约地址, 你将得到合约绑定的代码二进制信息
curl https://rpc.mevblocker.io/ \
   -X POST \
   -H "Content-Type: application/json" \
   --data '{"method":"eth_getCode","params":["0xdac17f958d2ee523a2206206994597c13d831ec7","latest"],"id":1,"jsonrpc":"2.0"}'
```
