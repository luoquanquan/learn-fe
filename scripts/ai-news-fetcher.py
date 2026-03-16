#!/usr/bin/env python3
"""
AI 新闻抓取器
由烤鱼创建 - 抓取热门 AI 新闻源
"""

import feedparser
import json
from datetime import datetime
from urllib.parse import urljoin

# AI 新闻 RSS 源
AI_FEEDS = {
    "TechCrunch AI": "https://techcrunch.com/category/artificial-intelligence/feed/",
    "MIT Technology Review": "https://www.technologyreview.com/feed/",
    "The Verge AI": "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    "Hacker News": "https://news.ycombinator.com/rss",
    "AI News (OpenAI)": "https://openai.com/blog/rss.xml",
    "Papers with Code": "https://paperswithcode.com/rss",
}

def fetch_feed(name, url):
    """抓取单个 RSS 源"""
    try:
        feed = feedparser.parse(url)
        entries = []
        for entry in feed.entries[:5]:  # 只取前5条
            entries.append({
                "title": entry.get("title", "无标题"),
                "link": entry.get("link", ""),
                "published": entry.get("published", ""),
                "summary": entry.get("summary", "")[:200] + "..." if entry.get("summary") else "",
            })
        return {"name": name, "entries": entries}
    except Exception as e:
        return {"name": name, "error": str(e)}

def main():
    print(f"🤖 AI 新闻抓取 - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 50)
    
    for name, url in AI_FEEDS.items():
        print(f"\n📰 {name}")
        print("-" * 50)
        
        result = fetch_feed(name, url)
        if "error" in result:
            print(f"  错误: {result['error']}")
            continue
            
        for i, entry in enumerate(result["entries"], 1):
            print(f"\n  {i}. {entry['title']}")
            print(f"     {entry['link']}")
            if entry['published']:
                print(f"     发布时间: {entry['published']}")

if __name__ == "__main__":
    main()
