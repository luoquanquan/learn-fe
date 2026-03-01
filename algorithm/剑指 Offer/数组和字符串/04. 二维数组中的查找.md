# 04. 二维数组中的查找

## 题目描述

在一个 `n * m` 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

## 示例

现有矩阵 matrix 如下：

```js
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
```

给定 target = 5，返回  true。

给定  target = 20，返回  false。

限制:

`0 <= n <= 1000`

`0 <= m <= 1000`

## 解题思路

从矩阵左下角的数字开始, 他的上方的数比他小右边的数比他大. 所以从左下角开始. 如果当前数比 `target` 小就往右移动. 如果比 `target` 大就往上移动逐步向 `target` 靠近. 如果走到了矩阵的边界(也就是右上角)还没有找到合适的值. 那么说明矩阵中不存在指定的 `target` 值. 返回 `false`

## 示例代码

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if (matrix.length == 0)
        return false;

    let x = 0;
    let y = matrix.length - 1;

    while(x < matrix[0].length && y >= 0){
        if(matrix[y][x] > target) {
            y--;
        } else if(matrix[y][x] < target) {
            x++;
        } else {
            return true;
        }
    }

    return false;
};
```

