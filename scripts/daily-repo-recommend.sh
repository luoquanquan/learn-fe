#!/bin/bash
# GitHub 项目推荐定时任务脚本
# 每天晚上 8 点执行

export PATH="/usr/local/bin:$PATH"
export PATH="/home/ubuntu/.local/bin:$PATH"

# 设置工作目录
cd /home/ubuntu/.openclaw/workspace/learn-fe

# 运行 Python 脚本
/usr/bin/python3 scripts/generate-repo-recommend.py >> /tmp/repo-recommend.log 2>&1
