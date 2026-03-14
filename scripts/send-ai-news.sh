#!/bin/bash
# 每日AI新闻总结发送脚本 - 由烤鱼创建
# 每天下午6点执行

export HOME=/root
export PATH=/root/.nvm/versions/node/v24.14.0/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
LOG_FILE="/var/log/ai-news-daily.log"
SCRIPT_DIR="/root/.openclaw/workspace/learn-fe/scripts"

echo "[$DATE $TIME] 开始获取AI新闻..." >> $LOG_FILE

# 运行Python脚本获取新闻
NEWS_CONTENT=$(python3 "$SCRIPT_DIR/ai_news_daily.py" 2>&1)

if [ -z "$NEWS_CONTENT" ] || [[ "$NEWS_CONTENT" == *"未能获取"* ]]; then
    echo "[$DATE $TIME] 警告：未能获取新闻内容" >> $LOG_FILE
    exit 1
fi

echo "[$DATE $TIME] 新闻获取成功，准备发送..." >> $LOG_FILE

# 将新闻内容保存到文件，供后续发送
NEWS_FILE="/tmp/ai_news_${DATE}.txt"
echo "$NEWS_CONTENT" > "$NEWS_FILE"

echo "[$DATE $TIME] AI新闻已保存到 $NEWS_FILE" >> $LOG_FILE
echo "[$DATE $TIME] 任务完成" >> $LOG_FILE
