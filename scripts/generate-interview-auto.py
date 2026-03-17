#!/usr/bin/env python3

import os
import subprocess
import sys
import random
from datetime import datetime

WORKSPACE = "/home/ubuntu/.openclaw/workspace/learn-fe"
QUESTION_DIR = f"{WORKSPACE}/ai-generate/learn-docs"
KNOWLEDGE_PROFILE = f"{WORKSPACE}/ai-generate/knowledge-profile.md"
CONFIG_FILE = f"{WORKSPACE}/ai-generate/interview-config.md"

def load_interview_config():
    """加载面试题生成配置"""
    config = {
        "frontend_count": 3,
        "web3_count": 4,
        "ai_count": 3,
        "require_detailed_answer": True,
        "avoid_company_names": ["币安", "Binance", "MetaMask"],
        "focus_areas": {
            "frontend": ["移动端开发", "WebView通信", "性能优化", "TypeScript", "安全存储"],
            "web3": ["钱包连接标准", "私钥管理", "多链支持", "交易签名", "安全防护", "DeFi集成"],
            "ai": ["AI审计", "RAG应用", "AI Agent", "智能客服"]
        }
    }

    if os.path.exists(CONFIG_FILE):
        print(f"[Config] 读取配置文件: {CONFIG_FILE}")
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        # 解析题目数量
        if "前端：" in content:
            try:
                fe_line = [l for l in content.split('\n') if '前端：' in l and '题' in l][0]
                config["frontend_count"] = int(fe_line.split('前端：')[1].split('题')[0])
            except:
                pass

        if "Web3：" in content:
            try:
                web3_line = [l for l in content.split('\n') if 'Web3：' in l and '题' in l][0]
                config["web3_count"] = int(web3_line.split('Web3：')[1].split('题')[0])
            except:
                pass

        if "AI：" in content:
            try:
                ai_line = [l for l in content.split('\n') if 'AI：' in l and '题' in l][0]
                config["ai_count"] = int(ai_line.split('AI：')[1].split('题')[0])
            except:
                pass

        # 解析详细程度要求
        if "详细的技术实现代码" in content and "✅" in content.split("详细的技术实现代码")[0].split('\n')[-1]:
            config["require_detailed_answer"] = True

        # 解析避免公司名称
        if "避免特定公司名称" in content:
            config["avoid_company_names"] = ["币安", "Binance", "MetaMask", "Coinbase", "OKX"]

        print(f"[Config] 题目数量: 前端{config['frontend_count']} + Web3 {config['web3_count']} + AI{config['ai_count']}")
        print(f"[Config] 详细答案: {'是' if config['require_detailed_answer'] else '否'}")
    else:
        print(f"[Config] 配置文件不存在，使用默认配置")

    return config


def load_learning_profile():
    """加载学习档案，分析弱项领域"""
    weak_areas = []
    focus_topics = []

    if os.path.exists(KNOWLEDGE_PROFILE):
        with open(KNOWLEDGE_PROFILE, 'r', encoding='utf-8') as f:
            content = f.read()

            # 分析待提升领域
            if "Web3 安全" in content or "智能合约" in content:
                weak_areas.append("security")
                focus_topics.extend(["重入攻击", "权限管理", "审计"])
            if "AI" in content or "Agent" in content or "RAG" in content:
                weak_areas.append("ai")
                focus_topics.extend(["RAG", "Prompt工程", "Agent"])
            if "性能优化" in content or "浏览器原理" in content:
                weak_areas.append("performance")
                focus_topics.extend(["性能优化", "V8", "渲染"])

    return {
        "weak_areas": weak_areas,
        "focus_topics": focus_topics
    }


def get_personalized_distribution(profile):
    """根据学习档案调整题目分布"""
    # 默认分布：前端3 + Web3 4 + AI 3
    distribution = {
        "frontend": 3,
        "web3": 4,
        "ai": 3
    }

    weak_areas = profile.get("weak_areas", [])

    # 根据弱项调整分布
    if "security" in weak_areas:
        distribution["web3"] = 5  # 增加 Web3 安全题目
        distribution["frontend"] = 2
    elif "ai" in weak_areas:
        distribution["ai"] = 4  # 增加 AI 题目
        distribution["web3"] = 3
    elif "performance" in weak_areas:
        distribution["frontend"] = 4  # 增加前端深度题目
        distribution["ai"] = 2

    return distribution

def run_cmd(cmd, cwd=None):
    """执行命令并返回输出"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
    return result.returncode == 0, result.stdout, result.stderr

# ============ 前端题目库 (18道 - 针对钱包前端) ============
FRONTEND_QUESTIONS = [
    {
        "title": "Web3 钱包移动端 H5 如何与 Native App 通信？JSBridge 的实现原理是什么？",
        "tags": "JSBridge / 移动端 / 混合开发 / Web3钱包",
        "content": """**一、JSBridge 核心原理**

JSBridge 是 WebView 与 Native 之间双向通信的桥梁，核心机制包括：

**1. Native 调用 JS**
- iOS: `webView.evaluateJavaScript("jsCode")`
- Android: `webView.loadUrl("javascript:jsCode")`

**2. JS 调用 Native**
- URL Scheme: `window.location = "native://method?param=value"`
- Prompt 拦截: 安卓通过 `onJsPrompt` 拦截
- 注入全局对象: Native 直接向 window 注入方法

**二、完整通信流程示例**

```javascript
// 1. Native 注入桥接对象（App 启动时）
// iOS: WKUserScript 注入
// Android: addJavascriptInterface

// 2. H5 调用 Native 签名
const requestId = Date.now();
window.WalletBridge.postMessage(JSON.stringify({
  id: requestId,
  method: 'eth_signTransaction',
  params: [{ from, to, value, data, chainId }]
}));

// 3. Native 处理完成后回调
window.WalletBridge.callbacks[requestId] = (result) => {
  if (result.success) {
    console.log('签名成功:', result.signature);
  } else {
    console.error('签名失败:', result.error);
  }
  delete window.WalletBridge.callbacks[requestId];
};
```

**三、安全最佳实践**

1. **域名白名单验证**
```javascript
const ALLOWED_DOMAINS = ['app.example.com', 'dapp.example.com'];
if (!ALLOWED_DOMAINS.includes(currentDomain)) {
  throw new Error('Unauthorized domain');
}
```

2. **请求签名防篡改**
- 每个请求带时间戳和 nonce
- 敏感操作需用户二次确认

3. **HTTPS 强制**
- 禁止 HTTP 页面调用敏感接口
- Certificate Pinning 防中间人攻击

