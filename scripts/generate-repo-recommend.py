#!/usr/bin/env python3
"""
GitHub 开源项目推荐生成器
每天晚上 8 点自动获取当天值得关注的 5 个 GitHub 项目
生成 markdown 文件并推送到 GitHub
"""

import os
import subprocess
import sys
from datetime import datetime
import requests
from typing import List, Dict

WORKSPACE = "/home/ubuntu/.openclaw/workspace/learn-fe"
RECOMMEND_DIR = f"{WORKSPACE}/repo-recommend"

# GitHub API 配置
GITHUB_API = "https://api.github.com"
# 可以添加 GitHub Token 以提高 rate limit
# GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")

def run_cmd(cmd, cwd=None):
    """执行命令并返回输出"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
    return result.returncode == 0, result.stdout, result.stderr

def get_trending_repos() -> List[Dict]:
    """获取 GitHub Trending 项目"""
    # 使用 GitHub Search API 获取最近更新的热门项目
    # 查询最近一周创建或更新的、star 数增长快的项目
    
    # 多种查询策略获取不同类型的优质项目
    queries = [
        # 最近热门的前端项目
        "stars:>100 language:typescript created:>2026-01-01",
        # 最近热门的 Web3/区块链项目
        "stars:>50 (blockchain OR web3 OR ethereum OR solidity) created:>2026-01-01",
        # 最近热门的 AI/机器学习项目
        "stars:>100 (ai OR ml OR llm OR chatgpt OR claude) created:>2026-01-01",
        # 最近热门的开发工具
        "stars:>50 (devtools OR cli OR vscode OR plugin) created:>2026-01-01",
        # 最近热门的全栈框架
        "stars:>100 (framework OR fullstack OR nextjs OR nuxt) created:>2026-01-01",
    ]
    
    all_repos = []
    seen_names = set()
    
    headers = {
        "Accept": "application/vnd.github.v3+json",
    }
    
    # 如果配置了 GitHub Token，添加认证
    github_token = os.getenv("GITHUB_TOKEN", "")
    if github_token:
        headers["Authorization"] = f"token {github_token}"
    
    for query in queries:
        try:
            url = f"{GITHUB_API}/search/repositories"
            params = {
                "q": query,
                "sort": "updated",
                "order": "desc",
                "per_page": 5
            }
            
            response = requests.get(url, headers=headers, params=params, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                for repo in data.get("items", []):
                    full_name = repo["full_name"]
                    if full_name not in seen_names:
                        seen_names.add(full_name)
                        all_repos.append({
                            "name": repo["name"],
                            "full_name": full_name,
                            "description": repo["description"] or "暂无描述",
                            "url": repo["html_url"],
                            "stars": repo["stargazers_count"],
                            "forks": repo["forks_count"],
                            "language": repo["language"] or "未知",
                            "created_at": repo["created_at"],
                            "updated_at": repo["updated_at"],
                            "topics": repo.get("topics", []),
                        })
            else:
                print(f"API 请求失败: {response.status_code}")
                
        except Exception as e:
            print(f"获取项目时出错: {e}")
            continue
    
    # 按 stars 排序，选择 top 5
    all_repos.sort(key=lambda x: x["stars"], reverse=True)
    return all_repos[:5]

def generate_recommendation(repo: Dict) -> str:
    """生成推荐理由"""
    reasons = []
    
    # 基于 stars 数量
    if repo["stars"] > 10000:
        reasons.append(f"⭐ 已获 {repo['stars']:,} Star，社区认可度极高")
    elif repo["stars"] > 1000:
        reasons.append(f"⭐ 已获 {repo['stars']:,} Star，受到开发者广泛关注")
    else:
        reasons.append(f"⭐ 新兴项目，目前 {repo['stars']:,} Star，值得关注")
    
    # 基于语言
    if repo["language"]:
        reasons.append(f"📝 主要语言: {repo['language']}")
    
    # 基于 topics
    if repo["topics"]:
        topics_str = ", ".join(repo["topics"][:3])
        reasons.append(f"🏷️ 标签: {topics_str}")
    
    # 基于描述
    if repo["description"] and repo["description"] != "暂无描述":
        reasons.append(f"💡 {repo['description']}")
    
    return "\n".join(reasons)

def generate_content(repos: List[Dict], date_str: str) -> str:
    """生成完整的 markdown 内容"""
    lines = [
        f"# GitHub 开源项目推荐 - {date_str}",
        "",
        "今天为大家精选了 5 个值得关注的 GitHub 开源项目。",
        "",
        "---",
        "",
    ]
    
    for i, repo in enumerate(repos, 1):
        lines.append(f"## {i}. [{repo['full_name']}]({repo['url']})")
        lines.append("")
        lines.append(generate_recommendation(repo))
        lines.append("")
        lines.append(f"🔗 **项目链接**: {repo['url']}")
        lines.append("")
        lines.append("---")
        lines.append("")
    
    # 添加页脚
    lines.extend([
        "## 关于本推荐",
        "",
        "- 每天自动筛选 GitHub 上最新、最热门的开源项目",
        "- 重点关注前端、Web3、AI、开发工具等领域",
        "- 项目按 Star 数和活跃度综合排序",
        "",
        f"*更新时间: {date_str} 20:00*",
    ])
    
    return "\n".join(lines)

def save_and_commit():
    """保存文件并提交到 Git"""
    date_str = datetime.now().strftime('%Y-%m-%d')
    file_path = f"{RECOMMEND_DIR}/{date_str}.md"
    
    # 检查文件是否已存在
    if os.path.exists(file_path):
        print(f"[{date_str}] 今日推荐已存在，跳过生成")
        return False, date_str
    
    print(f"[{date_str}] 获取 GitHub 项目...")
    
    # 获取项目
    repos = get_trending_repos()
    
    if len(repos) < 5:
        print(f"警告: 只获取到 {len(repos)} 个项目")
    
    if len(repos) == 0:
        print("错误: 未能获取到任何项目")
        return False, date_str
    
    print(f"[{date_str}] 获取到 {len(repos)} 个项目")
    
    # 生成内容
    content = generate_content(repos, date_str)
    
    # 写入文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"[{date_str}] 已保存到 {file_path}")
    
    # 打印内容预览
    print("\n" + "="*50)
    print(content[:1000] + "...")
    print("="*50 + "\n")
    
    # Git 操作
    print(f"[{date_str}] Git 提交...")
    
    # git add
    success, stdout, stderr = run_cmd(f"git add {file_path}", WORKSPACE)
    if not success:
        print(f"Git add 失败: {stderr}")
        return False, date_str
    
    # git commit
    success, stdout, stderr = run_cmd(
        f'git commit -m "feat: add GitHub repo recommendations for {date_str}"',
        WORKSPACE
    )
    if not success:
        print(f"Git commit 失败: {stderr}")
        return False, date_str
    
    print(f"[{date_str}] Git 提交成功")
    
    # git push
    print(f"[{date_str}] 推送到 GitHub...")
    success, stdout, stderr = run_cmd("git push origin main", WORKSPACE)
    if not success:
        print(f"Git push 失败: {stderr}")
        return False, date_str
    
    print(f"[{date_str}] GitHub 推送成功")
    
    return True, date_str

def send_notification(date_str: str):
    """发送通知（可选）"""
    notification = f"""🐟 晚上好！我是烤鱼。

