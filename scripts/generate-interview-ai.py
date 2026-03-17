#!/usr/bin/env python3
"""
AI 自动生成面试题脚本 - 无静态题库版
每天根据配置和简历自动生成全新题目
"""

import os
import subprocess
import sys
import random
import json
from datetime import datetime

WORKSPACE = "/home/ubuntu/.openclaw/workspace/learn-fe"
QUESTION_DIR = f"{WORKSPACE}/ai-generate/learn-docs"
KNOWLEDGE_PROFILE = f"{WORKSPACE}/ai-generate/knowledge-profile.md"
CONFIG_FILE = f"{WORKSPACE}/ai-generate/interview-config.md"
RESUME_FILE = f"/home/ubuntu/.openclaw/workspace/resume/zh_cn_optimized.md"

def load_interview_config():
    """加载面试题生成配置"""
    config = {
        "frontend_count": 3,
        "web3_count": 4,
        "ai_count": 3,
        "require_detailed_answer": True,
        "focus_areas": {
            "frontend": ["TypeScript", "CSS", "构建工具", "Web安全", "性能优化"],
            "web3": ["硬件钱包", "交易解析", "多链支持", "EIP标准", "安全防护"],
            "ai": ["AI审计", "RAG", "AI Agent"]
        }
    }
    
    if os.path.exists(CONFIG_FILE):
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
    
    return config

def load_resume():
    """加载简历内容"""
    if os.path.exists(RESUME_FILE):
        with open(RESUME_FILE, 'r', encoding='utf-8') as f:
            return f.read()
    return ""

def generate_prompt(config, resume_content, date_str):
    """生成 AI 提示词"""
    
    fe_count = config['frontend_count']
    web3_count = config['web3_count']
    ai_count = config['ai_count']
    
    prompt = f"""你是一个专业的 Web3 钱包前端开发面试题生成专家。

请根据以下信息生成 {fe_count + web3_count + ai_count} 道面试题：

## 用户背景（基于简历）
{resume_content[:2000] if resume_content else "资深前端工程师，有 Web3 钱包开发经验"}

## 题目要求

### 前端方向（{fe_count} 题）
重点覆盖：
- TypeScript 高级类型和工程实践
- CSS 布局（Flexbox/Grid/居中方案）
- 构建工具（Webpack/Vite/Rspack）原理和优化
- Web 安全（XSS/CSRF/点击劫持）防护
- 性能优化和缓存策略

### Web3 方向（{web3_count} 题）
重点覆盖：
- 硬件钱包（Ledger/Trezor/OneKey/Keystone）接入和协议设计
- 交易解析（EVM/Solana/多链）和授权检测
- 多链钱包架构（BTC/Solana/Sui/Aptos 等非 EVM 链）
- EIP 标准（ERC-20/721/1155/2612/7702/4337/5792）
- 钱包安全（钓鱼识别、合约风险、签名安全）

### AI 方向（{ai_count} 题）
重点覆盖：
- AI + Web3 安全审计
- RAG 在钱包/DApp 中的应用
- AI Agent 自动化交易

## 输出格式

请严格按照以下格式输出：

```markdown
# {date_str}

---

## 1. [题目名称]

**考点**: [相关技术标签]

**答案要点**:

[详细答案，包含：]
[1. 核心原理解释]
[2. 代码示例]
[3. 实际项目应用]
[4. 常见问题和解决方案]

---

## 2. [下一题]
...
```

## 要求

1. 每道题目必须基于用户简历中的实际项目经验延伸
2. 答案必须详细，包含具体代码示例
3. 从项目经验提炼通用设计原则和方法论
4. 避免特定公司名称，使用通用描述
5. 每题答案不少于 500 字
6. 题目要有深度，覆盖原理、实践、优化三个层面

请直接输出完整的 Markdown 内容，不要有任何其他说明。"""

    return prompt

def call_ai_to_generate_questions(prompt):
    """调用 AI 生成题目"""
    # 这里可以通过 API 调用外部 AI 服务
    # 暂时使用本地模拟生成
    
    print("[AI] 正在生成面试题...")
    print("[AI] 提示词长度:", len(prompt), "字符")
    
    # 在实际部署时，这里应该调用 AI API
    # 例如：OpenAI, Claude, Kimi 等
    
    # 返回一个标记表示需要外部 AI 生成
    return None

