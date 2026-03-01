# 21. 调整数组顺序使奇数位于偶数前面

## 题目描述

输入一个整数数组, 实现一个函数来调整该数组中数字的顺序. 使得所有奇数位于数组的前半部分. 偶数位于数组的后半部分

示例:
```
输入：nums = [1,2,3,4]
输出：[1,3,2,4]
注：[3,1,2,4] 也是正确的答案之一。
```

## 解题方案

双指针, 首先定义左右两个指针. 然后左指针定位到偶数位右指针定位到奇数位. 定位后两者互换位置. 直到遍历完所有的元素

## 算法流程

- 确定左右指针变量, 分别为数组的头尾元素
- 当 left < right 时, 说明该数组遍历还么有完成, 继续...
- 当 nums[left] 为奇数时 left++
- 当 nums[right] 为偶数是 right--
- 交换 left 和 right 的值
- 下一轮, 直到遍历完所有所有元素

## 代码

```js
const exchange = nums => {
    let left = 0
    let right = nums.length - 1

    while (left < right) {
        while (left < right && nums[left] % 2 === 1) {
            left++
        }

        while (left < right && nums[right] % 2 === 0) {
            right--
        }

        const temp = nums[left]
        nums[left] = nums[right]
        nums[right] = temp
    }

    return nums
}

exchange([1,2,3,4])
```

