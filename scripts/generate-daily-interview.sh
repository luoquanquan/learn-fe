#!/bin/bash
# 生成每日面试题脚本
# 由烤鱼 (AI Assistant) 创建

set -e

WORKSPACE="/root/.openclaw/workspace/learn-fe"
DATE=$(date +%Y-%m-%d)
FILE_PATH="$WORKSPACE/ai-interview-questions/$DATE.md"

# 确保目录存在
mkdir -p "$WORKSPACE/ai-interview-questions"

# 检查今天是否已生成
if [ -f "$FILE_PATH" ]; then
    echo "[$DATE] 面试题已存在，跳过生成"
    exit 0
fi

echo "[$DATE] 开始生成面试题..."

# 这里会调用 AI 生成面试题
# 实际生成由 OpenClaw 定时任务触发 sessions_spawn 完成
