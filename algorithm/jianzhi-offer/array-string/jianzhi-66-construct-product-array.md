# 66. 构建乘积数组

## 题目描述

给定一个数组 A[0, 1, 2 ⋯⋯n - 2, n - 1], 请构建一个数组 B[0, 1, 2 ⋯⋯m - 1], 其中 B 的元素 B[i] = A[0] * A[1] * A[2] * A[i - 1] * A[i + 1] * ⋯⋯* A[n - 1]. 也就是说，B[i] 等于 A[i] 之外所有 A 的元素的乘积。

PS: 不能使用除法

示例：
```
输入: [1, 2, 3, 4, 5]
输出: [120, 60, 40, 30, 24]
```

## 解题方案

### 解题思路

- 如果可以用除法的话，可以先求出 A 数组所有项的乘积，然后分别除以对应的项就可以得出 B 数组。
- 解法 1 硬刚。构造和数组 A 等长的 B 数组，一个一个算
- 解法 2 分步
  - 首先，把 i 左边的数相乘并记录
  - 其次，把 i 右边的数相乘并记录
  - 最后用左边的结果乘以右边的结果

### 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)

## 代码

### 方案 1

```js
const constructArr = A => {
    const B = new Array(A.length).fill(null)

    B.forEach((eleB, idxB) => {
        A.forEach((eleA, idxA) => {
            if (idxA !== idxB) {
                if (B[idxB]) {
                    B[idxB] *= eleA
                } else {
                    B[idxB] = eleA
                }
            }
        })
    })

    return B
}
```

### 方案 2

leetCode 的解析如下图：

![](http://handle-note-img.niubishanshan.top/20221019-025303.gif)

```js
const constructArr = A => {
    const ret = []
    let left = 1
    let right = 1

    // 计算 i 左边的值
    for (let i = 0; i < A.length; i++) {
        ret[i] = left
        left *= A[i]
    }

    // 乘以 i 右边的值
    for (let i = A.length - 1; i >= 0 ; i--) {
        ret[i] *= right
        right *= A[i]
    }

    return ret
}
```

