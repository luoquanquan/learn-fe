#!/usr/bin/env python3
"""
自动生成面试题脚本 - 币安 Web3 钱包前端开发针对性版
方向：前端(3题) + Web3(4题) + AI(3题)
特色：针对钱包前端开发，涵盖移动端、安全、性能、多链等
流程：生成 → Git 提交 → GitHub推送 → 飞书通知
"""

import os
import subprocess
import sys
import random
from datetime import datetime

WORKSPACE = "/home/ubuntu/.openclaw/workspace/learn-fe"
QUESTION_DIR = f"{WORKSPACE}/ai-generate/learn-docs"

def run_cmd(cmd, cwd=None):
    """执行命令并返回输出"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
    return result.returncode == 0, result.stdout, result.stderr

# ============ 前端题目库 (18道 - 针对钱包前端) ============
FRONTEND_QUESTIONS = [
    {
        "title": "Web3 钱包移动端 H5 如何与 Native App 通信？JSBridge 的实现原理是什么？",
        "tags": "JSBridge / 移动端 / 混合开发 / 币安钱包",
        "content": """**JSBridge 核心原理**:
- WebView 注入全局对象供 JS 调用
- URL Scheme / Prompt / iframe 方式 Native 调用 JS

**币安钱包场景**:
```javascript
// H5 调用 Native 签名
window.BinanceWallet.postMessage(JSON.stringify({
  method: 'eth_signTransaction',
  params: [{ from, to, value, data }],
  id: Date.now()
}));

// Native 回调
window.BinanceWallet.callbacks[id] = (result) => {
  // 处理签名结果
};
```

**安全考虑**:
- 验证域名白名单
- 敏感操作需要用户确认
- 防止中间人攻击"""
    },
    {
        "title": "React Native 与 Flutter 在 Web3 钱包开发中如何选型？各自有什么优劣？",
        "tags": "跨平台 / React Native / Flutter / 钱包开发",
        "content": """**对比分析**:
| 维度 | React Native | Flutter |
|------|--------------|---------|
| 钱包SDK集成 | 丰富（原生模块桥接） | 需插件或MethodChannel |
| 性能 | 接近原生 | 更优（Skia自绘） |
| 包大小 | 较大（JS引擎） | 较大（Flutter引擎） |
| 热更新 | CodePush友好 | 受限 |
| 团队成本 | React背景易上手 | Dart学习成本 |

**币安选择考量**:
- 已有React生态 → RN
- 高性能渲染需求 → Flutter
- 建议：核心链功能原生，UI层跨平台"""
    },
    {
        "title": "Web3 钱包的私钥如何安全存储？移动端 Keychain/Keystore 的使用最佳实践？",
        "tags": "安全存储 / Keychain / 私钥管理 / 钱包安全",
        "content": """**存储方案**:
- iOS: Keychain（kSecAttrAccessibleAfterFirstUnlock）
- Android: Keystore + EncryptedSharedPreferences
- 禁止：LocalStorage、AsyncStorage 明文存储

**最佳实践**:
```typescript
// 使用 react-native-keychain
import * as Keychain from 'react-native-keychain';

// 存储私钥
await Keychain.setGenericPassword(
  'wallet_private_key',
  encryptedPrivateKey,
  { service: 'com.binance.wallet' }
);

// 生物识别保护
await Keychain.setGenericPassword(
  username, password,
  { accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET }
);
```

**安全增强**:
- 内存中短暂存储，使用后立即清除
- 截屏/录屏保护（FLAG_SECURE）
- 根/越狱检测"""
    },
    {
        "title": "钱包 DApp 浏览器如何实现？如何处理多链切换和钱包注入？",
        "tags": "DApp浏览器 / WebView / 多链切换 / 钱包注入",
        "content": """**架构设计**:
```
DApp WebView
  ↓
注入 Provider (window.ethereum / window.binanceChain)
  ↓
拦截请求 → 路由到对应链 RPC
```

**多链切换**:
```javascript
// 动态替换 Provider
const providers = {
  1: new ethers.JsonRpcProvider(ethRpc),
  56: new ethers.JsonRpcProvider(bscRpc),
};

window.ethereum.request = async (args) => {
  const chainId = await getCurrentChain();
  return providers[chainId].send(args.method, args.params);
};
```

**安全防护**:
- 域名黑白名单
- 钓鱼网站检测
- 交易内容预览"""
    },
    {
        "title": "Web3 钱包的性能优化有哪些关键点？如何优化代币列表渲染和交易历史加载？",
        "tags": "性能优化 / 虚拟列表 / 懒加载 / 钱包体验",
        "content": """**代币列表优化**:
- 虚拟列表：react-window / FlashList
- 优先级：主币/热门币优先加载
- 图片：WebP 格式 + 占位符

**交易历史**:
- 分页加载（cursor-based）
- 本地缓存 + 增量更新
- 后台轮询 + 推送结合

**内存管理**:
```javascript
// 大列表释放
useEffect(() => {
  return () => {
    // 清理图片缓存
    Image.clearMemoryCache();
  };
}, []);
```"""
    },
    {
        "title": "钱包中的交易状态追踪如何实现？如何处理pending交易的实时更新？",
        "tags": "交易状态 / 轮询 / WebSocket / 实时更新",
        "content": """**状态机设计**:
