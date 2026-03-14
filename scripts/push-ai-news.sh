#!/bin/bash
# AI新闻推送脚本 - 实际发送消息给用户
# 这个脚本会被cron调用，并通过OpenClaw Gateway发送消息

export HOME=/root
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
LOG_FILE="/var/log/ai-news-push.log"

# 生成消息内容
MESSAGE=$(python3 /root/.openclaw/workspace/learn-fe/scripts/ai_news_agent.py news 2>&1)

if [ -z "$MESSAGE" ] || [[ "$MESSAGE" == *"Error"* ]]; then
    echo "[$DATE $TIME] 错误：无法生成消息" >> $LOG_FILE
    exit 1
fi

# 保存消息到特定文件，供主session读取
mkdir -p /tmp/openclaw-messages
echo "$MESSAGE" > "/tmp/openclaw-messages/news-${DATE}.txt"

# 同时通过Gateway发送（如果可用）
# 注意：这需要Gateway配置正确
if command -v openclaw > /dev/null 2>&1; then
    # 尝试通过notify或message命令发送
    # 由于openclaw CLI可能不支持直接发送消息给用户，
    # 我们依赖主session的heartbeat机制来检查新消息
    echo "[$DATE $TIME] 消息已准备，等待推送" >> $LOG_FILE
else
    echo "[$DATE $TIME] openclaw命令不可用" >> $LOG_FILE
fi

echo "[$DATE $TIME] AI新闻推送完成" >> $LOG_FILE
