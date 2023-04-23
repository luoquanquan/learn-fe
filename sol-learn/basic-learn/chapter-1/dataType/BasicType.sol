// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2.0 <0.9.0;

contract BasicType {
    function testInt() public pure returns(uint8) {
        uint8 i8 = 1;

        uint8 x = 8;
        uint16 y = 16;

        // y 可以赋值为 x
        y = x;

        // 但是 x 不能赋值为 y
        // x = y;

        // 可以通过强制类型转换实现赋值
        x = uint8(y);

        return i8;
    }

    enum OrderState{ layorder, payment }
    function enumTest()public pure returns(OrderState) {
        OrderState state = OrderState.layorder;
        return state;
    }
}
