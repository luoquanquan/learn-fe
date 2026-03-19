# 03. 数组中重复的数字

## 题目描述

在一个长度为 n 的数组 nums 里的所有数字都在 n ~ n - 1 的范围内。数组中某些数字是重复的，但是不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1:

```
输入: [2, 3, 1, 0, 2, 5, 3]
输出: 2 或 3
```

## 解题方案

### 解题思路

使用 Set 来进行处理，遍历给定的数组往 Set 中添加，如果 Set 中已经存在当前元素了则返回该元素。

## 代码

```js
const findRepeatNumber = nums => {
    const set = new Set();

    for (let idx = 0; idx < nums.length; idx++) {
        const ele = nums[idx];

        if (set.has(ele)) {
            return ele;
        } else {
            set.add(ele);
        }
    }

    return -1;
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));
```