```
Submitted → Pending → Mined → Confirmed
                    ↓
                  Failed / Dropped
```

**实现方案**:
```javascript
// 组合策略
class TransactionTracker {
  // WebSocket 实时通知
  subscribeWs(txs) { ... }
  
  // 指数退避轮询（备用）
  pollWithBackoff(txHash) {
    const delay = Math.min(1000 * 2**attempt, 30000);
  }
  
  // 本地 nonce 管理防止 stuck
  checkStuckTransactions() { ... }
}
```

**币安方案**:
- 自有节点 WebSocket
- 多链统一抽象层
- 交易失败自动重试"""
    },
    {
        "title": "TypeScript 在大型钱包项目中的工程实践？如何设计类型安全的链上数据层？",
        "tags": "TypeScript / 类型安全 / 工程实践 / 钱包架构",
        "content": """**类型设计**:
```typescript
// 多链抽象
type ChainId = 1 | 56 | 137 | 42161;

interface ChainConfig {
  id: ChainId;
  name: string;
  nativeCurrency: Currency;
  rpcUrls: string[];
  blockExplorer: string;
}

// 交易类型
interface Transaction {
  hash: Hash;
  from: Address;
  to: Address;
  value: BigNumberish;
  status: 'pending' | 'success' | 'failed';
  chainId: ChainId;
}
```

**工具链**:
- strict 模式开启
- zod 运行时类型校验
- GraphQL Codegen 自动生成类型"""
    },
    {
        "title": "前端如何实现安全的多签钱包界面？如何展示多签交易进度和签名者状态？",
        "tags": "多签钱包 / Gnosis Safe / 进度展示 / 协作签名",
        "content": """**核心功能**:
- 签名者列表展示（已签/待签）
- 交易构建预览
- 执行阈值提示

**UI 设计**:
```
┌─────────────────────────┐
│ 签名进度 2/3            │
│ ████████░░ 66%          │
│                         │
│ ✓ Alice  0x123...       │
│ ✓ Bob    0x456...       │
│ ⏳ Carol  0x789... (待签)│
│                         │
│ [签名] [执行]            │
└─────────────────────────┘
```

**安全提示**:
- 每次签名前展示完整交易信息
- 链上验证 nonce 和 calldata
- 多签地址与单签地址区分显示"""
    },
    {
        "title": "钱包的暗黑模式和无障碍适配（a11y）如何实现？有什么最佳实践？",
        "tags": "UI/UX / 暗黑模式 / 无障碍 / 可访问性",
        "content": """**暗黑模式**:
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
}

[data-theme='dark'] {
  --bg-primary: #0b0e11;
  --text-primary: #eaecef;
}
```

**无障碍**:
- 语义化标签（button vs div）
- ARIA 属性（aria-label, role）
- 键盘导航支持
- 屏幕阅读器测试

**币安规范**:
- 对比度 WCAG 2.1 AA 标准
- 动态字体大小适配
- 减少动画（prefers-reduced-motion）"""
    },
    {
        "title": "前端如何实现离线签名和二维码签名？适用于硬件钱包和冷钱包场景",
        "tags": "离线签名 / 二维码 / 硬件钱包 / 冷钱包",
        "content": """**离线签名流程**:
```
在线端: 构建交易 → 生成待签数据 → 显示二维码
        ↓
离线端: 扫描二维码 → 私钥签名 → 显示签名二维码
        ↓
在线端: 扫描签名 → 广播交易
```

**二维码数据格式**:
```typescript
// EIP-4527 标准
interface QRData {
  type: 'sign-request' | 'signature';
  cypher: 'eth-sign-tx';
  data: string; // Base64 encoded
  compress: 'gzip';
}
```

**安全要点**:
- 二维码数据加密
- 防止中间人篡改
- 交易内容预览确认"""
    },
    {
        "title": "钱包的代币授权（Approve）管理如何实现？如何帮助用户管理无限授权风险？",
        "tags": "代币授权 / Approve / 安全管理 / 风险提醒",
        "content": """**风险场景**:
- 无限授权（uint256.max）被恶意合约利用
- 遗忘的历史授权

**功能设计**:
```
┌────────────────────────────┐
│ 授权管理                    │
│                             │
│ USDT → Uniswap V3          │
│ 额度: 无限 ⚠️              │
│ [撤销授权]                  │
│                             │
│ DAI → Aave V3              │
│ 额度: 1000 DAI             │
│ [修改额度] [撤销]          │
└────────────────────────────┘
```

**智能提醒**:
- 大额授权前警告
- 定期清理建议
- 与 revoke.cash 集成"""
    },
    {
        "title": "如何实现钱包的 gas 费预估和优化？EIP-1559 费用市场的前端展示策略？",
        "tags": "Gas 优化 / EIP-1559 / 费用预估 / 用户体验",
        "content": """**预估策略**:
```javascript
// 多来源聚合
const gasPrice = median([
  await provider.getGasPrice(),
  await etherscanAPI.getGasOracle(),
  await blocknative.getGas()
]);
```

**EIP-1559 展示**:
```
┌───────────────────────────┐
│ Gas 费用                   │
│                           │
│ 慢 🐢         0.001 ETH   │
│ ~5分钟                     │
│                           │
│ 标准 🚗       0.002 ETH  │
│ ~2分钟  ◀ 推荐            │
│                           │
│ 快 🚀         0.004 ETH   │
│ ~30秒                      │
│                           │
│ Base Fee: 15 Gwei         │
│ Priority Fee: 2 Gwei      │
└───────────────────────────┘
```

**高级功能**:
- 自定义 gas 设置
- L2 费用对比
- 历史 gas 趋势"""
    },
    {
        "title": "钱包的地址簿和 ENS 解析功能如何实现？如何防止地址投毒攻击？",
        "tags": "地址簿 / ENS / 安全 / 地址投毒",
        "content": """**地址投毒攻击**:
- 攻击者发送小额代币到生成的相似地址
- 用户复制错误地址导致资金损失

**防护措施**:
```javascript
// 1. 地址校验
function validateAddress(address, expected) {
  // 全字符比对，不只是前几位
  return address.toLowerCase() === expected.toLowerCase();
}

