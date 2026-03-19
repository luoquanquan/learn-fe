# 57. 和为 s 的两个数字

## 题目描述

输入一个递增数组和一个数字 n, 在数组中查找两个数，使得他们的和正好是 n. 如果存在多组这样的数字输出其中的一组即可。

示例 1:
```
输入: nums = [2,7,11,15], n = 9
输出: [2,7] 或者 [7,2]
```

示例 2:
```
输入：nums = [10,26,30,31,47,60], n = 40
输出：[10,30] 或者 [30,10]
```

限制：
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^6

## 解题方案

定义 i, j 两个指针分别指向数组的第一个和最后一个元素。然后计算两者的值和 n 的比较。如果两数的和大于 n 则右指针左移减小两数的和，如果两数的和小于 n 则右移左指针增大两数的和。直至找到结果

### 算法流程

- 首先初始化双指针，i = 0, j = nums.length - 1
- 当 i < j 时，始终进行循环遍历
- 比较 `nums[i] + nums[j]` 和 `target` 的大小
- 如果 `nums[i] + nums[j] > target` j--
- 如果 `nums[i] + nums[j] < target` i++
- 如果 `nums[i] + nums[j] === target`. 找到结果

### 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)

## 代码

```js
const twoSum = (nums, target) => {
    let i = 0
    let j = nums.length - 1

    while (i < j) {
        const numberI = nums[i]
        const numberJ = nums[j]
        const sum = numberI + numberJ

        if (sum > target) {
            j--
        } else if (sum < target) {
            i++
        } else {
            return [numberI, numberJ]
        }
    }

    return 'Not have a suitable result ~'
}
```
