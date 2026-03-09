// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from 'openzeppelin-contracts/contracts/token/ERC20/ERC20.sol';

contract QUANToken is ERC20 {
  uint8 private immutable _customDecimals;

  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint256 _totalSupply
  ) ERC20(_name, _symbol) {
    _customDecimals = _decimals;
    _mint(msg.sender, _totalSupply);
  }

  function decimals() public view virtual override returns (uint8) {
    return _customDecimals;
  }
}
