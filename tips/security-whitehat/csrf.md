# CSRF (Cross Site Request Forgery) - 跨站请求伪造

## 什么是 CSRF

CSRF（Cross Site Request Forgery，跨站请求伪造）是一种利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义执行非法操作的攻击方式。

与 XSS 不同，CSRF 不需要获取用户的 Cookie，而是直接利用浏览器会自动携带 Cookie 的特性，冒充用户发起请求。

![](http://handle-note-img.niubishanshan.top/2020-02-15-13-51-26.png)

---

## 攻击原理

### 核心条件

1. **用户已登录目标网站**：用户在银行网站 A 保持登录状态（Cookie 有效）
2. **用户访问恶意网站**：用户在同一个浏览器中打开了攻击者的网站 B
3. **恶意网站构造请求**：网站 B 包含指向网站 A 的请求（如图片、表单、链接）
4. **浏览器自动携带 Cookie**：请求发出时，浏览器自动带上网站 A 的 Cookie
5. **服务器误认为是用户操作**：网站 A 接收到请求，验证 Cookie 通过，执行操作

### 攻击流程图示

```
┌──────────┐                    ┌──────────┐                    ┌──────────┐
│   用户    │ ──1. 登录────────► │ 银行网站  │                    │          │
│          │ ◄──2. 获得Cookie── │    A     │                    │          │
└──────────┘                    └──────────┘                    │          │
     │                                                            │          │
     │ 3. 访问恶意网站 B                                          │          │
     ▼                                                            │          │
┌──────────┐                    ┌──────────┐                    │          │
│ 恶意网站  │ ──4. 构造转账请求──► │ 浏览器   │ ──5. 自动携带Cookie──►│ 银行网站  │
│    B     │                    │          │                    │    A     │
└──────────┘                    └──────────┘                    │ (执行转账)│
                                                                 └──────────┘
```

---

## 攻击类型

### GET 型 CSRF

利用 `<img>`、`<a>` 等标签自动发起 GET 请求的特性。

```html
<!-- 恶意网站上的代码 -->
<img src="https://bank.com/transfer?to=attacker&amount=10000" width="0" height="0">
```

### POST 型 CSRF

利用自动提交的表单。

```html
<!-- 恶意网站上的代码 -->
<form action="https://bank.com/transfer" method="POST" id="csrf-form">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.getElementById('csrf-form').submit();</script>
```

---

## 实际攻击案例

### 场景一：银行转账

1. 用户登录网银，保持登录状态
2. 用户收到邮件，点击链接进入钓鱼网站
3. 钓鱼网站包含自动提交的转账表单
4. 银行收到请求，验证 Cookie 有效，执行转账
5. 用户的钱被转走，却完全不知情

### 场景二：社交媒体蠕虫

1. 攻击者在微博发布一条包含恶意代码的链接
2. 登录用户点击后，自动发布相同的恶意链接
3. 形成蠕虫式传播

---

## 防护措施

### 1. CSRF Token（最有效）

服务端生成随机 Token，嵌入表单或请求头中，验证请求合法性。

```html
<!-- 表单中加入 Token -->
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="随机生成的Token">
  <input type="text" name="amount">
  <button>转账</button>
</form>
```

```javascript
// AJAX 请求中携带 Token
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': '随机生成的Token'
  },
  body: JSON.stringify({ amount: 1000 })
});
```

### 2. SameSite Cookie

设置 Cookie 的 `SameSite` 属性，限制第三方网站携带 Cookie。

```http
Set-Cookie: sessionId=xxx; SameSite=Strict
```

| 属性值 | 说明 |
|--------|------|
| `Strict` | 完全禁止第三方携带 Cookie |
| `Lax` | 允许安全的 GET 请求携带（默认）|
| `None` | 允许第三方携带（需配合 Secure）|

### 3. Referer/Origin 检查

验证请求来源，拒绝来自非本站的请求。

```javascript
const referer = request.headers.referer;
if (!referer || !referer.startsWith('https://bank.com')) {
  return res.status(403).send('Forbidden');
}
```

### 4. 双重 Cookie 验证

将 Token 同时存储在 Cookie 和请求参数中，服务端对比是否一致。

### 5. 用户交互确认

对于敏感操作（转账、修改密码），要求用户再次输入密码或进行图形验证。

---

## CSRF vs XSS 区别

| 特性 | CSRF | XSS |
|------|------|-----|
| **攻击原理** | 利用用户身份冒充请求 | 注入恶意脚本执行 |
| **是否需要获取 Cookie** | 否（浏览器自动携带）| 是（脚本读取）|
| **攻击目标** | 服务器 | 用户浏览器 |
| **能否获取用户数据** | 不能直接获取 | 可以获取 |
| **防护重点** | 验证请求来源 | 过滤输入输出 |

---

## 总结

![](http://handle-note-img.niubishanshan.top/2020-02-15-13-56-37.png)

CSRF 攻击的本质是：**浏览器会自动携带目标网站的 Cookie，攻击者利用这一点冒充用户发起请求**。

最有效的防护措施：
1. ✅ 使用 CSRF Token 验证
2. ✅ 设置 SameSite Cookie 属性
3. ✅ 敏感操作增加二次验证

![](http://handle-note-img.niubishanshan.top/2020-02-15-13-58-19.png)

![](http://handle-note-img.niubishanshan.top/2020-02-15-13-59-15.png)
