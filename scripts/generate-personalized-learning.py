#!/usr/bin/env python3
"""
个性化学习内容生成器
基于用户知识档案生成针对性的学习内容
"""

import os
import json
from datetime import datetime
from typing import List, Dict

WORKSPACE = "/home/ubuntu/.openclaw/workspace/learn-fe"
PROFILE_PATH = f"{WORKSPACE}/ai-generate/knowledge-profile.md"
LEARNING_DIR = f"{WORKSPACE}/ai-generate/learn-docs"

def load_knowledge_profile() -> Dict:
    """加载知识档案"""
    profile = {
        "level": "intermediate",
        "strong_areas": ["react", "typescript", "web3-basics"],
        "weak_areas": ["web3-security", "contract-audit", "ai-advanced"],
        "learning_goals": [
            "深入理解 Web3 安全漏洞",
            "掌握智能合约审计基础",
            "学习 AI Agent 高级应用"
        ]
    }
    
    # 尝试从文件读取更详细的信息
    if os.path.exists(PROFILE_PATH):
        with open(PROFILE_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
            # 解析待提升项
            if "Web3 安全" in content or "智能合约" in content:
                profile["focus_area"] = "web3-security"
            elif "AI" in content or "Agent" in content:
                profile["focus_area"] = "ai-application"
            else:
                profile["focus_area"] = "frontend-advanced"
    
    return profile

def generate_personalized_questions(profile: Dict) -> List[Dict]:
    """根据知识档案生成个性化题目"""
    
    # 根据弱项领域选择题目
    weak_areas = profile.get("weak_areas", [])
    
    # 题目库按难度分级
    questions_db = {
        "web3-security": [
            {
                "level": "intermediate",
                "topic": "重入攻击防护",
                "title": "智能合约重入攻击的原理及防护措施",
                "hint": "从 checks-effects-interactions 模式入手"
            },
            {
                "level": "advanced", 
                "topic": "闪电贷攻击",
                "title": "闪电贷攻击在 DeFi 中的应用及防御策略",
                "hint": "关注价格预言机操纵"
            },
            {
                "level": "advanced",
                "topic": "访问控制",
                "title": "智能合约权限管理最佳实践",
                "hint": "Ownable vs AccessControl"
            }
        ],
        "ai-application": [
            {
                "level": "intermediate",
                "topic": "RAG 架构",
                "title": "如何实现基于向量数据库的 RAG 系统",
                "hint": "考虑 embedding、chunking、retrieval"
            },
            {
                "level": "advanced",
                "topic": "AI Agent",
                "title": "设计一个能执行多步任务的 AI Agent",
                "hint": "规划、记忆、工具调用的结合"
            }
        ],
        "frontend-advanced": [
            {
                "level": "advanced",
                "topic": "性能优化",
                "title": "React Native 大型列表性能优化实战",
                "hint": "虚拟列表、内存管理、图片优化"
            },
            {
                "level": "intermediate",
                "topic": "TypeScript",
                "title": "TypeScript 高级类型体操实战",
                "hint": "条件类型、映射类型、模板字面量"
            }
        ]
    }
    
    # 选择重点领域
    selected_questions = []
    for area in weak_areas[:2]:  # 选择前两个弱项
        if area in questions_db:
            selected_questions.extend(questions_db[area][:2])
    
    # 补充基础题确保全面
    if len(selected_questions) < 5:
        selected_questions.extend(questions_db["frontend-advanced"][:2])
    
    return selected_questions[:5]

def generate_learning_guide(profile: Dict) -> str:
    """生成个性化学习指南"""
    
    weak_areas = profile.get("weak_areas", [])
    goals = profile.get("learning_goals", [])
    
    content = f"""# 个性化学习推荐 - {datetime.now().strftime('%Y-%m-%d')}

## 📊 你的学习画像

**当前水平**: {profile.get('level', 'intermediate')}

**优势领域**:
{chr(10).join(['- ' + area for area in profile.get('strong_areas', [])])}

**待提升领域**:
{chr(10).join(['- ' + area for area in weak_areas])}

**近期目标**:
{chr(10).join(['- ' + goal for goal in goals])}

---

## 🎯 今日学习建议

### 重点突破
基于你的知识档案，建议优先学习：

"""
    
    # 根据弱项生成建议
    if "web3-security" in weak_areas:
        content += """
#### 🔐 Web3 安全专题

**推荐学习内容**:
1. 重入攻击原理与防范
2. 整数溢出/下溢检查
3. 访问控制机制设计
4. 常见 DeFi 攻击案例分析

**实践建议**:
- 阅读 SlowMist 审计报告
- 在 Ethernaut 完成挑战
- 复现历史漏洞案例
"""
    
    if "ai-advanced" in weak_areas:
        content += """
#### 🤖 AI 应用进阶

**推荐学习内容**:
1. RAG 架构设计与优化
2. Prompt Engineering 最佳实践
3. AI Agent 设计与实现
4. 模型微调基础

**实践建议**:
- 搭建个人知识库助手
- 实现一个多步骤任务 Agent
- 优化 Prompt 提升输出质量
"""
    
    content += f"""
---

## 📚 推荐资源

### 文档与教程
- [Consensys 安全最佳实践](https://consensys.github.io/smart-contract-best-practices)
- [OpenZeppelin 安全博客](https://blog.openzeppelin.com)
- [LangChain 文档](https://python.langchain.com)

### 实践平台
- [Ethernaut](https://ethernaut.openzeppelin.com) - Web3 安全游戏
- [Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz) - DeFi 安全挑战
- [AI Agent 示例](https://github.com/langchain-ai/langchain)

---

*本推荐基于你的学习进度自动生成*
"""
    
    return content

def main():
    """主函数"""
    profile = load_knowledge_profile()
    
    # 生成学习指南
    guide_content = generate_learning_guide(profile)
    
    # 保存到学习目录
    date_str = datetime.now().strftime('%Y-%m-%d')
    guide_path = f"{LEARNING_DIR}/{date_str}-guide.md"
    
    os.makedirs(LEARNING_DIR, exist_ok=True)
    with open(guide_path, 'w', encoding='utf-8') as f:
        f.write(guide_content)
    
    print(f"✅ 学习指南已生成: {guide_path}")
    
    # 输出生成的内容预览
    print("\n" + "="*50)
    print(guide_content[:1000])
    print("...")
    print("="*50)

if __name__ == "__main__":
    main()
