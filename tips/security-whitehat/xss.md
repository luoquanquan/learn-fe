# XSS (Cross Site Script) - 跨站脚本攻击

## 基本概念

| 项目 | 说明 |
|------|------|
| **全称** | Cross Site Script |
| **中文** | 跨站脚本 |
| **原理** | 黑客通过 "HTML 注入" 篡改网页，插入恶意脚本 |
| **危害** | 盗取用户信息、钓鱼攻击、制造蠕虫病毒 |

当用户浏览被篡改的网页时，恶意脚本会在用户浏览器中执行，实现控制用户浏览器行为的目的。

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-22-12.png)

---

## XSS 分类

### 1. 存储型 XSS (Stored XSS)

**特点**：恶意脚本永久存储在目标服务器上

**攻击流程**：
1. 黑客将恶意代码提交到服务器（如评论区、留言板）
2. 服务器保存恶意代码到数据库
3. 普通用户访问包含恶意代码的页面
4. 恶意代码在用户浏览器执行

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-26-48.png)

**黑客入侵完整流程**：

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-27-32.png)

---

### 2. 反射型 XSS (Reflected XSS)

**特点**：恶意脚本存在于 URL 参数中，需要诱骗用户点击链接

**攻击流程**：
1. 黑客构造包含恶意代码的 URL
2. 通过邮件、社交工程等诱骗用户点击
3. 服务器将 URL 中的恶意代码反射到响应页面
4. 恶意代码在用户浏览器执行

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-30-09.png)

**代码实现示例**：

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-29-26.png)

---

### 3. DOM 型 XSS (DOM-based XSS)

**特点**：恶意脚本通过修改页面 DOM 结构触发，不经过服务器

**攻击流程**：
1. 黑客构造包含恶意代码的 URL（通常使用 hash 片段）
2. 用户点击链接访问页面
3. 前端 JavaScript 读取 URL 参数并插入到 DOM
4. 恶意代码执行

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-33-25.png)

**代码实现示例**：

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-32-16.png)

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-33-04.png)

---

## 三种 XSS 对比总结

![](http://handle-note-img.niubishanshan.top/2020-02-15-00-41-29.png)

| 类型 | 数据存储位置 | 触发方式 | 危害程度 |
|------|-------------|---------|---------|
| **存储型** | 服务器数据库 | 用户正常访问页面 | ⭐⭐⭐⭐⭐ |
| **反射型** | URL 参数 | 需诱骗点击链接 | ⭐⭐⭐ |
| **DOM 型** | URL hash/参数 | 需诱骗点击链接 | ⭐⭐⭐ |

---

## 防护建议

1. **输入过滤**：对用户输入进行严格的 HTML 转义
2. **输出编码**：在页面渲染时对动态内容进行编码
3. **CSP 策略**：配置 Content-Security-Policy 限制脚本执行
4. **HttpOnly Cookie**：设置 Cookie 的 HttpOnly 属性防止脚本读取
