#!/bin/bash
# 面试题提醒推送脚本
# 每天早上8点执行

export HOME=/root
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
LOG_FILE="/var/log/interview-reminder.log"

# 生成消息内容
MESSAGE=$(python3 /root/.openclaw/workspace/learn-fe/scripts/ai_news_agent.py interview 2>&1)

if [ -z "$MESSAGE" ]; then
    echo "[$DATE $TIME] 错误：无法生成消息" >> $LOG_FILE
    exit 1
fi

# 保存消息到特定文件
mkdir -p /tmp/openclaw-messages
echo "$MESSAGE" > "/tmp/openclaw-messages/interview-${DATE}.txt"

echo "[$DATE $TIME] 面试题提醒已准备" >> $LOG_FILE
