#!/bin/bash
# 检查并发送消息脚本
# 由 OpenClaw 自动生成

MESSAGE_DIR="/tmp/openclaw-messages"
DATE=$(date +%Y-%m-%d)

# 检查消息目录是否存在
if [ ! -d "$MESSAGE_DIR" ]; then
    exit 0
fi

# 检查今天的面试题提醒
INTERVIEW_FILE="$MESSAGE_DIR/interview-${DATE}.txt"
if [ -f "$INTERVIEW_FILE" ]; then
    echo "[$(date '+%H:%M:%S')] 发现面试题提醒消息"
    cat "$INTERVIEW_FILE"
    # 发送后删除或移动（避免重复发送）
    mv "$INTERVIEW_FILE" "$INTERVIEW_FILE.sent"
fi

# 检查今天的AI新闻
NEWS_FILE="$MESSAGE_DIR/news-${DATE}.txt"
if [ -f "$NEWS_FILE" ]; then
    echo "[$(date '+%H:%M:%S')] 发现AI新闻消息"
    cat "$NEWS_FILE"
    # 发送后删除或移动
    mv "$NEWS_FILE" "$NEWS_FILE.sent"
fi