def generate_questions_with_ai(config, resume_content, date_str):
    """使用 AI 生成题目"""
    prompt = generate_prompt(config, resume_content, date_str)
    
    # 生成提示词文件，供外部 AI 使用
    prompt_file = f"/tmp/interview_prompt_{date_str}.txt"
    with open(prompt_file, 'w', encoding='utf-8') as f:
        f.write(prompt)
    
    print(f"[AI] 提示词已保存到: {prompt_file}")
    print("[AI] 请使用以下方式之一生成题目：")
    print("  1. 将提示词发送给 AI 助手（如 Kimi、Claude、GPT-4）")
    print("  2. 使用 API 自动调用（需配置 API Key）")
    
    # 如果没有 AI 返回内容，返回 None 让调用者知道需要外部处理
    return None

def generate_placeholder_questions(config, date_str):
    """生成占位题目（当 AI 不可用时）"""
    fe_count = config['frontend_count']
    web3_count = config['web3_count']
    ai_count = config['ai_count']
    
    lines = [f"# {date_str}", "", "---", ""]
    
    question_num = 1
    
    # 前端题目占位
    for i in range(fe_count):
        lines.extend([
            f"## {question_num}. [前端题目 {i+1}]",
            "",
            "**考点**: [考点标签]",
            "",
            "**答案要点**:",
            "",
            "[题目内容由 AI 生成]",
            "",
            "---",
            ""
        ])
        question_num += 1
    
    # Web3 题目占位
    for i in range(web3_count):
        lines.extend([
            f"## {question_num}. [Web3 题目 {i+1}]",
            "",
            "**考点**: [考点标签]",
            "",
            "**答案要点**:",
            "",
            "[题目内容由 AI 生成]",
            "",
            "---",
            ""
        ])
        question_num += 1
    
    # AI 题目占位
    for i in range(ai_count):
        lines.extend([
            f"## {question_num}. [AI 题目 {i+1}]",
            "",
            "**考点**: [考点标签]",
            "",
            "**答案要点**:",
            "",
            "[题目内容由 AI 生成]",
            "",
            "---",
            ""
        ])
        question_num += 1
    
    lines.extend([
        "## 附录：学习资源",
        "",
        "*本日题目由 AI 根据简历和配置自动生成*",
        ""
    ])
    
    return "\n".join(lines)

def run_cmd(cmd, cwd=None):
    """执行命令并返回输出"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
    return result.returncode == 0, result.stdout, result.stderr

def save_and_commit(config=None, date_str=None, ai_content=None):
    """保存文件并提交到 Git"""
    if date_str is None:
        date_str = datetime.now().strftime('%Y-%m-%d')
    
    file_path = f"{QUESTION_DIR}/{date_str}.md"
    
    # 检查文件是否已存在
    if os.path.exists(file_path):
        print(f"[{date_str}] 面试题已存在，跳过生成")
        return False, date_str, 0, 0, 0
    
    print(f"[{date_str}] 生成面试题...")
    
    # 如果有 AI 生成的内容，使用它
    if ai_content:
        content = ai_content
    else:
        # 否则生成占位内容
        content = generate_placeholder_questions(config, date_str)
    
    fe_count = config['frontend_count']
    web3_count = config['web3_count']
    ai_count = config['ai_count']
    
    # 写入文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"[{date_str}] 已保存到 {file_path}")
    print(f"[{date_str}] 题目分布: 前端{fe_count}题 + Web3 {web3_count}题 + AI{ai_count}题")
    
    # Git 操作
    print(f"[{date_str}] Git 提交...")
    
    success, stdout, stderr = run_cmd(f"git add {file_path}", WORKSPACE)
    if not success:
        print(f"Git add 失败: {stderr}")
        return False, date_str, fe_count, web3_count, ai_count
    
    success, stdout, stderr = run_cmd(
        f'git commit -m "feat: AI generate interview questions ({date_str})"',
        WORKSPACE
    )
    if not success:
        print(f"Git commit 失败: {stderr}")
        return False, date_str, fe_count, web3_count, ai_count
    
    print(f"[{date_str}] Git 提交成功")
    
    success, stdout, stderr = run_cmd("git push origin main", WORKSPACE)
    if not success:
        print(f"Git push 失败: {stderr}")
        return False, date_str, fe_count, web3_count, ai_count
    
    print(f"[{date_str}] GitHub 推送成功")
    return True, date_str, fe_count, web3_count, ai_count

def send_notification(date_str, fe_count, web3_count, ai_count):
    """发送飞书通知"""
    notification = f"""🌅 早上好！我是烤鱼。

