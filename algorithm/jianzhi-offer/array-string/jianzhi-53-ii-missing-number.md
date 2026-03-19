# 53 - II. 0～n-1中缺失的数字

## 题目描述

一个长度为 n-1 的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围 0~n-1 之内。在范围 0～n-1 内的 n 个数字中有且只有一个数字不在该数组中，请找出这个数字。

示例 1:
```
输入: [0,1,3]
输出: 2
```

实例 2:
```
输入: [0,1,2,3,4,5,6,7,9]
输出: 8
```

限制：

1 <= 数组长度 <= 10000

## 解题方案

### 题目分析

这个题目说白了就是一个小孩儿数数，12345⋯⋯但是数着数着丢了一个。然后让你把这个丢了的找出来。

### 算法流程

- 首先，已经排序的数组那肯定要有二分法。找到初始的左右边界并计算中间序号 `left = 0, right = nums.length - 1, mid = Number.parseInt((left + right) / 2)`
- 判断 `nums[mid] === mid` 说明缺失的元素在右侧：left = mid + 1
- 如果 `nums[mid] !== mid` 说明缺失的元素在左侧：right = mid - 1

### 复杂度

- 时间复杂度：O(logn)
- 空间复杂度：O(1)

## 代码

```js
const getMissingNumber = nums => {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        const mid = Number.parseInt((left + right) / 2)

        if (nums[mid] === mid) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return left
}
```
