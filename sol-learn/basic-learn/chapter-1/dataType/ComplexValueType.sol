// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2.0 <0.9.0;

contract ComplexValueType {
    function testAddress() public view returns(address) {
        // msg.sender 就是当前调用合约函数的账号
        address addr = msg.sender;
        return addr;
    }

    function testSelfAddress() public view returns(address) {
        // address(this) 返回当前合约的地址
        // 实际上就是将合约类型的数据强制转换成地址类型数据的过程
        address addr = address(this);
        return addr;
    }

    // Contract Type
    function testContract() public view returns(ComplexValueType) {
        ComplexValueType myContract = this;
        return myContract;
    }

    // 定长字节数组
    function testFixedByteArray() public pure returns(bytes1) {
        // 默认初始值都是 0
        bytes3 data;
        // 赋值
        data = 0x111111;
        // 可以取下标, 但是不能赋值 
        // data[0] = 8; // 这样会报错
        bytes1 x = data[0];

        return x;
    }
}