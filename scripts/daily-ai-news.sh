#!/bin/bash
# 每日AI新闻总结 - 由烤鱼创建
# 每天下午6点执行

export HOME=/root
export PATH=/root/.nvm/versions/node/v24.14.0/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
LOG_FILE="/var/log/ai-news-daily.log"

echo "[$DATE $TIME] 开始获取AI新闻..." >> $LOG_FILE

# 使用 jina.ai 提取 Hacker News 热门内容
NEWS=$(curl -s "https://r.jina.ai/http://news.ycombinator.com" --max-time 30 2>/dev/null | grep -oP '\d+\.\[\]\(http[^)]*\)\s*\[([^\]]+)\]' | head -15)

# 如果没有获取到内容，使用备用方案
if [ -z "$NEWS" ]; then
    echo "[$DATE $TIME] 警告：未能获取新闻内容" >> $LOG_FILE
    exit 1
fi

echo "[$DATE $TIME] 新闻获取成功" >> $LOG_FILE

# 构建消息（简化版，实际发送由OpenClaw处理）
echo "🌆 晚上好！我是烤鱼。"
echo ""
echo "📰 今日AI热门新闻摘要"
echo "━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "已为你收集今天最火的AI新闻，"
echo "发送 '/ai新闻' 查看最新详情！"
echo ""
echo "⏰ $DATE $TIME"