**四、常见坑点**

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 回调丢失 | 页面刷新/跳转 | 使用 sessionStorage 暂存待处理请求 |
| 时序问题 | Native 注入晚于 JS 执行 | 轮询检测 bridge 对象 |
| 内存泄漏 | 回调未清理 | 设置超时自动清理机制 |"""
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

**选型建议**:
- 已有React生态 → RN
- 高性能渲染需求 → Flutter
- 建议：核心链功能原生，UI层跨平台"""
    },
    {
        "title": "Web3 钱包的私钥如何安全存储？移动端 Keychain/Keystore 的使用最佳实践？",
        "tags": "安全存储 / Keychain / 私钥管理 / 钱包安全",
        "content": """**一、移动端密钥存储方案对比**

| 存储方式 | iOS | Android | 安全等级 | 适用场景 |
|----------|-----|---------|----------|----------|
| Keychain/Keystore | ✅ | ✅ | ⭐⭐⭐⭐⭐ | 私钥、助记词 |
| Secure Enclave | ✅ | ✅ (TEE) | ⭐⭐⭐⭐⭐ | 硬件级签名 |
| EncryptedSharedPreferences | ❌ | ✅ | ⭐⭐⭐⭐ | 配置信息 |
| AsyncStorage | ✅ | ✅ | ⭐⭐ | 禁止存储密钥 |

**二、iOS Keychain 最佳实践**

```typescript
import * as Keychain from 'react-native-keychain';

// 1. 存储私钥（带生物识别保护）
const storePrivateKey = async (privateKey: string) => {
  const encryptedKey = await encryptWithPassword(privateKey);

  await Keychain.setGenericPassword(
    'wallet_private_key',
    encryptedKey,
    {
      service: 'com.example.wallet',
      // 安全级别：首次解锁后可访问
      accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
      // 生物识别保护
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    }
  );
};

// 2. 读取私钥
const getPrivateKey = async (): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({
    service: 'com.example.wallet',
    authenticationPrompt: {
      title: '验证身份',
      subtitle: '访问您的钱包',
    },
  });

  if (credentials) {
    return await decryptWithPassword(credentials.password);
  }
  return null;
};

// 3. 删除私钥
const deletePrivateKey = async () => {
  await Keychain.resetGenericPassword({
    service: 'com.example.wallet',
  });
};
```

**三、Android Keystore 最佳实践**

```kotlin
class SecureStorage(context: Context) {
    private val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .setUserAuthenticationRequired(true) // 生物识别
        .build()

    private val encryptedPrefs = EncryptedSharedPreferences.create(
        context,
        "wallet_secure",
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    fun storePrivateKey(encryptedKey: String) {
        encryptedPrefs.edit().putString("private_key", encryptedKey).apply()
    }

    fun getPrivateKey(): String? {
        return encryptedPrefs.getString("private_key", null)
    }
}
```

**四、安全增强措施**

1. **内存安全**
```typescript
class SecureMemory {
  private key: string | null = null;

  loadKey() {
    // 使用时加载，用完立即清除
    this.key = await getPrivateKey();
    setTimeout(() => this.clear(), 30000); // 30秒超时
  }

  clear() {
    if (this.key) {
      // 覆盖内存（防止被读取）
      this.key = '0'.repeat(this.key.length);
      this.key = null;
    }
  }
}
```

2. **截屏/录屏保护**
```kotlin
// Android
window.setFlags(
    WindowManager.LayoutParams.FLAG_SECURE,
    WindowManager.LayoutParams.FLAG_SECURE
)

// iOS
override var prefersScreenCaptureDisabled: Bool { return true }
```

3. **根/越狱检测**
```typescript
import JailMonkey from 'jail-monkey';

if (JailMonkey.isJailBroken()) {
  Alert.alert('安全警告', '检测到设备已越狱/Root，请使用未越狱设备');
}
```

**五、常见攻击与防护**

| 攻击方式 | 风险 | 防护措施 |
|----------|------|----------|
| 键盘记录 | 密码泄露 | 使用系统安全键盘 |
| 屏幕录制 | 密钥暴露 | FLAG_SECURE |
| 备份窃取 | iCloud/Google 备份 | kSecAttrAccessibleThisDeviceOnly |
| 内存转储 | 运行时提取 | 及时清理、加密存储 |"""
    },
    {
        "title": "钱包 DApp 浏览器如何实现？如何处理多链切换和钱包注入？",
        "tags": "DApp浏览器 / WebView / 多链切换 / 钱包注入",
        "content": """**架构设计**:
```
DApp WebView
  ↓
注入 Provider (window.ethereum / window.walletProvider)
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
        "content": """**一、钱包性能瓶颈分析**

| 场景 | 瓶颈 | 影响 |
|------|------|------|
| 代币列表 | 大量 Token 渲染 | 卡顿、掉帧 |
| 交易历史 | 频繁 RPC 请求 | 慢、耗电 |
| 图片加载 | 大量图标下载 | 流量、内存 |
| 实时更新 | WebSocket 消息过多 | CPU 占用高 |

**二、代币列表优化方案**

**1. 虚拟列表（Virtual List）**
```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={tokens}
  renderItem={({ item }) => <TokenItem token={item} />}
  estimatedItemSize={64}
  getItemType={(item) => item.isNative ? 'native' : 'token'}
  // 优化：复用组件类型
  keyExtractor={(item) => item.address}
  // 只渲染屏幕内 + 缓冲区
  removeClippedSubviews={true}
/>
```

**2. 分层加载策略**
```typescript
const TokenList = () => {
  const [displayTokens, setDisplayTokens] = useState([]);

  useEffect(() => {
    // 第一优先级：主币 + 有余额代币
    const priorityTokens = tokens.filter(t =>
      t.isNative || parseFloat(t.balance) > 0
    );
    setDisplayTokens(priorityTokens);

    // 第二优先级：热门代币（延迟加载）
    setTimeout(() => {
      const popularTokens = tokens.filter(t =>
        t.isPopular && !priorityTokens.includes(t)
      );
      setDisplayTokens(prev => [...prev, ...popularTokens]);
    }, 100);

    // 第三优先级：其他代币（用户滚动时加载）
  }, [tokens]);
};
```

**3. 图片优化**
```typescript
// 使用 WebP 格式 + 渐进加载
<Image
  source={{
    uri: token.icon,
    // 优先使用 WebP
    headers: { Accept: 'image/webp,image/*' }
  }}
  // 占位图防止布局抖动
  defaultSource={require('./token-placeholder.png')}
  // 缓存策略
  cachePolicy="memory-disk"
  // 缩略图尺寸
  style={{ width: 40, height: 40 }}
/>
```

**三、交易历史优化**

**1. Cursor 分页加载**
```typescript
interface TransactionQuery {
  cursor?: string;  // 上次最后一条的 ID
  limit: number;    // 每页数量
}

const fetchTransactions = async (cursor?: string) => {
  const response = await api.get('/transactions', {
    params: { cursor, limit: 20 }
  });
  return {
    data: response.data,
    nextCursor: response.pagination.next_cursor,
    hasMore: response.pagination.has_more,
  };
};
```

**2. 本地缓存策略**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

class TransactionCache {
  private readonly KEY = 'tx_cache_';
  private readonly MAX_AGE = 5 * 60 * 1000; // 5分钟

  async get(address: string): Promise<Transaction[] | null> {
    const cached = await AsyncStorage.getItem(this.KEY + address);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > this.MAX_AGE) {
      return null; // 缓存过期
    }
    return data;
  }

  async set(address: string, data: Transaction[]) {
    await AsyncStorage.setItem(this.KEY + address, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  }

  // 增量更新
  async merge(address: string, newTxs: Transaction[]) {
    const existing = await this.get(address) || [];
    const merged = [...newTxs, ...existing].filter(
      (tx, index, self) =>
        index === self.findIndex(t => t.hash === tx.hash)
    );
    await this.set(address, merged);
  }
}
```

**3. 智能轮询策略**
```typescript
const useTransactionPolling = (pendingTxs: string[]) => {
  const [interval, setInterval] = useState(3000);

  useEffect(() => {
    if (pendingTxs.length === 0) return;

    const timer = setInterval(async () => {
      const statuses = await checkTxStatus(pendingTxs);

      // 动态调整轮询间隔
      const allConfirmed = statuses.every(s => s.confirmed);
      if (allConfirmed) {
        setInterval(30000); // 都确认了，降低频率
      } else {
        setInterval(prev => Math.min(prev * 1.5, 30000)); // 指数退避
      }
    }, interval);

    return () => clearInterval(timer);
  }, [pendingTxs, interval]);
};
```

**四、内存管理**
```typescript
// 大列表释放
useEffect(() => {
  return () => {
    // 清理图片缓存
    Image.clearMemoryCache?.();
    // 取消未完成的请求
    abortController.abort();
    // 清理临时数据
    setTransactions([]);
  };
}, []);
```

**五、性能监控指标**

| 指标 | 目标值 | 测量方式 |
|------|--------|----------|
| 首屏渲染 | < 1s | React DevTools Profiler |
| 滚动帧率 | > 55 FPS | Flipper Performance |
| 内存占用 | < 200 MB | Xcode/Android Profiler |
| 包体积 | < 50 MB | 构建产物分析 |"""
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

**实现方案对比**:
- 自建节点 WebSocket: 低延迟、高成本
- 第三方服务: Alchemy/Infura 提供 WebSocket 支持
- 多链统一抽象层: 封装不同链的差异
- 交易失败自动重试机制"""
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

**设计规范**:
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
        "title": "前端如何实现安全的 iframe 集成？Web3钱包如何嵌入第三方 DApp？",
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
- 主流交易所 WebSocket
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

**设计规范**:
- 20+ 语言支持
- 专业术语表统一
- RTL（阿拉伯语）适配"""
    },
    {
        "title": "Webpack、Vite、Rspack 等构建工具如何选型？各有什么优劣及适用场景？",
        "tags": "构建工具 / Webpack / Vite / Rspack / 工程化",
        "content": """**一、主流构建工具对比**

| 工具 | 开发启动 | 生产构建 | 生态 | 适用场景 |
|------|----------|----------|------|----------|
| **Webpack** | 慢（需编译） | 慢 | 最丰富 | 大型项目、需要复杂配置 |
| **Vite** | 极快（原生 ESM） | 快（Rollup） | 丰富 | 现代项目、快速原型 |
| **Rspack** | 快（Rust） | 快 | 兼容 Webpack | 大型项目、需要迁移 |
| **Turbopack** | 极快（Rust） | 开发中 | Next.js 专用 | Next.js 项目 |
| **esbuild** | 极快 | 快 | 较小 | 工具链、简单项目 |

**二、Vite 工作原理**

```
开发模式：
浏览器 ←── ESM 直接加载源码 ←── Vite 服务器拦截处理
              ↓
         按需编译（如 .tsx → 浏览器可执行的 JS）

生产模式：
源码 → Rollup 打包 → 代码分割 + 压缩 → 生产产物
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wallet: ['ethers', '@walletconnect/ethereum-provider'],
        },
      },
    },
    // 代码分割策略
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    // 预构建依赖
    include: ['ethers', '@walletconnect/ethereum-provider'],
  },
});
```

**三、Webpack 优化策略（OKX 大型项目经验）**

```javascript
// webpack.config.js
module.exports = {
  // 1. 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        // 钱包相关代码单独打包
        wallet: {
          test: /[\\\\/]src[\\\\/]wallet[\\\\/]/,
          name: 'wallet',
          chunks: 'all',
        },
      },
    },
  },
  
  // 2. 持久化缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  
  // 3. 并行处理
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: [
          {
            loader: 'thread-loader', // 多线程
            options: { workers: 4 },
          },
          'ts-loader',
        ],
      },
    ],
  },
  
  // 4. 分析产物
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};
```

**四、Rspack - Webpack 的 Rust 替代品**

```javascript
// rspack.config.js
module.exports = {
  // 与 Webpack 配置几乎兼容
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'builtin:swc-loader', // 内置 SWC，无需 babel
      },
    ],
  },
  // 性能提升 5-10 倍
};
```

**五、钱包项目构建优化实战**

```typescript
// 针对 Web3 钱包的特殊优化
export default defineConfig({
  build: {
    // 1. 分块策略（减少首屏加载）
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将大依赖单独打包
          if (id.includes('node_modules/ethers')) return 'ethers';
          if (id.includes('node_modules/@solana')) return 'solana';
          if (id.includes('node_modules/@walletconnect')) return 'walletconnect';
        },
      },
    },
    
    // 2. 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  
  // 3. 依赖预构建
  optimizeDeps: {
    include: [
      'ethers',
      '@walletconnect/ethereum-provider',
      '@solana/web3.js',
    ],
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
```

**六、选型建议**

| 场景 | 推荐工具 | 原因 |
|------|----------|------|
| 新项目、快速启动 | Vite | 开发体验好，配置简单 |
| 大型遗留项目 | Webpack → Rspack | 兼容性好，逐步迁移 |
| Next.js 项目 | Turbopack | 官方支持，性能最优 |
| 库开发 | Rollup / tsup | 产物干净，tree-shaking 友好 |"""
    },
    {
        "title": "XSS、CSRF、点击劫持等 Web 安全攻击如何防范？钱包场景有什么特殊考虑？",
        "tags": "Web安全 / XSS / CSRF / 点击劫持 / 安全防护",
        "content": """**一、XSS（跨站脚本攻击）**

**攻击方式**:
```html
<!-- 存储型 XSS -->
<div class=\"comment\">用户输入: <script>stealPrivateKey()</script></div>

<!-- DOM 型 XSS -->
<script>
const hash = location.hash.slice(1);
document.write(hash); // #<img src=x onerror=steal()>
</script>
```

**防范措施**:
```typescript
// 1. 输入过滤
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// 2. 输出编码
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    \"'\": '&#x27;',
  };
  return text.replace(/[&<>\"']/g, (c) => map[c]);
}

// 3. CSP（内容安全策略）
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-xxx'
const csp = `
default-src 'self';
script-src 'self' 'nonce-${nonce}';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
connect-src 'self' https://rpc.wallet.com;
frame-ancestors 'none';  // 防止点击劫持
`.replace(/\\n/g, ' ');

// 4. 钱包场景特殊防护
// 禁止内联脚本，只允许白名单域名加载脚本
// 防止恶意脚本劫持钱包 Provider
```

**二、CSRF（跨站请求伪造）**

**攻击方式**:
```html
<!-- 攻击者页面 -->
<form action=\"https://wallet.com/transfer\" method=\"POST\" id=\"csrf\">
  <input type=\"hidden\" name=\"to\" value=\"attacker\">
  <input type=\"hidden\" name=\"amount\" value=\"1000\">
</form>
<script>document.getElementById('csrf').submit()</script>
```

**防范措施**:
```typescript
// 1. SameSite Cookie
Set-Cookie: session=xxx; SameSite=Strict; Secure; HttpOnly

// 2. CSRF Token
const csrfToken = crypto.randomUUID();
localStorage.setItem('csrf_token', csrfToken);

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,  // 后端校验
  },
});