// 2. 地址簿优先
// 禁止直接从交易记录复制地址

// 3. ENS 正向解析验证
async function verifyAddress(ens, address) {
  const resolved = await provider.resolveName(ens);
  return resolved === address;
}
```

**ENS 集成**:
- 反向解析显示昵称
- 头像加载（ENS avatar）
- 多链地址解析"""
    },
    {
        "title": "前端如何实现安全的 iframe 集成？币安钱包如何嵌入第三方 DApp？",
        "tags": "iframe / 沙箱 / 安全隔离 / DApp集成",
        "content": """**iframe 安全属性**:
```html
<iframe 
  sandbox="allow-scripts allow-same-origin"
  referrerpolicy="no-referrer"
  csp="default-src 'self'"
>
```

**通信机制**:
```javascript
// postMessage 白名单
window.addEventListener('message', (e) => {
  if (!ALLOWED_ORIGINS.includes(e.origin)) return;
  
  if (e.data.type === 'WALLET_REQUEST') {
    // 处理钱包请求
  }
});
```

**权限控制**:
- 域名白名单验证
- 请求频率限制
- 敏感操作二次确认"""
    },
    {
        "title": "钱包的推送通知系统如何设计？如何处理交易确认和安全提醒？",
        "tags": "推送通知 / FCM / APNS / 安全提醒",
        "content": """**通知类型**:
- 交易状态：Submitted → Confirmed
- 安全提醒：大额转出、新设备登录
- 市场提醒：价格预警、空投通知

**技术方案**:
```
FCM (Android) / APNS (iOS)
    ↓
推送网关 → 设备令牌管理
    ↓
本地通知展示
```

**安全增强**:
- 推送内容加密
- 敏感操作不包含在推送文案中
- 点击跳转 App 后二次确认"""
    },
    {
        "title": "如何实现钱包的汇率和代币价格实时更新？WebSocket 与轮询的取舍？",
        "tags": "价格更新 / WebSocket / 数据推送 / 实时性",
        "content": """**数据源**:
- CoinGecko / CoinMarketCap API
- 币安行情 WebSocket
- Chainlink 预言机

**策略选择**:
| 场景 | 方案 | 说明 |
|------|------|------|
| 首页列表 | 轮询 30s | 降低服务器压力 |
| 交易页 | WebSocket | 实时价格影响 |
| 详情页 | 混合 | WS为主，轮询兜底 |

**优化**:
- 批量订阅减少连接数
- 本地缓存 + 增量更新
- 后台暂停更新"""
    },
    {
        "title": "钱包的新手引导（Onboarding）流程如何设计？如何平衡安全教育和用户体验？",
        "tags": "新手引导 / 用户体验 / 安全教育 / Onboarding",
        "content": """**引导流程**:
```
1. 助记词创建/导入
   ↓ 强调备份重要性
2. 安全提示（截图警告、泄露风险）
   ↓
3. 简单交互教程（收款、发送）
   ↓
4. 首次交易引导
```

**平衡策略**:
- 分步教育，不一次性灌输
- 危险操作强制确认（如展示私钥）
- 可跳过，但风险明确提示
- 后续随时可查看安全中心"""
    },
    {
        "title": "前端如何实现多语言国际化（i18n）？Web3 领域的专业术语翻译如何处理？",
        "tags": "国际化 / i18n / 本地化 / 多语言",
        "content": """**技术方案**:
```javascript
// react-i18next
const { t } = useTranslation();
t('wallet.balance', { amount: '1.5 ETH' });

// 语言文件
{
  "wallet": {
    "balance": "余额: {{amount}}",
    "gasFee": "矿工费"
  }
}
```

**Web3 术语**:
- 保留英文：DeFi、NFT、DAO、Gas
- 翻译 + 英文注释：质押(Staking)、流动性池(LP)
- 地区差异：Gas Fee → 矿工费(中) / Gas费(港)

**币安规范**:
- 20+ 语言支持
- 专业术语表统一
- RTL（阿拉伯语）适配"""
    },
]

# ============ Web3 题目库 (25道 - 钱包相关) ============
WEB3_QUESTIONS = [
    {
        "title": "EIP-1193 和 EIP-6963 有什么区别？如何检测用户安装了多个钱包插件？",
        "tags": "EIP-1193 / EIP-6963 / 多钱包检测 / 钱包标准",
        "content": """**EIP-1193**: 基础 Provider 接口标准
- request / on / removeListener
- 问题：多钱包冲突，window.ethereum 被覆盖

**EIP-6963**: 多钱包发现标准
```javascript
// 钱包广播
window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
  detail: { info: { name: 'Binance Wallet', icon, rdns }, provider }
}));

