# 11. 旋转数组的最小数字

## 题目描述

把一个数组最开始的若干个元素搬到数组的末尾, 我们称之为数组的旋转. 输入一个递增排序的数组的一个旋转, 输出旋转数组的最小元素. 例如, 数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转, 该数组的最小值为 1

示例 1:
```
输入：[3,4,5,1,2]
输出：1
```

实例 2:
```
输入：[2,2,2,0,1]
输出：0
```

## 解题思路

二分查找, 数组是一个有序数组的旋转. 可以得出数组是有顺序的. 有序数组就要想到二分法

## 算法流程

- 初始化 left 和 right 两个指针
- 每次都获取中间下标 `const mid = parseInt((left + right) / 2)`
- 因为数组是旋转得来的. 如果中间的数比右边的数小, 说明最小值在 [left, mid] 所以 right = mid
- 如果中间的数比右边的数大, 说明最小值在 [mid + 1, right] 所以 left = mid + 1
- 如果中间的数和右边的数大小相等, 则不知道最小值的位置. 此时让 right-- 缩小搜索范围继续查找

PS: 为什么通过 right-- 缩小搜索范围而不是用 left++?
- 因为数组是升序的, 所以最小值应该靠左.
- 如果存在 [1,2,2,2,2] 这种情况时候, left = 0, right = 4, mid = 2. 满足中间值和右侧的值相等. 如果 left++ 就 GG 了

## 代码

```js
const minArray = numbers => {
    let left = 0
    let right = numbers.length - 1

    while (left < right) {
        const mid = parseInt((left + right) / 2)

        if (numbers[mid] < numbers[right]) {
            right = mid
        } else if (numbers[mid] > numbers[right]) {
            left = mid + 1
        } else {
            right--
        }
    }

    return numbers[left]
}

console.log(minArray([3,4,5,1,2]))
```