// 3. 钱包场景：敏感操作二次确认
const confirmTransaction = async (tx: Transaction) => {
  // 必须用户主动点击确认，不能自动执行
  const confirmed = await showConfirmDialog(tx);
  if (!confirmed) return;
  
  // 双重验证
  if (!verifyOrigin(window.location.origin)) {
    throw new Error('Invalid origin');
  }
};
```

**三、点击劫持（Clickjacking）**

**攻击方式**:
```html
<!-- 攻击者页面 -->
<style>
iframe {
  position: absolute;
  top: -100px;
  left: -100px;
  opacity: 0.001;
}
button {
  position: absolute;
  top: 200px;
  left: 100px;
}
</style>
<button>点击领取空投</button>
<iframe src=\"https://wallet.com/confirm\" width=\"500\" height=\"500\"></iframe>
```

**防范措施**:
```typescript
// 1. X-Frame-Options
X-Frame-Options: DENY  // 完全禁止嵌入
// 或
X-Frame-Options: SAMEORIGIN  // 只允许同域

// 2. CSP frame-ancestors
Content-Security-Policy: frame-ancestors 'none';
// 或
Content-Security-Policy: frame-ancestors 'self' https://trusted-parent.com;

// 3. JavaScript 检测
if (window.top !== window.self) {
  // 被嵌入 iframe，阻止敏感操作
  document.body.innerHTML = '<h1>请在独立窗口中使用</h1>';
}
```

**四、钱包场景特殊安全风险**

```typescript
// 1. Provider 劫持防护
const originalProvider = window.ethereum;

Object.defineProperty(window, 'ethereum', {
  get() {
    // 检测是否被恶意替换
    if (currentProvider !== originalProvider) {
      console.warn('Provider may have been tampered with');
    }
    return currentProvider;
  },
  set(value) {
    // 只允许钱包插件设置
    if (isValidWalletProvider(value)) {
      currentProvider = value;
    }
  },
});

// 2. 域名白名单
const ALLOWED_DOMAINS = [
  'wallet.example.com',
  'dapp.example.com',
];

const verifyDomain = () => {
  if (!ALLOWED_DOMAINS.includes(window.location.hostname)) {
    disableSensitiveOperations();
  }
};

// 3. 交易签名防篡改
const signTransaction = async (tx: Transaction) => {
  // 显示交易详情给用户确认
  const displayedTx = {
    to: tx.to,
    value: formatEther(tx.value),
    data: decodeData(tx.data),
  };
  
  // 用户确认后才能签名
  if (!await userConfirm(displayedTx)) {
    throw new Error('User rejected');
  }
  
  return wallet.sign(tx);
};
```

**五、安全测试清单**

| 检查项 | 方法 |
|--------|------|
| XSS 防护 | 输入 `<script>alert(1)</script>` 测试 |
| CSRF 防护 | 检查敏感接口是否验证 Token |
| 点击劫持 | 尝试用 iframe 嵌入页面 |
| CSP 配置 | 使用 CSP Evaluator 检测 |
| HTTPS | 所有资源强制 HTTPS |
| 私钥存储 | 确认不在内存中长时间保留 |"""
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
  detail: { info: { name: 'Example Wallet', icon, rdns }, provider }
}));

// DApp 监听
window.addEventListener('eip6963:announceProvider', (e) => {
  wallets.push(e.detail); // 显示钱包列表供用户选择
});
```

