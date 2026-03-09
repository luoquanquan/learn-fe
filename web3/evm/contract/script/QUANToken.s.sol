// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from 'forge-std/Script.sol';
import {QUANToken} from '../src/QUANToken.sol';

contract QUANTokenScript is Script {
  QUANToken public quanToken;

  function setUp() public {}

  function run() public {
    vm.startBroadcast();

    // 精度 6，总供应量 100 万（按最小单位）
    uint8 decimals_ = 6;
    uint256 totalSupply_ = 1_000_000 * (10 ** uint256(decimals_));

    quanToken = new QUANToken('QUANToken', 'QUAN', decimals_, totalSupply_);

    vm.stopBroadcast();
  }
}
