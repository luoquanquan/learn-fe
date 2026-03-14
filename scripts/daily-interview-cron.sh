#!/bin/bash
# 每日面试题生成器 - 由烤鱼创建
# 每天早上8点执行

export HOME=/root
export PATH=/root/.nvm/versions/node/v24.14.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

DATE=$(date +%Y-%m-%d)
FILE="/root/.openclaw/workspace/learn-fe/ai-interview-questions/${DATE}.md"

# 检查是否已存在
if [ -f "$FILE" ]; then
    echo "[$DATE] 面试题已存在"
    exit 0
fi

# 使用 OpenClaw 发送消息给圈圈，请求生成面试题
openclaw message --channel feishu --to "ou_cd0c043e6c49b772d8943dd1b8563338" "🌅 早上好！我是烤鱼。

今天的面试题时间到了！请稍等，我正在为你生成10道面试题...

涉及方向：AI / Web3 / 前端
难度：进阶
格式：参考 ai-interview-questions/2026-03-14.md"

echo "[$DATE] 已发送提醒消息"