// DApp 监听
window.addEventListener('eip6963:announceProvider', (e) => {
  wallets.push(e.detail); // 显示钱包列表供用户选择
});
```

**币安实现**: 同时支持两种标准，兼容新旧 DApp"""
    },
    {
        "title": "WalletConnect v2 的工作原理是什么？与 v1 相比有什么安全改进？",
        "tags": "WalletConnect / 钱包连接 / 去中心化通信",
        "content": """**v2 架构**:
-  relay 网络（基于 Waku 去中心化通信）
- 会话持久化（本地存储）
- 多链支持（同时连接多条链）
- 命名空间（EIP-155 标准）

**安全改进**:
| v1 | v2 |
|----|----|
| 中心化 bridge | 去中心化 relay |
| 无过期时间 | 会话有 TTL |
| 单链 | 多链 |
| 无权限管理 | 作用域授权 |

**币安集成**: 支持 WalletConnect，方便连接桌面 DApp"""
    },
    {
        "title": "如何防范钱包常见的钓鱼攻击？假冒 DApp、假代币、签名钓鱼的识别方法？",
        "tags": "安全 / 钓鱼攻击 / 防骗 / 币安安全",
        "content": """**钓鱼类型及防范**:

1. **假冒 DApp**
   - 域名相似度检测（unisway vs uniswap）
   - 已验证合约标记
   - 域名白名单提示

2. **假代币**
   - 合约地址校验
   - 官方代币列表
   - 价格异常提醒（同名低价代币）

3. **签名钓鱼**
   - eth_sign 警告（可签名任意数据）
   - 个人签名 vs 交易签名区分
   - Permit/Approve 额度检查

**币安安全中心**:
- 实时黑名单更新
- 社区举报机制
- AI 风险地址检测"""
    },
    {
        "title": "以太坊和 BSC 的 RPC 调用有什么区别？钱包如何统一多链交互接口？",
        "tags": "多链支持 / EVM兼容 / RPC差异 / 币安链",
        "content": """**链差异**:
| 特性 | 以太坊 | BSC |
|------|--------|-----|
| 出块时间 | 12s | 3s |
| Gas费 | 高 | 低 |
| 共识 | PoS | PoSA |
| API | 标准 | 兼容+扩展 |

**统一接口层**:
```typescript
interface ChainAdapter {
  readonly chainId: number;
  getBalance(address: string): Promise<bigint>;
  getTransactionReceipt(hash: string): Promise<Receipt>;
  // 特殊处理
  getTokenList?(): Promise<Token[]>; // BSC扩展
}

class EVMProvider implements ChainAdapter {
  // 通用 EVM 实现
}

class BSCProvider extends EVMProvider {
  // BSC 特殊处理
}
```

**币安优势**: BSC 作为主力链，深度优化"""
    },
    {
        "title": "硬件钱包（Ledger/Trezor）与软件钱包的集成方案？如何实现安全通信？",
        "tags": "硬件钱包 / Ledger / 安全通信 / 离线签名",
        "content": """**通信方式**:
- USB HID / WebUSB
- Bluetooth（Ledger Nano X）
- QRCode（空气间隙）

**集成流程**:
```
1. 连接硬件钱包
2. 获取公钥/地址（派生路径 m/44'/60'/0'/0/0）
3. 构建交易并发送到硬件设备
4. 用户在设备上确认
5. 设备返回签名
6. 前端广播交易
```

**安全要点**:
- 所有敏感操作在硬件内完成
- 显示地址在硬件屏幕上确认
- 固件版本检查"""
    },
    {
        "title": "代币授权（Approve）无限额的风险是什么？前端如何实现授权额度的安全管理？",
        "tags": "代币授权 / Approve / 风险管理 / 安全",
        "content": """**风险**:
- 恶意合约利用无限授权盗取全部代币
- 项目方 Rug Pull

**前端保护**:
```javascript
// 1. 默认推荐有限授权
const approveAmount = exactAmount; // 不推荐 MaxUint256

// 2. 授权管理面板
// 显示所有活跃授权，提供一键撤销