**实现参考**: 同时支持两种标准，兼容新旧 DApp"""
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

**集成方案**: 支持 WalletConnect，方便连接桌面 DApp"""
    },
    {
        "title": "如何防范钱包常见的钓鱼攻击？假冒 DApp、假代币、签名钓鱼的识别方法？",
        "tags": "安全 / 钓鱼攻击 / 防骗 / Web3安全",
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

**Web3安全中心**:
- 实时黑名单更新
- 社区举报机制
- AI 风险地址检测"""
    },
    {
        "title": "以太坊和 BSC 的 RPC 调用有什么区别？钱包如何统一多链交互接口？",
        "tags": "多链支持 / EVM兼容 / RPC差异 / BSC链",
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

**BSC优势**: BSC 作为主力链，深度优化"""
    },
    {
        "title": "ERC-20、ERC-721、ERC-1155 标准的核心差异是什么？各自解决了什么问题？",
        "tags": "ERC标准 / ERC20 / ERC721 / ERC1155 / 代币标准",
        "content": """**一、ERC-20（同质化代币标准）**

**解决的问题**：标准化可替代代币的发行和流通

```solidity
// 核心接口
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

**前端交互**:
```typescript
// 获取代币余额
const tokenContract = new Contract(tokenAddress, ERC20_ABI, provider);
const balance = await tokenContract.balanceOf(userAddress);

// 授权（Approve）
const approveTx = await tokenContract.approve(spenderAddress, amount);

// 常见陷阱：无限授权
const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
// 风险：授权恶意合约后，对方可以转走全部代币
```

**二、ERC-721（非同质化代币，NFT）**

**解决的问题**：唯一性资产的所有权追踪和转移

```solidity
// 核心接口
interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
}
```

**与 ERC-20 的关键差异**:
| 特性 | ERC-20 | ERC-721 |
|------|--------|---------|
| 同质化 | 是（可分割、可互换） | 否（唯一不可分割） |
| 转账参数 | `amount` | `tokenId` |
| 授权方式 | 按额度授权 | 单token授权或全授权 |
| 使用场景 | 货币、积分 | 数字藏品、游戏道具 |

**三、ERC-1155（多代币标准）**

**解决的问题**：一个合约管理多种代币，支持同质化和非同质化混合

```solidity
// 核心接口
interface IERC1155 {
    // 批量查询余额
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) 
        external view returns (uint256[] memory);
    
    // 批量转账
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;
    
    // 批量授权
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address account, address operator) external view returns (bool);
}
```

**优势对比**:
```
发行 10000 个 NFT：
- ERC-721：需要 10000 个合约调用，Gas 极高
- ERC-1155：一个合约，批量铸造，Gas 极低

游戏场景（金币+装备+皮肤）：
- ERC-20 + ERC-721：需要多个合约
- ERC-1155：一个合约管理所有资产
```

**四、钱包开发中的处理差异**

```typescript
// ERC-20 转账
const transferERC20 = async (token: string, to: string, amount: bigint) => {
  const contract = new Contract(token, ERC20_ABI, signer);
  return await contract.transfer(to, amount);
};

// ERC-721 转账（注意使用 safeTransferFrom）
const transferNFT = async (nft: string, to: string, tokenId: string) => {
  const contract = new Contract(nft, ERC721_ABI, signer);
  // 必须使用 safeTransferFrom，确保接收方能处理 NFT
  return await contract['safeTransferFrom(address,address,uint256)'](
    await signer.getAddress(),
    to,
    tokenId
  );
};

// ERC-1155 批量转账
const batchTransfer = async (
  token: string,
  to: string,
  ids: string[],
  amounts: string[]
) => {
  const contract = new Contract(token, ERC1155_ABI, signer);
  return await contract.safeBatchTransferFrom(
    await signer.getAddress(),
    to,
    ids,
    amounts,
    '0x' // data
  );
};
```

**五、安全注意事项**

| 标准 | 常见风险 |
|------|----------|
| ERC-20 | 假代币（同名同symbol）、无限授权 |
| ERC-721 | 伪造NFT、钓鱼空投 |
| ERC-1155 | 批量转账参数错误、重入攻击 |"""
    },
    {
        "title": "ERC-2612 Permit 和 EIP-7702 委托授权有什么创新？如何改变用户交互体验？",
        "tags": "ERC2612 / EIP7702 / Permit / 委托授权 / Gasless",
        "content": """**一、传统授权的问题**

```
用户想要使用 DEX：
1. 发送 Approve 交易（花费 Gas）
2. 等待交易确认
3. 发送 Swap 交易

痛点：需要两笔交易，两笔 Gas，两次确认
```

**二、ERC-2612 Permit（免 Gas 授权）**

**核心创新**：用签名代替链上交易进行授权

```solidity
// ERC-2612 新增接口
function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
) external;

// 保存 nonce 防止重放
function nonces(address owner) external view returns (uint256);

// EIP-712 域分隔符
function DOMAIN_SEPARATOR() external view returns (bytes32);
```

**前端实现**:
```typescript
// 1. 构造 Permit 签名数据
const permitData = {
  primaryType: 'Permit',
  domain: {
    name: tokenName,
    version: '1',
    chainId: 1,
    verifyingContract: tokenAddress,
  },
  message: {
    owner: userAddress,
    spender: dexAddress,
    value: amount,
    nonce: await tokenContract.nonces(userAddress),
    deadline: Math.floor(Date.now() / 1000) + 3600, // 1小时过期
  },
};

// 2. 用户签名（离线，无 Gas）
const signature = await signer.signTypedData(
  permitData.domain,
  { Permit: [ /* types */ ] },
  permitData.message
);
const { v, r, s } = ethers.Signature.from(signature);

// 3. DEX 代为提交 permit 交易（DEX 付 Gas）
await dexContract.swapWithPermit(
  tokenAddress,
  amount,
  deadline,
  v, r, s,  // 用户的授权签名
  // ... swap 参数
);
```

**用户体验提升**:
- ✅ 无需先 Approve 再操作，一笔完成
- ✅ 新用户无需持有 ETH 也能授权（ relayer 代付）
- ✅ 授权有过期时间，更安全

**三、EIP-7702 委托授权（更彻底的创新）**

**核心概念**：EOA 临时获得智能合约的能力

```
传统模式：
用户 → EOA签名 → 直接执行

EIP-7702 模式：
用户 → 签名授权 → EOA临时变成合约 → 执行合约逻辑 → 恢复EOA
```

**应用场景**:
```typescript
// 场景1：批量操作（多笔交易合并为一笔）
const auth = {
  chainId: 1,
  nonce: await wallet.getNonce(),
  address: batchContractAddress, // 授权给批量执行合约
};

// 一次签名，批量执行多笔转账
const batchCall = [
  { to: tokenA, data: transferToAlice },
  { to: tokenB, data: transferToBob },
  { to: nft, data: transferToCharlie },
];
```

**四、Permit2（Uniswap 的优化方案）**

Permit2 将 Permit 推广到所有代币（包括非 ERC-2612）：

```typescript
// 1. 首次使用：授权 Permit2 合约（一次性）
await tokenContract.approve(permit2Address, MaxUint256);

// 2. 后续所有操作都使用 Permit2 签名（无需再发 Approve）
const permit2Data = {
  details: {
    token: tokenAddress,
    amount: amount,
    expiration: Math.floor(Date.now() / 1000) + 86400,
    nonce: 0,
  },
  spender: dexAddress,
  sigDeadline: Math.floor(Date.now() / 1000) + 3600,
};

const signature = await signTypedData(permit2Data);

// 3. DEX 调用 Permit2 执行转账
dexContract.swapWithPermit2(permit2Data, signature);
```

**优势**：
- 支持所有 ERC-20（包括 USDT 等没有 Permit 的代币）
- 统一的授权管理界面
- 可以批量撤销授权

**五、钱包端安全提示设计**

```typescript
const PermitWarning = ({ permit }: { permit: PermitData }) => (
  <Alert type={permit.value === MaxUint256 ? 'error' : 'warning'}>
    <h3>⚠️ Permit 授权风险</h3>
    <p>
      您正在通过签名授权 {truncateAddress(permit.spender)} 
      {permit.value === MaxUint256 ? '无限额' : formatAmount(permit.value)} 
      使用您的 {tokenSymbol}
    </p>
    <p>过期时间: {formatDate(permit.deadline)}</p>
    <p>签名即授权，无需 Gas，但风险与 Approve 相同</p>
  </Alert>
);
```

**六、对比总结**

| 方案 | 需 Gas | 适用代币 | 过期时间 | 批量操作 |
|------|--------|----------|----------|----------|
| 传统 Approve | 是 | 所有 | 无 | 否 |
| ERC-2612 Permit | 否 | 支持代币 | 有 | 否 |
| Permit2 | 否 | 所有 | 有 | 否 |
| EIP-7702 | 否 | 所有 | 单次 | 是 |"""
    },
    {
        "title": "硬件钱包 Ledger/Trezor/OneKey/Keystone 的统一接入协议如何设计？",
        "tags": "硬件钱包 / Ledger / Trezor / 统一接入 / 协议设计",
        "content": """**一、硬件钱包接入架构**

基于 OKX 硬件钱包接入经验，需要统一四种主流硬件钱包的接入：

| 硬件钱包 | 连接方式 | 通信协议 | 特点 |
|----------|----------|----------|------|
| Ledger | USB HID / Bluetooth | APDU | 最主流，固件更新频繁 |
| Trezor | USB / Bridge | Protocol Buffers | 开源，协议清晰 |
| OneKey | USB HID / Bluetooth | 类APDU | 国产，性价比高 |
| Keystone | QR Code / USB | 自定义协议 |  air-gapped，最安全 |

**二、统一抽象层设计**

```typescript
// 统一硬件钱包接口
interface HardwareWallet {
  readonly type: HardwareWalletType;
  readonly name: string;
  
  // 连接管理
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  
  // 账户管理
  getPublicKey(path: string): Promise<Uint8Array>;
  getAddress(path: string, chainId: number): Promise<string>;
  
  // 签名
  signTransaction(path: string, tx: Transaction): Promise<Signature>;
  signMessage(path: string, message: string): Promise<Signature>;
  
  // 固件信息
  getVersion(): Promise<string>;
  checkUpdate(): Promise<boolean>;
}

// 抽象基类实现公共逻辑
abstract class BaseHardwareWallet implements HardwareWallet {
  protected transport: Transport | null = null;
  protected app: EthApp | SolApp | null = null;
  
  abstract get type(): HardwareWalletType;
  
  async connect(): Promise<void> {
    this.transport = await this.createTransport();
    this.app = await this.createApp(this.transport);
    await this.verifyApp();
  }
  
  protected abstract createTransport(): Promise<Transport>;
  protected abstract createApp(transport: Transport): Promise<App>;
  protected abstract verifyApp(): Promise<void>;
}
```

**三、Ledger 接入实现**

```typescript
class LedgerWallet extends BaseHardwareWallet {
  get type() { return 'ledger'; }
  
  protected async createTransport(): Promise<Transport> {
    // 优先尝试 WebHID，降级到 WebUSB
    if (await TransportWebHID.isSupported()) {
      return await TransportWebHID.create();
    }
    return await TransportWebUSB.create();
  }
  
  protected async createApp(transport: Transport): Promise<EthApp> {
    return new EthApp(transport);
  }
  
  async signTransaction(path: string, tx: Transaction): Promise<Signature> {
    const { r, s, v } = await this.app!.signTransaction(
      path,
      tx.toSerializedHex(),
      null  // 不解析 ERC-20（我们在上层处理）
    );
    return { r, s, v };
  }
}
```

**四、Keystone QR Code 特殊处理**

```typescript
class KeystoneWallet implements HardwareWallet {
  get type() { return 'keystone'; }
  
  // 二维码通信
  async signTransaction(path: string, tx: Transaction): Promise<Signature> {
    // 1. 编码待签数据为二维码
    const qrData = this.encodeTransaction(tx, path);
    this.displayQRCode(qrData);
    
    // 2. 等待用户扫描 Keystone 显示的签名二维码
    const signatureQR = await this.scanSignatureQR();
    
    // 3. 解析签名
    return this.decodeSignature(signatureQR);
  }
  
  private encodeTransaction(tx: Transaction, path: string): QRData {
    // UR 标准编码
    return {
      type: 'eth-sign-request',
      data: encodeUR({
        signData: tx.toSerializedHex(),
        derivationPath: path,
        chainId: tx.chainId,
      }),
    };
  }
}
```

**五、固件升级适配策略**

```typescript
class FirmwareManager {
  // 检查固件版本兼容性
  async checkCompatibility(wallet: HardwareWallet, minVersion: string): Promise<boolean> {
    const currentVersion = await wallet.getVersion();
    return compareVersion(currentVersion, minVersion) >= 0;
  }
  
  // 破坏性变更适配
  async handleBreakingChanges(wallet: HardwareWallet): Promise<void> {
    const version = await wallet.getVersion();
    
    // Ledger 2.0.0+ 修改了签名返回格式
    if (wallet.type === 'ledger' && compareVersion(version, '2.0.0') >= 0) {
      wallet.setLegacyMode(false);
    }
  }
}
```

**六、错误处理与用户体验**

```typescript
enum HardwareError {
  DEVICE_LOCKED = '设备已锁定，请解锁',
  APP_NOT_OPEN = '请在设备上打开对应 App',
  USER_REJECTED = '用户取消操作',
  CONNECTION_LOST = '连接已断开，请重新连接',
  FIRMWARE_OUTDATED = '固件版本过旧，请升级',
}

// 统一的错误提示
const handleHardwareError = (error: Error): string => {
  if (error.message.includes('0x6a82')) {
    return HardwareError.APP_NOT_OPEN;
  }
  if (error.message.includes('0x6985')) {
    return HardwareError.USER_REJECTED;
  }
  return error.message;
};
```"""
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

**主流方案**:
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

**设计建议**:
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

**主流方案**: 提供快速通道（自有流动性）"""
    },
    {
        "title": "MPC（多方计算）钱包和智能合约钱包各有什么优劣？Web3钱包采用什么方案？",
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

**BSC**: 多方案支持，根据用户场景推荐"""
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

**NFT市场**: 集成自有 NFT 市场"""
    },
    {
        "title": "DeFi 收益聚合器（如 Venus、PancakeSwap）如何在钱包中安全集成？",
        "tags": "DeFi / 收益聚合 / PancakeSwap / BSC生态",
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

4. **BSC生态**
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
        "title": "多链钱包的地址派生如何管理？HD 钱包（BIP-32/44）在Web3钱包中的应用？",
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

**实现参考**:
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
| BUSD | ERC20 | 官方发行 |

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
- 平台自有风控系统

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
- 官方列表

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

**集成方案**:
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
    {
        "title": "如何在 Chrome Extension 中实现钱包账户管理的多层级架构？",
        "tags": "Chrome扩展 / 账户管理 / 架构设计 / Web3钱包",
        "content": """**一、账户管理核心架构**

基于 OKX Web3 Wallet 2.0 重构经验，账户管理需要支持：
- 多钱包（HD钱包、硬件钱包、私钥导入）
- 多链（每个钱包在不同链上的地址）
- 多账户（每个链可以有多个账户）

**二、数据模型设计**
```typescript
// 三层级架构
interface Wallet {
  id: string;                    // 钱包唯一ID
  type: 'hd' | 'hardware' | 'privateKey' | 'hardware_ledger' | 'hardware_onekey';
  name: string;
  accounts: Account[];           // 该钱包下的所有账户
}

interface Account {
  id: string;
  index: number;                 // HD派生索引
  addresses: Record<ChainId, Address>;  // 各链地址映射
}

// 统一地址簿管理
interface AddressBook {
  [walletId: string]: {
    [chainId: number]: {
      address: string;
      name?: string;
      isFavorite: boolean;
    }[];
  };
}
```

**三、关键实现要点**

1. **按系导入地址簿**
```typescript
// 支持按钱包类型批量导入
const importAddressBook = async (walletType: WalletType, addresses: ImportAddress[]) => {
  const wallet = await walletManager.getWalletByType(walletType);
  
  // 按链分组
  const groupedByChain = groupBy(addresses, 'chainId');
  
  for (const [chainId, chainAddresses] of Object.entries(groupedByChain)) {
    await addressBook.addAddresses(wallet.id, Number(chainId), chainAddresses);
  }
};
```

2. **地址派生管理**
```typescript
// HD钱包派生路径管理
const DERIVATION_PATHS: Record<ChainType, string> = {
  evm: "m/44'/60'/0'/0/{index}",
  bitcoin: "m/44'/0'/0'/0/{index}",
  solana: "m/44'/501'/0'/{index}",
};

class HDWalletManager {
  async deriveAddress(walletId: string, chainId: number, index: number): Promise<string> {
    const wallet = await this.getWallet(walletId);
    const chainType = getChainType(chainId);
    const path = DERIVATION_PATHS[chainType].replace('{index}', String(index));
    
    return await this.derivePath(wallet.mnemonic, path);
  }
}
```

3. **账户切换状态管理**
```typescript
// Redux Store 设计
interface WalletState {
  currentWalletId: string | null;
  currentAccountIndex: number;
  currentChainId: number;
  wallets: Wallet[];
  // 派生状态
  activeAddress: string;  // 当前选中的地址
}

// 切换账户时自动更新地址
const switchAccount = createAsyncThunk(
  'wallet/switchAccount',
  async ({ walletId, accountIndex, chainId }: SwitchPayload) => {
    const address = await walletService.getAddress(walletId, chainId, accountIndex);
    return { walletId, accountIndex, chainId, address };
  }
);
```

**四、性能优化**
- 地址派生结果缓存（避免重复计算）
- 按需加载（只加载当前选中钱包的详细信息）
- 批量操作合并（减少状态更新次数）

**五、安全考虑**
- 助记词/私钥加密存储
- 敏感操作需要用户确认
- 地址校验防止误操作"""
    },
    {
        "title": "硬件钱包 Ledger/Trezor/OneKey/Keystone 的统一接入协议如何设计？",
        "tags": "硬件钱包 / Ledger / Trezor / 统一接入 / 协议设计",
        "content": """**一、硬件钱包接入架构**

基于 OKX 硬件钱包接入经验，需要统一四种主流硬件钱包的接入：

| 硬件钱包 | 连接方式 | 通信协议 | 特点 |
|----------|----------|----------|------|
| Ledger | USB HID / Bluetooth | APDU | 最主流，固件更新频繁 |
| Trezor | USB / Bridge | Protocol Buffers | 开源，协议清晰 |
| OneKey | USB HID / Bluetooth | 类APDU | 国产，性价比高 |
| Keystone | QR Code / USB | 自定义协议 |  air-gapped，最安全 |

**二、统一抽象层设计**

```typescript
// 统一硬件钱包接口
interface HardwareWallet {
  readonly type: HardwareWalletType;
  readonly name: string;
  
  // 连接管理
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  
  // 账户管理
  getPublicKey(path: string): Promise<Uint8Array>;
  getAddress(path: string, chainId: number): Promise<string>;
  
  // 签名
  signTransaction(path: string, tx: Transaction): Promise<Signature>;
  signMessage(path: string, message: string): Promise<Signature>;
  
  // 固件信息
  getVersion(): Promise<string>;
  checkUpdate(): Promise<boolean>;
}

// 抽象基类实现公共逻辑
abstract class BaseHardwareWallet implements HardwareWallet {
  protected transport: Transport | null = null;
  protected app: EthApp | SolApp | null = null;
  
  abstract get type(): HardwareWalletType;
  
  async connect(): Promise<void> {
    this.transport = await this.createTransport();
    this.app = await this.createApp(this.transport);
    await this.verifyApp();
  }
  
  protected abstract createTransport(): Promise<Transport>;
  protected abstract createApp(transport: Transport): Promise<App>;
  protected abstract verifyApp(): Promise<void>;
}
```

**三、Ledger 接入实现**

```typescript
class LedgerWallet extends BaseHardwareWallet {
  get type() { return 'ledger'; }
  
  protected async createTransport(): Promise<Transport> {
    // 优先尝试 WebHID，降级到 WebUSB
    if (await TransportWebHID.isSupported()) {
      return await TransportWebHID.create();
    }
    return await TransportWebUSB.create();
  }
  
  protected async createApp(transport: Transport): Promise<EthApp> {
    return new EthApp(transport);
  }
  
  async signTransaction(path: string, tx: Transaction): Promise<Signature> {
    const { r, s, v } = await this.app!.signTransaction(
      path,
      tx.toSerializedHex(),
      null  // 不解析 ERC-20（我们在上层处理）
    );
    return { r, s, v };
  }
}
```

**四、Keystone QR Code 特殊处理**

```typescript
class KeystoneWallet implements HardwareWallet {
  get type() { return 'keystone'; }
  
  // 二维码通信
  async signTransaction(path: string, tx: Transaction): Promise<Signature> {
    // 1. 编码待签数据为二维码
    const qrData = this.encodeTransaction(tx, path);
    this.displayQRCode(qrData);
    
    // 2. 等待用户扫描 Keystone 显示的签名二维码
    const signatureQR = await this.scanSignatureQR();
    
    // 3. 解析签名
    return this.decodeSignature(signatureQR);
  }
  
  private encodeTransaction(tx: Transaction, path: string): QRData {
    // UR 标准编码
    return {
      type: 'eth-sign-request',
      data: encodeUR({
        signData: tx.toSerializedHex(),
        derivationPath: path,
        chainId: tx.chainId,
      }),
    };
  }
}
```

**五、固件升级适配策略**

```typescript
class FirmwareManager {
  // 检查固件版本兼容性
  async checkCompatibility(wallet: HardwareWallet, minVersion: string): Promise<boolean> {
    const currentVersion = await wallet.getVersion();
    return compareVersion(currentVersion, minVersion) >= 0;
  }
  
  // 破坏性变更适配
  async handleBreakingChanges(wallet: HardwareWallet): Promise<void> {
    const version = await wallet.getVersion();
    
    // Ledger 2.0.0+ 修改了签名返回格式
    if (wallet.type === 'ledger' && compareVersion(version, '2.0.0') >= 0) {
      wallet.setLegacyMode(false);
    }
  }
}
```

**六、错误处理与用户体验**

```typescript
enum HardwareError {
  DEVICE_LOCKED = '设备已锁定，请解锁',
  APP_NOT_OPEN = '请在设备上打开对应 App',
  USER_REJECTED = '用户取消操作',
  CONNECTION_LOST = '连接已断开，请重新连接',
  FIRMWARE_OUTDATED = '固件版本过旧，请升级',
}

// 统一的错误提示
const handleHardwareError = (error: Error): string => {
  if (error.message.includes('0x6a82')) {
    return HardwareError.APP_NOT_OPEN;
  }
  if (error.message.includes('0x6985')) {
    return HardwareError.USER_REJECTED;
  }
  return error.message;
};
```"""
    },
    {
        "title": "EIP-7702 和 EIP-4337 账户抽象如何改变钱包交互模式？",
        "tags": "EIP-7702 / EIP-4337 / 账户抽象 / AA钱包",
        "content": """**一、传统 EOA 钱包的局限**

```
传统模式:
用户 → EOA私钥签名 → 直接提交交易 → 链上执行

问题:
- 私钥丢失 = 资产丢失
- 每笔交易都需要原生代币支付 Gas
- 无法批量操作
- 无法自定义验证逻辑
```

**二、EIP-4337 账户抽象（Account Abstraction）**

```
AA 模式:
用户 → 签名 UserOperation → Bundler → EntryPoint → 链上执行
         ↓
    验证逻辑由合约定义（可以不验证私钥）
```

核心组件：
1. **Smart Contract Wallet**：智能合约作为账户
2. **EntryPoint**：统一的入口合约
3. **Bundler**：收集并提交 UserOperation
4. **Paymaster**：代付 Gas

```solidity
// 简化版智能合约钱包
contract SmartWallet {
    address public owner;
    
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        // 自定义验证：可以是私钥、多签、社交恢复等
        require(owner == recover(userOpHash, userOp.signature));
        return 0; // 验证通过
    }
    
    function execute(address target, uint256 value, bytes calldata data) external {
        // 执行交易
        (bool success, ) = target.call{value: value}(data);
        require(success);
    }
}
```

**三、EIP-7702 委托授权（Set Code for EOA）**

EIP-7702 是 Prague 升级的一部分，允许 EOA 临时委托代码给合约：

```
EIP-7702 流程:
1. EOA 签名授权："我允许合约 X 代表我执行"
2. 交易中附带 authorizationList
3. 链上临时将 EOA 的 code 设置为合约代码
4. 交易执行时，EOA 像合约一样运行
5. 交易结束后，EOA 恢复为普通 EOA
```

```typescript
// EIP-7702 授权签名
const authorization = {
  chainId: 1,
  nonce: await wallet.getNonce(),
  address: '0x...', // 被授权的合约地址
};

const signature = await wallet.signAuthorization(authorization);

// 提交交易时附带授权
const tx = {
  to: '0x...',
  data: '0x...',
  authorizationList: [{
    ...authorization,
    yParity: signature.v,
    r: signature.r,
    s: signature.s,
  }],
};
```

**四、钱包端实现要点**

1. **UserOperation 构造**
```typescript
interface UserOperation {
  sender: string;           // 智能合约钱包地址
  nonce: bigint;
  initCode: string;         // 首次部署时使用
  callData: string;         // 实际执行的数据
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymasterAndData: string; // Paymaster 数据
  signature: string;
}

// 构造批量交易
const buildBatchUserOp = (calls: Call[]): string => {
  return encodeFunctionData({
    abi: SMART_WALLET_ABI,
    functionName: 'executeBatch',
    args: [calls],
  });
};
```

2. **Bundler 交互**
```typescript
class BundlerClient {
  async sendUserOperation(userOp: UserOperation): Promise<string> {
    // 估算 Gas
    const gasEstimate = await this.estimateUserOperationGas(userOp);
    userOp.callGasLimit = gasEstimate.callGasLimit;
    
    // 提交到 Bundler
    return await this.rpc.call('eth_sendUserOperation', [userOp, ENTRY_POINT_ADDRESS]);
  }
  
  async getUserOperationReceipt(userOpHash: string): Promise<Receipt> {
    return await this.rpc.call('eth_getUserOperationReceipt', [userOpHash]);
  }
}
```

3. **Paymaster 集成**
```typescript
// 使用 Paymaster 代付 Gas
const usePaymaster = async (userOp: UserOperation, paymasterUrl: string) => {
  const paymasterClient = new PaymasterClient(paymasterUrl);
  
  // 获取 Paymaster 数据和签名
  const paymasterData = await paymasterClient.sponsorUserOperation(userOp);
  
  userOp.paymasterAndData = paymasterData;
  
  // 重新签名（包含 Paymaster 数据）
  userOp.signature = await signUserOp(userOp);
  
  return userOp;
};
```

**五、EIP-7702 vs EIP-4337 对比**

| 特性 | EIP-4337 | EIP-7702 |
|------|----------|----------|
| 账户类型 | 智能合约钱包 | EOA 临时委托 |
| Gas 成本 | 较高（合约部署） | 较低（无部署） |
| 兼容性 | 需要新基础设施 | 兼容现有 EOA |
| 灵活性 | 高（完全自定义） | 中（临时委托） |
| 恢复机制 | 合约内实现 | 需要配合 4337 |

**六、安全考虑**

1. **授权风险**
- EIP-7702 授权是链上永久的，需要明确提示用户
- 授权给恶意合约可能导致资产被盗

```typescript
// 危险检测
const checkAuthorizationRisk = (contractAddress: string): RiskLevel => {
  if (isKnownMaliciousContract(contractAddress)) {
    return 'CRITICAL';
  }
  if (!isVerifiedContract(contractAddress)) {
    return 'HIGH';
  }
  return 'LOW';
};
```

2. **签名确认**
- 必须清晰展示授权内容
- 区分普通交易和授权操作

```typescript
// 授权确认页面
const AuthorizationConfirm = ({ auth }: { auth: Authorization }) => (
  <Alert type="warning">
    <h3>⚠️ 授权风险提示</h3>
    <p>您正在授权以下合约代表您的账户执行操作：</p>
    <AddressDisplay address={auth.address} />
    <p>此授权在链上永久有效，请确保您信任该合约。</p>
  </Alert>
);
```"""
    },
    {
        "title": "多链 DApp 交易解析如何实现？如何识别授权行为和资产变动？",
        "tags": "交易解析 / 多链支持 / 授权检测 / 资产变动 / 安全防护",
        "content": """**一、多链交易解析架构**

OKX 钱包实现的多链解析支持 EVM / Solana / Aptos / Tron：

```
交易数据 → 链识别 → 解析器选择 → 结构化数据 → UI展示
              ↓
         合约 ABI / 指令解码
```

```typescript
// 统一解析接口
interface TransactionParser {
  parse(transaction: RawTransaction): Promise<ParsedTransaction>;
}

interface ParsedTransaction {
  type: 'transfer' | 'approve' | 'swap' | 'contract_call' | 'unknown';
  from: string;
  to: string;
  value?: bigint;
  tokenTransfers: TokenTransfer[];
  assetChanges: AssetChange[];    // 资产变动预览
  riskIndicators: RiskIndicator[];
  humanReadable: string;          // 人类可读描述
}
```

**二、EVM 链交易解析**

1. **ERC-20 Transfer 识别**
```typescript
const parseERC20Transfer = (input: string): TokenTransfer | null => {
  const selector = input.slice(0, 10);
  if (selector !== '0xa9059cbb') return null; // transfer(address,uint256)
  
  const params = decodeAbiParameters(
    [{ type: 'address' }, { type: 'uint256' }],
    `0x${input.slice(10)}`
  );
  
  return {
    token: 'ERC-20',
    from: '...', // 从交易 from 获取
    to: params[0],
    amount: params[1],
    symbol: '',  // 需要查询合约
  };
};
```

2. **授权行为检测**
```typescript
const parseApproval = (input: string): ApprovalInfo | null => {
  const selector = input.slice(0, 10);
  
  // approve(address,uint256) - 0x095ea7b3
  // increaseAllowance(address,uint256) - 0x39509351
  // permit(address,address,uint256,uint256,uint8,bytes32,bytes32) - 0xd505accf
  
  const APPROVAL_SELECTORS = ['0x095ea7b3', '0x39509351', '0xd505accf'];
  
  if (!APPROVAL_SELECTORS.includes(selector)) return null;
  
  const params = decodeApprovalParams(input);
  
  return {
    type: 'approve',
    spender: params.spender,
    amount: params.amount,
    isUnlimited: params.amount === MAX_UINT256,
    riskLevel: calculateApprovalRisk(params.spender, params.amount),
  };
};

// 授权风险评估
const calculateApprovalRisk = (spender: string, amount: bigint): RiskLevel => {
  if (isKnownMaliciousContract(spender)) return 'CRITICAL';
  if (amount === MAX_UINT256) return 'HIGH'; // 无限授权
  if (!isVerifiedContract(spender)) return 'MEDIUM';
  return 'LOW';
};
```

3. **资产变动预览**
```typescript
const calculateAssetChanges = async (
  tx: Transaction,
  userAddress: string
): Promise<AssetChange[]> => {
  const changes: AssetChange[] = [];
  
  // 1. 原生代币变动
  if (tx.value > 0n) {
    if (tx.from === userAddress) {
      changes.push({
        type: 'send',
        token: 'ETH',
        amount: -tx.value,
      });
    }
    if (tx.to === userAddress) {
      changes.push({
        type: 'receive',
        token: 'ETH',
        amount: tx.value,
      });
    }
  }
  
  // 2. 代币变动（通过事件模拟）
  const tokenTransfers = await simulateTokenTransfers(tx);
  for (const transfer of tokenTransfers) {
    if (transfer.from === userAddress) {
      changes.push({ type: 'send', token: transfer.token, amount: -transfer.amount });
    }
    if (transfer.to === userAddress) {
      changes.push({ type: 'receive', token: transfer.token, amount: transfer.amount });
    }
  }
  
  // 3. NFT 变动
  const nftTransfers = await simulateNFTTransfers(tx);
  
  return changes;
};
```

**三、Solana 交易解析**

Solana 是账户模型而非合约模型：

```typescript
const parseSolanaTransaction = (tx: SolanaTransaction): ParsedTransaction => {
  const instructions = tx.message.instructions;
  
  for (const ix of instructions) {
    const programId = tx.message.accountKeys[ix.programIdIndex];
    
    // SPL Token 转账
    if (programId === TOKEN_PROGRAM_ID) {
      return parseSPLTransfer(ix);
    }
    
    // Associated Token Account 创建
    if (programId === ASSOCIATED_TOKEN_PROGRAM_ID) {
      return parseCreateATA(ix);
    }
    
    // 系统转账
    if (programId === SYSTEM_PROGRAM_ID) {
      return parseSystemTransfer(ix);
    }
  }
};

// Solana 特殊场景：nonce account
const checkNonceAccountRisk = (accounts: string[]): RiskIndicator[] => {
  const risks: RiskIndicator[] = [];
  
  for (const account of accounts) {
    const accountInfo = await connection.getAccountInfo(new PublicKey(account));
    if (isNonceAccount(accountInfo)) {
      risks.push({
        type: 'warning',
        message: '此交易涉及 nonce account，请确认 nonce 值正确',
        severity: 'medium',
      });
    }
  }
  
  return risks;
};
```

**四、Tron 多签账户特殊处理**

```typescript
const parseTronTransaction = async (tx: TronTransaction): Promise<ParsedTransaction> => {
  // Tron 使用 protobuf，需要先解码
  const rawData = decodeBase58(tx.raw_data_hex);
  
  // 检测多签账户
  const ownerAddress = rawData.contract[0].parameter.value.owner_address;
  const account = await tronWeb.trx.getAccount(ownerAddress);
  
  if (account.owner_permission?.keys?.length > 1) {
    // 多签账户
    const requiredSignatures = account.owner_permission.keys.length;
    
    return {
      type: 'multisig',
      multisigInfo: {
        required: account.owner_permission.threshold,
        total: requiredSignatures,
        signed: tx.signature?.length || 0,
      },
      riskIndicators: [{
        type: 'info',
        message: `多签账户：需要 ${requiredSignatures} 个签名中的 ${account.owner_permission.threshold} 个`,
      }],
    };
  }
  
  // 检测钓鱼地址
  const toAddress = rawData.contract[0].parameter.value.to_address;
  if (await isPhishingAddress(toAddress)) {
    return {
      riskIndicators: [{
        type: 'danger',
        message: '⚠️ 目标地址在钓鱼地址黑名单中！请勿转账！',
        severity: 'critical',
      }],
    };
  }
};
```

**五、人类可读描述生成**

```typescript
const generateHumanReadable = (parsed: ParsedTransaction): string => {
  switch (parsed.type) {
    case 'transfer':
      return `向 ${truncateAddress(parsed.to)} 转账 ${formatAmount(parsed.value)} ETH`;
      
    case 'approve':
      const approval = parsed.approvals[0];
      if (approval.isUnlimited) {
        return `⚠️ 授权 ${truncateAddress(approval.spender)} 无限额使用您的 ${approval.token}`;
      }
      return `授权 ${truncateAddress(approval.spender)} 使用 ${formatAmount(approval.amount)} ${approval.token}`;
      
    case 'swap':
      return `将 ${formatAmount(parsed.swap.fromAmount)} ${parsed.swap.fromToken} 
              兑换为 ${formatAmount(parsed.swap.toAmount)} ${parsed.swap.toToken}`;
      
    default:
      return `与合约 ${truncateAddress(parsed.to)} 交互`;
  }
};
```

**六、性能与缓存策略**

```typescript
// ABI 缓存
const abiCache = new LRUCache<string, Abi>({ max: 1000 });

const getContractAbi = async (address: string): Promise<Abi> => {
  if (abiCache.has(address)) {
    return abiCache.get(address)!;
  }
  
  const abi = await fetchAbiFromEtherscan(address);
  abiCache.set(address, abi);
  return abi;
};

// 代币元数据缓存
const tokenMetadataCache = new Map<string, TokenMetadata>();

const getTokenMetadata = async (address: string): Promise<TokenMetadata> => {
  if (tokenMetadataCache.has(address)) {
    return tokenMetadataCache.get(address)!;
  }
  
  const contract = new Contract(address, ERC20_ABI, provider);
  const [name, symbol, decimals] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
  ]);
  
  const metadata = { name, symbol, decimals };
  tokenMetadataCache.set(address, metadata);
  return metadata;
};
```"""
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

**实现参考**:
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

def select_balanced_questions(config=None):
    """根据学习档案选择个性化分布的题目"""
    # 加载学习档案（无论如何都加载，用于筛选题目）
    profile = load_learning_profile()
    focus_topics = profile.get("focus_topics", [])

    # 加载配置文件（如果提供）
    if config:
        fe_count = config.get("frontend_count", 3)
        web3_count = config.get("web3_count", 4)
        ai_count = config.get("ai_count", 3)
        print(f"[Config] 使用配置题目数量: 前端{fe_count} + Web3 {web3_count} + AI{ai_count}")
    else:
        # 使用学习档案动态调整
        distribution = get_personalized_distribution(profile)
        fe_count = distribution["frontend"]
        web3_count = distribution["web3"]
        ai_count = distribution["ai"]

    # 如果有特定关注主题，优先选择相关题目
    focus_topics = profile.get("focus_topics", [])

    # 筛选与关注主题相关的题目
    def filter_by_topics(questions, topics):
        if not topics:
            return questions
        related = [q for q in questions if any(t in q.get("tags", "") or t in q.get("title", "") for t in topics)]
        # 确保有足够题目可选
        return related if len(related) >= 2 else questions

    fe_pool = filter_by_topics(FRONTEND_QUESTIONS, focus_topics)
    web3_pool = filter_by_topics(WEB3_QUESTIONS, focus_topics)
    ai_pool = filter_by_topics(AI_QUESTIONS, focus_topics)

    fe_questions = random.sample(fe_pool, min(fe_count, len(fe_pool)))
    web3_questions = random.sample(web3_pool, min(web3_count, len(web3_pool)))
    ai_questions = random.sample(ai_pool, min(ai_count, len(ai_pool)))

    # 如果筛选后数量不足，从完整题库补充
    if len(fe_questions) < fe_count:
        remaining = [q for q in FRONTEND_QUESTIONS if q not in fe_questions]
        fe_questions.extend(random.sample(remaining, fe_count - len(fe_questions)))
    if len(web3_questions) < web3_count:
        remaining = [q for q in WEB3_QUESTIONS if q not in web3_questions]
        web3_questions.extend(random.sample(remaining, web3_count - len(web3_questions)))
    if len(ai_questions) < ai_count:
        remaining = [q for q in AI_QUESTIONS if q not in ai_questions]
        ai_questions.extend(random.sample(remaining, ai_count - len(ai_questions)))

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
        "- [MetaMask 开发者文档](https://docs.metamask.io)",
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
        "*方向: 前端(3题) + Web3(4题) + AI(3题) - Web3钱包前端开发针对性版*",
        "*题库规模: 前端18道 + Web3 25道 + AI 5道 = 48道*",
    ])

    return "\n".join(lines)

def save_and_commit(config=None, date_str=None):
    """保存文件并提交到 Git"""
    if date_str is None:
        date_str = datetime.now().strftime('%Y-%m-%d')
    file_path = f"{QUESTION_DIR}/{date_str}.md"

    # 检查文件是否已存在
    if os.path.exists(file_path):
        print(f"[{date_str}] 面试题已存在，跳过生成")
        return False, date_str, 0, 0, 0

    print(f"[{date_str}] 生成面试题...")

    # 选择均衡分布的题目（传入配置）
    questions, fe_count, web3_count, ai_count = select_balanced_questions(config)
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
        f'git commit -m "feat: add Web3 Wallet interview questions (FE{fe_count}+Web3{web3_count}+AI{ai_count}) for {date_str}"',
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

    # 加载学习档案获取个性化信息
    profile = load_learning_profile()
    focus_topics = profile.get("focus_topics", [])
    weak_areas = profile.get("weak_areas", [])

    # 构建个性化提示
    focus_hint = ""
    if weak_areas:
        focus_hint = f"\n📌 根据你的学习档案，今日侧重: {', '.join(focus_topics[:3])}\n"

    notification = f"""🌅 早上好！我是烤鱼。

📚 今日学习资料已生成
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 已生成 10 道针对性学习内容
✅ 已提交到 GitHub: learn-fe
✅ 已推送到远程仓库{focus_hint}

📊 题目分布：
• 前端：{fe_count}题（移动端、跨平台、安全存储、性能）
• Web3：{web3_count}题（钱包连接、多链、安全、DeFi）
• AI：{ai_count}题（AI+Web3应用）

📚 扩展题库：
前端18道：移动端开发、安全、性能、测试...
Web3 25道：钱包核心、多链、安全、DeFi...
AI 5道：AI+Web3安全审计、客服、风控...

📁 文件位置：
ai-generate/learn-docs/{date_str}.md

🔗 查看完整内容：
https://github.com/luoquanquan/learn-fe/blob/main/ai-generate/learn-docs/{date_str}.md

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
    import argparse
    
    parser = argparse.ArgumentParser(description='生成面试题')
    parser.add_argument('--date', type=str, help='指定日期 (格式: YYYY-MM-DD)')
    parser.add_argument('--dates', type=str, nargs='+', help='指定多个日期 (格式: YYYY-MM-DD YYYY-MM-DD ...)')
    args = parser.parse_args()
    
    # 确定要生成的日期列表
    if args.dates:
        dates = args.dates
    elif args.date:
        dates = [args.date]
    else:
        dates = [datetime.now().strftime('%Y-%m-%d')]
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始生成面试题...")
    print(f"[Config] 将生成 {len(dates)} 天的面试题: {', '.join(dates)}")
    
    # 1. 读取配置文件
    config = load_interview_config()
    
    all_success = True
    for date_str in dates:
        print(f"\n{'='*50}")
        print(f"[生成] 日期: {date_str}")
        print(f"{'='*50}")
        
        # 删除已存在的文件（强制重新生成）
        file_path = f"{QUESTION_DIR}/{date_str}.md"
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"[生成] 已删除旧文件: {file_path}")
        
        # 生成并提交（传入配置和日期）
        success, generated_date, fe_count, web3_count, ai_count = save_and_commit(config, date_str)
        if success:
            # 发送通知
            send_notification(generated_date, fe_count, web3_count, ai_count)
            print(f"✅ {date_str} 生成完成！")
        elif fe_count == 0:  # 文件已存在的情况
            print(f"⚠️ {date_str} 面试题已存在，跳过生成")
        else:
            print(f"❌ {date_str} 生成失败")
            all_success = False
    
    print(f"\n{'='*50}")
    if all_success:
        print("✅ 全部完成！")
        return 0
    else:
        print("❌ 部分生成失败")
        return 1

if __name__ == "__main__":
    sys.exit(main())
