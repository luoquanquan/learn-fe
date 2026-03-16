#!/bin/bash
# AI新闻推送脚本 - 实际发送消息给用户
# 这个脚本会被cron调用，并通过OpenClaw Gateway发送消息

export HOME=/home/ubuntu
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
WORKSPACE="/home/ubuntu/.openclaw/workspace/learn-fe"
LOG_FILE="$WORKSPACE/logs/ai-news.log"

# 生成消息内容
MESSAGE=$(python3 "$WORKSPACE/scripts/ai_news_agent.py" news 2>&1)

if [ -z "$MESSAGE" ] || [[ "$MESSAGE" == *"Error"* ]]; then
    echo "[$DATE $TIME] 错误：无法生成消息" >> $LOG_FILE
    exit 1
fi

# 保存消息到特定文件，供主session读取
mkdir -p /tmp/openclaw-messages
echo "$MESSAGE" > "/tmp/openclaw-messages/news-${DATE}.txt"

echo "[$DATE $TIME] AI新闻消息已生成，等待推送" >> $LOG_FILE
echo "[$DATE $TIME] AI新闻推送完成" >> $LOG_FILE