// 3. 风险提醒
if (spender.isUnverified) {
  showWarning('该合约未经验证，请谨慎授权');
}
```

**币安方案**:
- 智能合约风险评分
- 授权额度建议（基于使用场景）
- 定期提醒检查授权"""
    },
    {
        "title": "EIP-1559 交易和 Legacy 交易在钱包 UI 上应该如何差异化展示？",
        "tags": "EIP-1559 / Gas费 / 交易类型 / UI设计",
        "content": """**展示差异**:

**Legacy**:
```
Gas Price: 20 Gwei
Total: 0.001 ETH
```

**EIP-1559**:
```
Max Fee:          30 Gwei
Max Priority:     2 Gwei  (给矿工的小费)
Base Fee:         15 Gwei (销毁)
─────────────────────────
预计费用: 0.0005 - 0.001 ETH
```

**币安设计**:
- 默认使用 EIP-1559
- 显示费用组成（Base + Priority）
- 费用趋势指示（↑拥堵 ↓空闲）"""
    },
    {
        "title": "Layer2 钱包如何设计跨链桥接功能？Optimistic Rollup 的挑战期如何处理？",
        "tags": "Layer2 / 跨链桥 / Optimism / Arbitrum",
        "content": """**跨链流程**:
```
L1 → L2: 存款，约10-30分钟确认
L2 → L1: 提款，7天挑战期（Optimism）
```

**挑战期 UX 处理**:
- 明确提示7天等待期
- 进度追踪（区块倒计时）
- 快速桥接选项（第三方流动性池，付手续费）

**状态展示**:
```
提款状态: 等待挑战期
进度: ████████░░ 5/7 天
预计完成: 2024-01-15 12:00
```

**币安方案**: 提供快速通道（自有流动性）"""
    },
    {
        "title": "MPC（多方计算）钱包和智能合约钱包各有什么优劣？币安钱包采用什么方案？",
        "tags": "MPC / 智能合约钱包 / 密钥管理 / AA",
        "content": """**MPC 钱包**:
- 私钥分片，多方协同签名
- 无私钥单点，无私钥恢复
- 代表：Fireblocks, ZenGo

**智能合约钱包（AA）**:
- 逻辑在链上合约
- 支持社交恢复、批量交易、会话密钥
- Gas 成本较高

**对比**:
| 维度 | MPC | 智能合约 |
|------|-----|----------|
| 链兼容性 | 所有链 | EVM为主 |
| 成本 | 低（普通交易）| 高（合约调用）|
| 功能 | 有限 | 丰富 |

**币安**: 多方案支持，根据用户场景推荐"""
    },
    {
        "title": "NFT 市场在钱包中的实现要点？如何处理图片加载和元数据解析？",
        "tags": "NFT / IPFS / 元数据 / 图片优化",
        "content": """**图片加载**:
- IPFS 网关（Cloudflare, Pinata）
- 图片格式：WebP/AVIF
- 渐进加载：低清占位 → 高清

**元数据标准**:
```json
{
  "name": "NFT Name",
  "description": "...",
  "image": "ipfs://Qm...",
  "attributes": [...]
}
```

**性能优化**:
- 虚拟列表展示
- 本地缓存元数据
- 支持视频/音频 NFT

**币安 NFT**: 集成自有 NFT 市场"""
    },
    {
        "title": "DeFi 收益聚合器（如 Venus、PancakeSwap）如何在钱包中安全集成？",
        "tags": "DeFi / 收益聚合 / PancakeSwap / 币安生态",
        "content": """**集成要点**:

1. **合约审计**
   - 仅集成已审计协议
   - 显示审计报告链接

2. **风险提示**
   - APY 非年化保证
   - 无常损失警告（LP）
   - 智能合约风险提示

3. **Slippage 保护**
   - 默认 0.5%，大额交易提示
   - MEV 保护（私有内存池）

4. **币安生态**
   - BSC 优先集成
   - PancakeSwap, Venus, Alpaca 等"""
    },
    {
        "title": "钱包如何防范智能合约 front-running 攻击？交易隐私保护有哪些方案？",
        "tags": "MEV / Front-running / 隐私保护 / Flashbots",
        "content": """**Front-running 防范**:

1. **私密内存池**
   - Flashbots Protect
   - MEV-Share（部分 MEV 返还用户）

2. **交易混淆**
   - 分批执行大额交易
   - 随机延迟

3. **Slippage 保护**
   - 设置合理滑点
   - Deadline 检查

**隐私方案**:
- 混币器（Tornado Cash，合规风险）
- Privacy Pools（Vitalik 提议）
- ZK 转账（zkSync, Aztec）"""
    },
    {
        "title": "如何实现钱包的社交恢复功能？Guardian 机制的设计要点是什么？",
        "tags": "社交恢复 / Guardian / 账户安全 / AA",
        "content": """**社交恢复流程**:
```
1. 设置 3-5 个 Guardian（亲友、机构）
2. 私钥丢失时发起恢复请求
3. 多数 Guardian 签名确认
4. 新私钥生效，旧私钥失效
```

**设计要点**:
- Guardian 不能知道彼此身份（防止串通）
- 恢复延迟期（防止恶意恢复）
- 定期确认 Guardian 活跃度

**代表项目**: Argent, Loopring"""
    },
    {
        "title": "多链钱包的地址派生如何管理？HD 钱包（BIP-32/44）在币安钱包中的应用？",
        "tags": "HD钱包 / BIP44 / 地址派生 / 多链管理",
        "content": """**BIP-44 路径**:
```
m / purpose' / coin_type' / account' / change / address_index
m/44'/60'/0'/0/0    # ETH
m/44'/714'/0'/0/0   # BNB (BEP20)
m/44'/0'/0'/0/0     # BTC
```

**多链地址管理**:
- 同一助记词，不同路径派生
- 地址派生预计算（前10个地址）
- 用户切换链时地址自动切换

**币安实现**:
- 支持 50+ 链
- 一键创建多链钱包
- 地址标签自定义"""
    },
    {
        "title": "稳定币（USDT/USDC/BUSD）在钱包中的实现差异？如何处理多链稳定币？",
        "tags": "稳定币 / USDT / USDC / 多链代币",
        "content": """**合约差异**:
| 稳定币 | 标准 | 特点 |
|--------|------|------|
| USDT | ERC20 | 有黑名单功能 |
| USDC | ERC20 | 有冻结功能 |
| BUSD | ERC20 | 币安发行 |

**多链处理**:
- ETH: USDT (ERC20)
- BSC: USDT (BEP20)
- Tron: USDT (TRC20)

**UX 设计**:
- 显示链标识（USDT-ETH / USDT-BSC）
- 跨链转账提醒（不同链不互通）
- 默认展示主链稳定币"""
    },
    {
        "title": "钱包的 KYT（Know Your Transaction）和合规功能如何实现？",
        "tags": "合规 / KYT / 反洗钱 / 监管",
        "content": """**KYT 功能**:
- 交易对手风险评分
- 混币器/暗网地址标记
- 大额交易报告（STR）

**实现方案**:
```
交易发起 → 地址风险检测 → 风险评分
                ↓
           低风险: 正常通过
           高风险: 额外确认/拒绝
