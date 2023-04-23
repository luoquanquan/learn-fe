// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2.0 <0.9.0;

// 静态数组, 数组的长度在数组声明的时候就已经确定, 程序运行过程中不能修改
// 动态数组, 在声明数组时并不执行数组的长度, 程序执行过程中可以修改其长度
contract Array {
    // 默认值为每个元素都是 0
    uint8[3] data;
    uint8[] ddata;

    // public: 只能对应 memory
    // internal: 可以是 storage
    // 成员变量都是存在 storage 中需要持久化的, public 中返回的 memory 的状态变量实际上是进行了一次数据的拷贝
    function testStaticArray() public {
        // 写成员变量的函数就不能是 view 了
        data[0] = 10;
    }

    function getStaticArray() public view returns(uint8[3] memory) {
        return data;
    }

    function testDynamicStorageArray() public {
        ddata.push(1);
    }

    function getDynamicStorageArray() public view returns(uint8[] memory) {
        return ddata;
    }

    // 内存中的动态数组, 这里的动态指的是程序运行过程中再初始化. 可以动态指定数组的长度
    // 但是初始化过程中一旦指定了数组的长度就不能使用 push pop 之类的方法修改数组长度了
    function testMemoryDynamicArray(uint8 size) public pure returns(uint8[] memory) {
        uint8[] memory mdata = new uint8[](size);
        return mdata;
    }
}
