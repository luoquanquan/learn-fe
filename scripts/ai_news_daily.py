#!/usr/bin/env python3
"""
每日AI新闻抓取与总结
由烤鱼创建 - 每天下午6点运行
"""

import subprocess
import re
from datetime import datetime

def fetch_hackernews():
    """获取 Hacker News 热门内容"""
    try:
        result = subprocess.run(
            ['curl', '-s', 'https://r.jina.ai/http://news.ycombinator.com', '--max-time', '30'],
            capture_output=True, text=True, timeout=35
        )
        return result.stdout
    except Exception as e:
        return f"Error: {e}"

def parse_ai_news(content):
    """解析AI相关新闻"""
    # AI关键词
    ai_keywords = ['ai', 'artificial intelligence', 'machine learning', 'llm', 
                   'claude', 'gpt', 'openai', 'anthropic', 'model', 'neural',
                   'deep learning', 'agent', 'rag', 'embedding', 'vector']
    
    lines = content.split('\n')
    ai_news = []
    
    for i, line in enumerate(lines):
        line_lower = line.lower()
        # 检查是否包含AI关键词
        if any(keyword in line_lower for keyword in ai_keywords):
            # 提取标题和链接
            match = re.search(r'\d+\.\[\]\([^)]*\)\s*\[([^\]]+)\]\s*\(([^)]+)\)', line)
            if match:
                title = match.group(1)
                url = match.group(2)
                # 获取分数
                score_match = re.search(r'(\d+)\s+points?', content[max(0, i-2):i+3])
                score = score_match.group(1) if score_match else "N/A"
                ai_news.append({
                    'title': title[:80] + '...' if len(title) > 80 else title,
                    'url': url,
                    'score': score
                })
    
    return ai_news[:10]  # 取前10条

def generate_summary():
    """生成新闻总结"""
    content = fetch_hackernews()
    ai_news = parse_ai_news(content)
    
    if not ai_news:
        return None
    
    date_str = datetime.now().strftime('%Y-%m-%d')
    
    summary = f"""🌆 晚上好！我是烤鱼。

🤖 今日AI热门新闻 ({date_str})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
    
    for i, news in enumerate(ai_news, 1):
        summary += f"""
{i}. {news['title']}
   🔥 {news['score']} points | {news['url'][:60]}...
"""
    
    summary += """
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 提示：发送 /ai新闻 可查看更多详情
"""
    
    return summary

if __name__ == "__main__":
    summary = generate_summary()
    if summary:
        print(summary)
    else:
        print("⚠️ 未能获取到AI新闻，请稍后再试")