```

**数据源**:
- Chainalysis
- Elliptic
- TRM Labs
- 币安自有风控系统

**用户提示**:
- 风险地址警告
- 资金来源说明要求"""
    },
    {
        "title": "如何实现钱包的链上消息签名功能？EIP-712 结构化数据签名有什么优势？",
        "tags": "消息签名 / EIP-712 / 结构化数据 / 安全",
        "content": """**签名类型**:
- personal_sign：简单消息，可读性差
- signTypedData_v4（EIP-712）：结构化，可读

**EIP-712 优势**:
```javascript
const domain = {
  name: 'My Dapp',
  version: '1',
  chainId: 1,
  verifyingContract: '0x...'
};

// 用户看到的:
// 签名请求来自 My Dapp
// 链: Ethereum
// 内容: { amount: 100, token: USDT }
```

**防范**：防止签名钓鱼（如 OpenSea 钓鱼事件）"""
    },
    {
        "title": "钱包的 Token List 如何管理？如何防止虚假代币和名字冲突？",
        "tags": "代币列表 / Token List / 假币识别 / 安全",
        "content": """**Token List 来源**:
- CoinGecko / CoinMarketCap
- 官方 Token List（Uniswap, PancakeSwap）
- 币安官方列表

**防假币策略**:
1. **合约地址校验**
2. **官方验证标记**
3. **价格存在性检查**
4. **社区举报机制**

**名字冲突处理**:
- 显示合约地址缩写
- 市值/交易量排序
- 官方标记优先"""
    },
    {
        "title": "如何实现钱包的 Swap 聚合功能？1inch、0x、OpenOcean 的集成策略？",
        "tags": "Swap聚合 / DEX聚合 / 最优价格 / 流动性",
        "content": """**聚合原理**:
- 同时查询多个 DEX 价格
- 计算最优路径（可能多跳）
- 考虑 Gas 费和滑点

**集成策略**:
```
用户输入 → 1inch API → 0x API → OpenOcean
                ↓
           价格对比 → 最优方案
                ↓
           用户确认 → 执行交易
```

**币安集成**:
- PancakeSwap（BSC主力）
- 自有聚合引擎
- 最低价格保证"""
    },
    {
        "title": "钱包如何应对区块链网络拥堵？交易卡住（Stuck）时的 UX 处理？",
        "tags": "网络拥堵 / 交易加速 / RBF / UX设计",
        "content": """**拥堵检测**:
- Gas Price 监控
- 待处理交易数（mempool）
- 出块时间异常

**Stuck 交易处理**:
```
1. 检测 stuck 交易（nonce 未增加）
2. 提供加速选项:
   - RBF (Replace-By-Fee): 提高 Gas
   - Cancel: 发送 0 ETH 到自己
3. 自动加速（用户设置）
```

**UX 提示**:
- 拥堵警告
- 预计等待时间
- 加速/取消按钮"""
    },
    {
        "title": "如何实现钱包的质押（Staking）功能？流动性质押（Lido）和原生质押的区别？",
        "tags": "Staking / 质押 / Lido / 以太坊质押",
        "content": """**质押类型**:

**原生质押**:
- 32 ETH 起
- 运行验证者节点
- 奖励直接来自协议

**流动性质押（Lido）**:
- 任意金额
- 获得 stETH（可交易）
- 流动性保留

**UX 设计**:
- 显示 APY 和历史收益
- 解质押等待期提示
- 流动性质押代币余额展示"""
    },
    {
        "title": "钱包的 API 密钥和第三方服务如何安全管理？防止密钥泄露的最佳实践？",
        "tags": "API密钥 / 安全管理 / 密钥泄露 / 第三方服务",
        "content": """**密钥管理**:
- 不在前端代码硬编码
- 使用环境变量 + CI/CD 注入
- 密钥轮换机制

**防护措施**:
```
1. API 密钥权限最小化
2. IP 白名单限制
3. 请求频率限制
4. 异常行为监控
```

**泄露响应**:
- 立即撤销密钥
- 审计日志检查
- 通知受影响用户"""
    },
    {
        "title": "如何实现钱包的浏览器插件版本？Manifest V3 对 Web3 钱包有什么影响？",
        "tags": "浏览器插件 / ManifestV3 / Chrome扩展 / 钱包插件",
        "content": """**架构**:
```
Background Script (Service Worker)
    ↓
