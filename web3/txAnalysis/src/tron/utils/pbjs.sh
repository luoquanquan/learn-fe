#!/bin/bash

# 生成 tron-proto.js 文件命令
# 1. 安装 protobufjs 和 protobufjs-cli
# 2. 下载 https://github.com/tronprotocol/protocol/releases 的最新版本
# 3. 将 proto 文件放在 protocol 目录下并解压
# 4. 执行本脚本即可生成完整 tron-proto.js 文件

pbjs \
  --path ./protocol \
  --target static-module \
  --wrap es6 \
  --force-long \
  --out tron-proto.js \
  $(find protocol/core -name "*.proto")