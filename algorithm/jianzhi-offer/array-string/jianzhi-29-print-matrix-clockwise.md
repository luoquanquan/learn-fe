# 29. 顺时针打印矩阵

## 题目描述

输入一个矩阵, 按照从外向里以顺时针的顺序一次打印出每一个数字

示例 1:
```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

示例 2:
```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

## 代码

```js
const spiralOrder = matrix => {
    if (matrix.length === 0) {
        return []
    }

    let top = 0
    let bottom = matrix.length - 1

    let left = 0
    let right = matrix[0].length - 1

    let direction = 'right'

    const ret = []

    while (left <= right && top <= bottom) {
        switch (direction) {
            case 'right':
                for (let i = left; i <= right; i++) {
                    ret.push(matrix[top][i])
                }
                top++
                direction = 'down'
                break;

            case 'down':
                for (let i = top; i <= bottom; i++) {
                    ret.push(matrix[i][right])
                }
                right--
                direction = 'left'
                break;

            case 'left':
                for (let i = right; i >= left; i--) {
                    ret.push(matrix[bottom][i])
                }
                bottom--
                direction = 'up'
                break;

            case 'up':
                for (let i = bottom; i >= top; i--) {
                    ret.push(matrix[i][left])
                }
                left++
                direction = 'right'
                break;
            default:
                break;
        }
    }

    return ret
}
```