📦 今日 GitHub 项目推荐已生成
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 已获取 5 个优质开源项目
✅ 已提交到 GitHub: learn-fe
✅ 已推送到远程仓库

📁 文件位置：
repo-recommend/{date_str}.md

🔗 查看完整内容：
https://github.com/luoquanquan/learn-fe/blob/main/repo-recommend/{date_str}.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ {date_str} 20:00
"""
    
    # 保存通知到消息队列（如果配置了 OpenClaw 消息推送）
    message_file = f"/tmp/openclaw-messages/repo-recommend-{date_str}.txt"
    os.makedirs(os.path.dirname(message_file), exist_ok=True)
    
    with open(message_file, 'w') as f:
        f.write(notification)
    
    print(f"[{date_str}] 通知已保存到 {message_file}")
    
    # 同时打印到 stdout
    print("\n" + "="*50)
    print(notification)
    print("="*50)

def main():
    """主函数"""
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始生成 GitHub 项目推荐...")
    
    # 确保目录存在
    os.makedirs(RECOMMEND_DIR, exist_ok=True)
    
    # 生成并提交
    success, date_str = save_and_commit()
    
    if success:
        # 发送通知
        send_notification(date_str)
        print("✅ 全部完成！")
        return 0
    else:
        print("⚠️ 生成失败或已存在")
        return 1

if __name__ == "__main__":
    sys.exit(main())
