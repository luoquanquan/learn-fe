# 61. 扑克牌中的顺子

## 题目描述

从扑克牌中随机抽 5 张牌, 判断是不是一个顺子. 即这 5 张牌是不是连续的. 2 ~ 10 位数字本身, A 为 1, J 为 11, Q 为 12, K 为 13, 而大小王为 0, 可以看成任何数字

示例 1:
```
输入: [1, 2, 3, 4, 5]
输出: true
```

示例 2:
```
输入: [0, 0, 1, 2, 5]
输出: true
```

## 解题方案

### 解题思路

- 首先对数组进行升序排序
- 如果数组中有重复的数, 直接返回 false
- 令 min 为不包含大小王的最小值, 如果 max - min > 5 则返回 false

### 复杂度

- 时间复杂度: O(nLog n)
- 空间复杂度: O(1)

## 代码

```js
const isStraight = nums => {
    nums.sort((a, b) => a - b)

    let commonIdx = 0
    for (let idx = 0; idx < nums.length; idx++) {
        const element = nums[idx]

        // 大小王不算
        if (element === 0) {
            commonIdx = idx + 1
            continue
        }

        // 如果你是对子, 肯定就不是顺子
        if (element === nums[idx + 1]) {
            return false
        }
    }

    // 最后一张普通牌 - 第一张普通牌应该小于 5
    return nums[nums.length - 1] - nums[commonIdx] < 5
}
```
