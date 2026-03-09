#!/usr/bin/env bash

set -euo pipefail

# 简化版部署脚本：
# - 从 .env 中读取 RPC_URL / PRIVATE_KEY（若存在）
# - 部署 WangToken 与 WangDex，并写入前端地址

# 从 .env 读取变量（仅当当前环境中未设置时）
if [[ -f ".env" ]]; then
  # 过滤掉注释和空行，只处理 RPC_URL / PRIVATE_KEY
  while IFS='=' read -r key value; do
    case "$key" in
      RPC_URL|PRIVATE_KEY)
        if [[ -z "${!key:-}" ]]; then
          export "$key"="$value"
        fi
        ;;
    esac
  done < <(grep -v '^#' .env | sed '/^[[:space:]]*$/d')
fi

if [[ -z "${RPC_URL:-}" || -z "${PRIVATE_KEY:-}" ]]; then
  echo "错误: 请在环境变量或 .env 中配置 RPC_URL 和 PRIVATE_KEY"
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "用法: $0 <BaseName>"
  echo "示例: $0 Counter  # 对应 script/Counter.s.sol:CounterScript"
  exit 1
fi

BASE_NAME="$1"
SCRIPT_FILE="script/${BASE_NAME}.s.sol"
SCRIPT_CONTRACT="${BASE_NAME}Script"

echo "使用 RPC_URL=${RPC_URL}"
echo "开始部署合约: ${SCRIPT_FILE}:${SCRIPT_CONTRACT} ..."

forge script "${SCRIPT_FILE}:${SCRIPT_CONTRACT}" \
  --rpc-url "${RPC_URL}" \
  --private-key "${PRIVATE_KEY}" \
  --broadcast \
  -vv

echo "部署完成, 开始同步前端 ABI 与地址..."

# 1. 解析链 ID（用于找到最新的 broadcast 文件）
CHAIN_ID=$(cast chain-id --rpc-url "${RPC_URL}")

BROADCAST_FILE="broadcast/${BASE_NAME}.s.sol/${CHAIN_ID}/run-latest.json"
ARTIFACT_FILE="out/${BASE_NAME}.sol/${BASE_NAME}.json"

if [[ ! -f "${BROADCAST_FILE}" ]]; then
  echo "警告: 未找到 broadcast 文件: ${BROADCAST_FILE}"
  exit 0
fi

if [[ ! -f "${ARTIFACT_FILE}" ]]; then
  echo "警告: 未找到构建产物: ${ARTIFACT_FILE}"
  exit 0
fi

# 2. 从 broadcast 中读取最后一个 CREATE 交易的合约地址
CONTRACT_ADDRESS=$(jq -r '.transactions[] | select(.transactionType == "CREATE") | .contractAddress' "${BROADCAST_FILE}" | tail -n 1)

if [[ -z "${CONTRACT_ADDRESS}" || "${CONTRACT_ADDRESS}" == "null" ]]; then
  echo "警告: 未能从 ${BROADCAST_FILE} 提取合约地址"
  exit 0
fi

echo "已部署 ${BASE_NAME} 地址: ${CONTRACT_ADDRESS}"

# 3. 同步到 web3/webRepo/evm/contracts
FRONTEND_CONTRACTS_DIR="../../webRepo/evm/contracts"
FRONTEND_ABI_DIR="${FRONTEND_CONTRACTS_DIR}/abis"
FRONTEND_ADDRESS_FILE="${FRONTEND_CONTRACTS_DIR}/addresses.json"

mkdir -p "${FRONTEND_ABI_DIR}"

# 3.1 导出 ABI 到 abis/<BaseName>.json
jq '.abi' "${ARTIFACT_FILE}" > "${FRONTEND_ABI_DIR}/${BASE_NAME}.json"
echo "已写入 ABI -> ${FRONTEND_ABI_DIR}/${BASE_NAME}.json"

# 3.2 更新 addresses.json 中对应的地址
mkdir -p "${FRONTEND_CONTRACTS_DIR}"
if [[ ! -f "${FRONTEND_ADDRESS_FILE}" ]]; then
  echo '{}' > "${FRONTEND_ADDRESS_FILE}"
fi

TMP_FILE="$(mktemp)"
jq --arg name "${BASE_NAME}" --arg addr "${CONTRACT_ADDRESS}" '.[$name] = $addr' \
  "${FRONTEND_ADDRESS_FILE}" > "${TMP_FILE}"
mv "${TMP_FILE}" "${FRONTEND_ADDRESS_FILE}"

echo "已更新地址 -> ${FRONTEND_ADDRESS_FILE} (${BASE_NAME} = ${CONTRACT_ADDRESS})"

echo "全部完成"