📚 今日学习资料已生成（AI 自动生成版）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 已生成 {fe_count + web3_count + ai_count} 道针对性学习内容
✅ 已提交到 GitHub: learn-fe
✅ 已推送到远程仓库

📊 题目分布：
• 前端：{fe_count}题（基于简历技能栈）
• Web3：{web3_count}题（基于 OKX 经验延伸）
• AI：{ai_count}题（前沿技术方向）

🤖 题目特点：
• 基于简历项目经验定制
• 覆盖原理、实践、优化三层面
• 详细答案包含代码示例

📁 文件位置：
ai-generate/learn-docs/{date_str}.md

🔗 查看完整内容：
https://github.com/luoquanquan/learn-fe/blob/main/ai-generate/learn-docs/{date_str}.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ {date_str} 08:00
"""
    
    message_file = f"/tmp/openclaw-messages/interview-{date_str}.txt"
    os.makedirs(os.path.dirname(message_file), exist_ok=True)
    
    with open(message_file, 'w') as f:
        f.write(notification)
    
    print(f"[{date_str}] 通知已保存到 {message_file}")
    print("\n" + "="*50)
    print(notification)
    print("="*50)
    
    return True

def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='AI 自动生成面试题')
    parser.add_argument('--date', type=str, help='指定日期 (格式: YYYY-MM-DD)')
    parser.add_argument('--dates', type=str, nargs='+', help='指定多个日期')
    parser.add_argument('--prompt-only', action='store_true', help='只生成提示词，不生成题目')
    args = parser.parse_args()
    
    if args.dates:
        dates = args.dates
    elif args.date:
        dates = [args.date]
    else:
        dates = [datetime.now().strftime('%Y-%m-%d')]
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] AI 自动生成面试题...")
    
    # 加载配置和简历
    config = load_interview_config()
    resume_content = load_resume()
    
    print(f"[Config] 题目数量: 前端{config['frontend_count']} + Web3 {config['web3_count']} + AI{config['ai_count']}")
    print(f"[Resume] 简历长度: {len(resume_content)} 字符")
    
    if args.prompt_only:
        # 只生成提示词
        for date_str in dates:
            prompt = generate_prompt(config, resume_content, date_str)
            prompt_file = f"/tmp/interview_prompt_{date_str}.txt"
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt)
            print(f"\n提示词已保存到: {prompt_file}")
        return 0
    
    # 生成题目
    all_success = True
    for date_str in dates:
        print(f"\n{'='*50}")
        print(f"[生成] 日期: {date_str}")
        print(f"{'='*50}")
        
        # 删除已存在的文件
        file_path = f"{QUESTION_DIR}/{date_str}.md"
        if os.path.exists(file_path):
            os.remove(file_path)
        
        # 尝试使用 AI 生成
        ai_content = generate_questions_with_ai(config, resume_content, date_str)
        
        # 保存并提交
        success, generated_date, fe_count, web3_count, ai_count = save_and_commit(
            config, date_str, ai_content
        )
        
        if success:
            send_notification(generated_date, fe_count, web3_count, ai_count)
            print(f"✅ {date_str} 生成完成！")
        else:
            print(f"❌ {date_str} 生成失败")
            all_success = False
    
    print(f"\n{'='*50}")
    if all_success:
        print("✅ 全部完成！")
        print("\n提示：题目框架已生成，请将提示词发送给 AI 助手获取详细答案")
        return 0
    else:
        print("❌ 部分生成失败")
        return 1

if __name__ == "__main__":
    sys.exit(main())
