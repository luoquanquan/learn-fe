# 53 - I. 在排序数组中查找数字 I

## 题目描述

统计一个数字在排序数组中出现的次数

### 示例 1

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
```

### 示例 2

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
```

### 提示

- 0 <= nums.length <= 105
- -109 <= nums[i] <= 109
- nums 是一个非递减数组
- -109 <= target <= 109

## 解题思路

### 整体思路

- 因为数组本身是有序的, 所以利用二分法可以降低时间复杂度, 但是因为数组中的数字存在重复, 所以找到 target 在数组中的左右边界非常重要.
- 最容易想到的方案就是, 利用二分法找到 target 在数组的左边界和右边界. 然后有边界减去左边界就会得道结果
- 分别查找 target 的左右边界逻辑会有差异. 那么就可以直接查找 target 的右边界和 target - 1 的右边界. 问题就变成了两个查询右边界的问题, 但是代码可以进行复用了

### 复杂度

- 时间复杂度: O(log(n)), 二分查找的时间复杂度是 O(log(n))
- 空间复杂度: O(1)O(1), 只需要保存左右边界和中间值即可

### 算法流程

- 首先确定左右边界, left = 0, right = nums.length - 1
- 当左边界不大于右边界的情况下进行查找
- 计算 mid = (left + right) / 2
- 如果 `nums[mid] <= target` 说明右边界在 `[mid + 1, right]` 中间, left = mid + 1
- 如果 `nums[mid] > target` 说明右边界在 `[left, mid - 1]` 中间, right = mid - 1

## 代码

```js
const getRightMargin = (nums, target) => {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        const mid = Number.parseInt((left + right) / 2)
        if (nums[mid] <= target) {
            left = mid + 1
        }

        if (nums[mid] > target) {
            right = mid - 1
        }
    }

    return left
}

const search = (nums, target) => getRightMargin(nums, target) - getRightMargin(nums, target - 1)

search([5,7,7,8,8,10], 10)
// 1

search([5,7,7,8,8,10], 9)
// 0

search([5,7,7,8,8,10], 8)
// 2

search([5,7,7,8,8,10], 6)
// 0
```
