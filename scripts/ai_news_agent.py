#!/usr/bin/env python3
"""
AI新闻助手 - OpenClaw Subagent
每天早上8点发送面试题提醒，下午6点发送AI新闻总结
兼容 Python 3.6
"""

import subprocess
import re
from datetime import datetime
import sys

def fetch_hn_news():
    """从 Hacker News 获取AI相关新闻"""
    try:
        result = subprocess.run(
            ['curl', '-s', 'https://r.jina.ai/http://news.ycombinator.com', '--max-time', '30'],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=35
        )
        return result.stdout.decode('utf-8', errors='ignore')
    except Exception as e:
        return f"Error fetching news: {e}"

def parse_ai_news(content):
    """解析AI相关新闻 - 修复：处理单行多记录格式"""
    ai_keywords = ['claude', 'gpt', 'openai', 'llm', 'agent', 'machine learning', 
                   'artificial intelligence', 'ai ', 'rag', 'embedding', 'neural', 
                   'deep learning', 'copilot', 'chatgpt', 'anthropic', 'xai',
                   'karpathy', 'coders', 'programming', 'agents', 'context',
                   'spine swarm', 'can i run ai', 'emulated', 'coding after',
                   'emacs and vim in the age of ai']
    
    # 更宽松的正则：匹配 数字.[](任意)[标题](链接) ... 分数 points
    pattern = r'\d+\.\[\]\([^)]*\)\[([^\]]+)\]\(([^)]+)\).*?(\d+)\s+points'
    matches = re.findall(pattern, content)
    
    ai_news = []
    seen_titles = set()
    
    for title, url, score in matches:
        title_lower = title.lower()
        # 检查是否包含AI关键词
        if any(keyword in title_lower for keyword in ai_keywords):
            # 去重
            if title not in seen_titles:
                seen_titles.add(title)
                ai_news.append({
                    'title': title[:70] + '...' if len(title) > 70 else title,
                    'url': url,
                    'score': score
                })
    
    return ai_news[:10]

def generate_daily_news():
    """生成每日AI新闻消息"""
    content = fetch_hn_news()
    
    if not content or len(content) < 1000:
        return "⚠️ 今天未能获取到AI新闻，请稍后再试"
    
    ai_news = parse_ai_news(content)
    
    if not ai_news:
        return "⚠️ 今天未能获取到AI新闻，请稍后再试"
    
    date_str = datetime.now().strftime('%Y-%m-%d')
    
    message = f"""🌆 晚上好！我是烤鱼。

🤖 今日AI热门新闻 ({date_str})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"""
    
    for i, news in enumerate(ai_news, 1):
        message += f"""
{i}. {news['title']}
   🔥 {news['score']} points
   🔗 {news['url'][:50]}..."""
    
    message += """

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 发送 /ai新闻 可查看更多详情
⏰ 每日18:00自动推送
"""
    
    return message

def generate_interview_questions():
    """生成面试题提醒"""
    date_str = datetime.now().strftime('%Y-%m-%d')
    return f"""🌅 早上好！我是烤鱼。

📚 今日面试题时间 ({date_str})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

已为你准备好10道面试题，
涉及方向：AI / Web3 / 前端

📁 文件位置：
ai-interview-questions/{date_str}.md

💡 发送 /面试题 查看详情
⏰ 每日08:00自动推送
"""

def main():
    """主函数 - 根据参数决定发送什么内容"""
    if len(sys.argv) < 2:
        print("Usage: python3 ai_news_agent.py [news|interview]")
        sys.exit(1)
    
    task_type = sys.argv[1]
    
    if task_type == "news":
        print(generate_daily_news())
    elif task_type == "interview":
        print(generate_interview_questions())
    else:
        print(f"Unknown task type: {task_type}")
        sys.exit(1)

if __name__ == "__main__":
    main()