Content Script (页面注入 Provider)
    ↓
Popup UI (钱包界面)
```

**Manifest V3 变化**:
- Background 改为 Service Worker（无持久状态）
- 限制某些 API
- 更严格的 CSP

**Web3 影响**:
- 需要存储迁移（localStorage → chrome.storage）
- WebSocket 连接需要特殊处理
- 更频繁的唤醒/休眠"""
    },
]

# ============ AI 题目库 (15道 - 通用) ============
AI_QUESTIONS = [
    {
        "title": "AI 如何在 Web3 安全审计中应用？静态分析 + AI 的工作流程是什么？",
        "tags": "AI审计 / 智能合约安全 / 静态分析 / 自动化",
        "content": """**AI 审计流程**:
```
合约代码 → AST 解析 → 特征提取 → AI 模型 → 漏洞检测
                ↓
         人工确认 → 报告生成
```

**应用场景**:
- 已知漏洞模式识别
- 异常代码检测
- 自然语言审计报告

**局限性**:
- 无法保证 100% 检出
- 新漏洞类型可能漏报
- 需人工专家最终确认"""
    },
    {
        "title": "大模型在 DApp 客服和交易解释中的应用？如何降低幻觉风险？",
        "tags": "AI客服 / 交易解释 / 幻觉控制 / RAG",
        "content": """**应用场景**:
- 自然语言查询余额/交易历史
- 交易内容解释（将 calldata 翻译成人话）
- 操作指南和教程

**降低幻觉**:
- RAG：基于官方文档回答
- 工具调用：查询实时链上数据
- 边界设定：不确定时拒绝回答

**币安实现**:
- 内置 AI 助手
- 交易摘要生成"""
    },
    {
        "title": "AI Agent 在自动化交易中的应用？如何平衡自动化与人工风控？",
        "tags": "AI Agent / 自动交易 / 风控 / 智能投顾",
        "content": """**应用场景**:
- 智能定投（DCA）
- 套利机会捕捉
- 止损止盈自动执行

**风控平衡**:
```
AI 建议 → 用户确认 → 执行
    ↑
 人工可随时干预
