# Eip 6963 的实现

## Dapp 逻辑

```js
// 监听钱包注册事件
window.addEventListener("eip6963:announceProvider", (event) => {
  // add event.detail to providers
});

// 通知插件钱包注册 eip6963
window.dispatchEvent(new Event("eip6963:requestProvider"));
```

## 钱包 injected 代码

```js
const announce6963Provider = () => {
  window.dispatchEvent(
    new CustomEvent("eip6963:announceProvider", {
      detail: Object.freeze({ info, provider: {} }),
    }),
  );
};

// 注册 eip6963
announce6963Provider();

// 监听到 Dapp 发起的请求 eip6963 之后再次注册 eip6963, 兼容钱包注入代码先跑而 dapp 代码后跑的情况
window.addEventListener("eip6963:requestProvider", () => {
  announce6963Provider();
});
```

## 参考文档

- [EIP-1193: Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
- [EIP-6963: Multi Injected Provider Discovery](https://eips.ethereum.org/EIPS/eip-6963)
- [多钱包自动发现以及注入冲突解决方案: EIP-6963调研](https://learnblockchain.cn/article/8455)
- [集成 EIP 6963 - 给前端开发者的指南](https://learnblockchain.cn/article/8499)
- [EIP-6963 简介](https://learnblockchain.cn/article/8497)
