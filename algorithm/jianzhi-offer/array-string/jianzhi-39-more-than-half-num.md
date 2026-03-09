# 39. 数组中出现次数超过一半的数字

## 题目描述

数组中有一个数字出现的次数超过数组长度的一半, 请找出这个数字.

你可以假设数组是非空的, 并且给定的数组总是存在多数元素.

实例 1:
```js
输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2
```

限制:
```js
1 <= 数组长度 <= 50000
```

## 解题方案

### 解法一: 哈希技术

遍历 `nums` 数组, 将数字作为 `Object` 的一个 `key` 存储. 如果对象中已经存在 `key` 则执行 `++`, 遍历完成后再遍历一遍 `Object`, 找到出现次数大于一半的 `key` 即可

```js
const majorityElement = nums => {
    const obj = {}
    nums.forEach(ele => {
        obj[ele] ? obj[ele]++ : obj[ele] = 1
    })

    for (const idx in obj) {
        if (obj[idx] > (nums.length / 2)) {
            return +idx
        }
    }
}

majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2])
// 2
```

### 解法二: 摩尔投票

遍历 `nums` 数组, 使用 `count` 进行计数. 记录当前出现的数字为 `cur`, 如果遍历到的 `ele` 和 `cur` 相等. 则 count 自增, 否则自减, 当其减小为 0 时则将 `cur` 修改为当前遍历的 `ele`, 通过增减抵消的方式, 最终达到剩下的数字是结果的效果, 时间复杂度为 O(n)

#### 算法流程

1. 初始化: 预期结果 cur = 0 和计数器 count = 0
2. 遍历数组 nums, 遍历过程中取到的数字为 ele
3. 当 count 为 0 时, 表示不同的数字已经将当前的结果抵消掉了. 可以换新的数字进行尝试, 则 cur = ele
4. 当 ele = cur 时, 表示遍历的数字和预期结果相同则计数器 count ++
5. 当 ele != cur 时, 表示遍历的数字和预期结果不同则计数器 count --
6. 最终留下的数字 cur 就是最终的结果. 出现次数超过一半的数字一定不会被抵消掉, 最后保留了下来.

```js
const majorityElement = nums => {
  let count = 0
  let cur

  nums.forEach(ele => {
    if (count === 0) {
      cur = ele
    }

    if (cur === ele) {
      count ++
    } else {
      count --
    }
  })

  return cur
}

majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2])
```