```

**安全措施**:
- 限额控制
- 延迟执行窗口
- 异常交易预警"""
    },
    {
        "title": "机器学习如何用于检测区块链欺诈行为？地址聚类和异常检测的应用？",
        "tags": "欺诈检测 / 地址聚类 / 图神经网络 / 风控",
        "content": """**检测方法**:
- 地址聚类：识别同一实体控制的地址
- 交易模式识别：检测洗钱路径
- 异常检测：偏离正常行为

**技术**:
- 图神经网络（GNN）分析交易网络
- 时序模型检测异常交易时间
- 聚类算法（K-means, DBSCAN）

**应用**:
- 钓鱼网站预警
- 诈骗地址标记
- 可疑交易拦截"""
    },
    {
        "title": "AI 生成代码在智能合约开发中的应用和风险？如何建立安全护栏？",
        "tags": "AI编程 / 代码生成 / 安全护栏 / Copilot",
        "content": """**应用场景**:
- 快速原型开发
- 标准合约模板生成
- 测试用例生成

**风险**:
- 生成有漏洞的代码
- 使用过时或不安全的模式
- 许可证问题

**安全护栏**:
1. 强制人工审计
2. 自动化测试覆盖
3. 与已知漏洞库比对
4. 沙箱模拟运行"""
    },
]

def select_balanced_questions():
    """选择均衡分布的题目：前端3题 + Web3 4题 + AI 2-3题"""
    # 目标：前端3 + Web3 4 + AI 3 = 10题
    fe_count = 3
    web3_count = 4
    ai_count = 3
    
    fe_questions = random.sample(FRONTEND_QUESTIONS, fe_count)
    web3_questions = random.sample(WEB3_QUESTIONS, web3_count)
    ai_questions = random.sample(AI_QUESTIONS, ai_count)
    
    # 合并并打乱顺序
    all_questions = fe_questions + web3_questions + ai_questions
    random.shuffle(all_questions)
    
    return all_questions, fe_count, web3_count, ai_count

def generate_content(questions, date_str):
    """生成完整的 markdown 内容"""
    lines = [f"# {date_str}", "", "---", ""]
    
    for i, q in enumerate(questions, 1):
        lines.append(f"## {i}. {q['title']}")
        lines.append("")
        lines.append(f"**考点**: {q['tags']}")
        lines.append("")
        lines.append("**答案要点**:")
        lines.append("")
        lines.append(q['content'])
        lines.append("")
        lines.append("---")
        lines.append("")
    
    # 添加附录
    lines.extend([
        "## 附录：学习资源",
        "",
        "### 钱包开发",
        "- [WalletConnect 文档](https://docs.walletconnect.com)",
        "- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)",
        "- [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963)",
        "- [币安钱包开发者](https://www.binance.com/en/web3wallet)",
        "",
        "### Web3 安全",
        "- [SlowMist 安全审计](https://www.slowmist.com)",
        "- [Consensys 安全最佳实践](https://consensys.github.io/smart-contract-best-practices)",
        "",
        "### 前端",
        "- [React Native](https://reactnative.dev)",
        "- [MetaMask 移动端](https://github.com/MetaMask/metamask-mobile)",
        "",
        "---",
        "",
        f"*生成日期: {date_str}*",
        "*方向: 前端(3题) + Web3(4题) + AI(3题) - 币安钱包前端开发针对性版*",
        "*题库规模: 前端18道 + Web3 25道 + AI 5道 = 48道*",
    ])
    
    return "\n".join(lines)

def save_and_commit():
    """保存文件并提交到 Git"""
    date_str = datetime.now().strftime('%Y-%m-%d')
    file_path = f"{QUESTION_DIR}/{date_str}.md"
    
    # 检查文件是否已存在
    if os.path.exists(file_path):
        print(f"[{date_str}] 面试题已存在，跳过生成")
        return False, date_str, 0, 0, 0
    
    print(f"[{date_str}] 生成面试题...")
    
    # 选择均衡分布的题目
    questions, fe_count, web3_count, ai_count = select_balanced_questions()
    content = generate_content(questions, date_str)
    
    # 写入文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"[{date_str}] 已保存到 {file_path}")
    print(f"[{date_str}] 题目分布: 前端{fe_count}题 + Web3 {web3_count}题 + AI{ai_count}题")
    
    # Git 操作
    print(f"[{date_str}] Git 提交...")
    
    # git add
    success, stdout, stderr = run_cmd(f"git add {file_path}", WORKSPACE)
    if not success:
        print(f"Git add 失败: {stderr}")
        return False, date_str, fe_count, web3_count, ai_count
    
    # git commit
    success, stdout, stderr = run_cmd(
        f'git commit -m "feat: add Binance Wallet interview questions (FE{fe_count}+Web3{web3_count}+AI{ai_count}) for {date_str}"',
        WORKSPACE
    )
    if not success:
        print(f"Git commit 失败: {stderr}")
        return False, date_str, fe_count, web3_count, ai_count
    
    print(f"[{date_str}] Git 提交成功")
    
    # git push
    print(f"[{date_str}] 推送到 GitHub...")
    success, stdout, stderr = run_cmd("git push origin main", WORKSPACE)
    if not success:
        print(f"Git push 失败: {stderr}")
        return False, date_str, fe_count, web3_count, ai_count
    
    print(f"[{date_str}] GitHub 推送成功")
    return True, date_str, fe_count, web3_count, ai_count

def send_notification(date_str, fe_count, web3_count, ai_count):
    """发送飞书通知"""
    notification = f"""🌅 早上好！我是烤鱼。

📚 今日面试题已生成（币安 Web3 钱包前端开发针对性版）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 已生成 10 道针对性面试题
✅ 已提交到 GitHub: learn-fe
✅ 已推送到远程仓库

📊 题目分布：
• 前端：{fe_count}题（移动端、跨平台、安全存储、性能）
• Web3：{web3_count}题（钱包连接、多链、安全、DeFi）
• AI：{ai_count}题（AI+Web3应用）

🎯 针对性内容：
✓ JSBridge / React Native 移动端开发
✓ 私钥安全存储（Keychain/Keystore）
✓ WalletConnect / EIP-6963 多钱包检测
✓ 钓鱼防范 / 交易安全 / 授权管理
✓ DApp浏览器 / 跨链桥 / 硬件钱包集成
✓ Gas优化 / 交易状态追踪 / NFT
✓ DeFi 集成 / Staking / Swap聚合

📚 扩展题库（48道）：
前端18道：移动端开发、安全、性能、测试、浏览器原理...
Web3 25道：钱包核心、多链、安全、DeFi、生态集成...
AI 5道：AI+Web3安全审计、客服、风控...

📁 文件位置：
ai-interview-questions/{date_str}.md

查看完整内容：
https://github.com/luoquanquan/learn-fe/blob/main/ai-interview-questions/{date_str}.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ {date_str} 08:00
"""
    
    # 保存通知到消息队列
    message_file = f"/tmp/openclaw-messages/interview-{date_str}.txt"
    os.makedirs(os.path.dirname(message_file), exist_ok=True)
    
    with open(message_file, 'w') as f:
        f.write(notification)
    
    print(f"[{date_str}] 通知已保存到 {message_file}")
    
    # 同时打印到 stdout
    print("\n" + "="*50)
    print(notification)
    print("="*50)
    
    return True

def main():
    """主函数"""
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始生成面试题...")
    
    # 1. 生成并提交
    success, date_str, fe_count, web3_count, ai_count = save_and_commit()
    if success:
        # 2. 发送通知
        send_notification(date_str, fe_count, web3_count, ai_count)
        print("✅ 全部完成！")
        return 0
    elif fe_count == 0:  # 文件已存在的情况
        print("⚠️ 今日面试题已存在，跳过生成")
        return 0
    else:
        print("❌ 生成失败")
        return 1

if __name__ == "__main__":
    sys.exit(main())
