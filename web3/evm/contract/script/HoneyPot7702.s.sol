// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from 'forge-std/Script.sol';
import {HoneyPot7702} from '../src/HoneyPot7702.sol';

contract HoneyPot7702Script is Script {
  HoneyPot7702 public honeyPot7702;

  function setUp() public {}

  function run() public {
    vm.startBroadcast();
    honeyPot7702 = new HoneyPot7702();
    vm.stopBroadcast();
  }
}
