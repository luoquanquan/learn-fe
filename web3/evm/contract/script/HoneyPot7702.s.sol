// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from 'forge-std/Script.sol';
import {HoneyPot} from '../src/HoneyPot7702.sol';

contract HoneyPot7702Script is Script {
  HoneyPot public honeyPot;

  function setUp() public {}

  function run() public {
    vm.startBroadcast();
    honeyPot = new HoneyPot();
    vm.stopBroadcast();
  }
}
