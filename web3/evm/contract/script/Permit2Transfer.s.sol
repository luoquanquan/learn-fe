// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from 'forge-std/Script.sol';
import {Permit2Transfer} from '../src/Permit2Transfer.sol';

contract Permit2TransferScript is Script {
  Permit2Transfer public permit2Transfer;

  function setUp() public {}

  function run() public {
    vm.startBroadcast();
    permit2Transfer = new Permit2Transfer();
    vm.stopBroadcast();
  }
}
