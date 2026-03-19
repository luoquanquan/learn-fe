# 57 - II. 和为 s 的连续正数序列

## 题目描述

输入一个正整数，输出所有和为 target 的连续正整数序列(至少含有两个数)。序列内的数字由小到大的排列

示例 1:
```
输入: target = 9
输出: [[2,3,4],[4,5]]
```

示例 2:
```
输入: target = 15
输出: [[1,2,3,4,5],[4,5,6],[7,8]]
```

限制：1 <= target <= 10^5

## 解题方案

### 整体思路

- 最容易想到的方案是暴力枚举, 因为题目要求至少包含两个数. 所以枚举到 target/2 即可停止. 时间复杂度比较高
- 更好的方式是使用滑动窗口, 设置左右指针. 从开始位置维护一个子数组作为窗口. 判断该窗口是否求和为 target, 如果是则将结果加入, 如果小于 target 则窗口右移, 大于 target 则窗口左移

### 算法流程

- 首先初始化窗口, i = 1, j = 2
- 当 i < j 时始终维护该窗口, 只有当到达边界位置时, 窗口之和 sum > target
- 根据求和公式 sum = (i + j) * (j - i + 1) / 2 可以直接计算出滑动窗口之和
- 当 sum == target 时，将窗口放入结果数组中，并且窗口左侧右移一位。保证窗口是右移的趋势
- 当 sum < target 时, 说明窗口结果需要变大, j++
- 当 sum > target 时，说明窗口结果需要变小，i++

### 复杂度

- 时间复杂度：O(target). 滑动窗口最多移动 target/2 次
- 空间复杂度：O(1). 排除必要的存储结果数组之外，只需要保存左右指针

## 代码

```js
const getSum = (left, right) => (left + right) * (right - left + 1) / 2
const getSection = (left, right) => {
    const section = []

    for (let i = left; i <= right; i++) {
        section.push(i)
    }

    return section
}

const findContinuousSequence = target => {
    let i = 1
    let j = 2
    const ret = []

    while (i < j) {
        if (getSum(i, j) === target) {
            ret.push(getSection(i, j))

            // 窗口往右移动
            i++
        } else if (getSum(i, j) < target) {
            j++
        } else {
            i++
        }
    }

    return ret
}
```
