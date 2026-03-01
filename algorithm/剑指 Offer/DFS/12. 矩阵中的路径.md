# 12. 矩阵中的路径

## 题目描述

请设计一个函数, 用来判断一个字符串中是否存在一条包含某字符串所有字符的路径. 路径可以从矩阵的任意一格开始, 每一步都可以在矩阵中 ↑ ↓ ← → 移动一格, 如果一条路经过了矩阵的某一格. 那么该路径不能再进入该格子. 例如在以下矩阵中包含了 `bfce` 路径.

```
[
    ["a", "b", "c", "e"],
    ["s", "f", "c", "s"],
    ["a", "d", "e", "e"]
]
```
但是不能够包含字符串 `abfb` 因为路径占用了 `b` 之后就不能再次进入这个格子了

示例 1:
```
输入: board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
], word = "ABCCED"

输出: true
```

示例 2:
```
输入: board = [
    ["a", "b"],
    ["c", "d"]
], word = "abcd"

输出: false
```

## 解题方案

### 解题思路

深度优先搜索. 从一个节点搜索到底, 再回溯上一个节点, 沿另一个方向继续搜索, 递归执行. 在搜索过程中, 如果遇到该路径不可能与目标字符串匹配的情况则立即返回.

### 算法流程

- 递归参数: 当前元素在矩阵 `board` 中的行列索引 `i` 和 `j`, 当前目标字符在 word 中的索引 `k`.
- 终止条件:
  - 行或列索引越界或当前矩阵元素与目标字符不同, 返回 false
  - 目标字符串全部匹配成功, 返回 true
- 将当前元素的值暂存在 temp 中, 修改为字符 '/' 以此标记为该元素已访问. 通过 temp 变量值可以免去新建一个访问过的字符串数组, 节省空间
- 向其他方向继续搜索, 并记录结果, 遇到 false 则返回
- 将 temp 值还原到当前元素
- 返回结果

## 代码

```js
const dfs = (board, words, i, j, k) => {
    if (i >= board.length || i < 0) {
        return false
    }

    if (j >= board[0].length || j < 0) {
        return false
    }

    if (board[i][j] !== words[k]) {
        return false
    }

    if (k === words.length - 1) {
        return true
    }

    const temp = board[i][j]
    board[i][j] = '/'
    const ret = dfs(board, words, i - 1, j, k + 1) || dfs(board, words, i + 1, j, k + 1) || dfs(board, words, i, j - 1, k + 1) || dfs(board, words, i, j + 1, k + 1)
    board[i][j] = temp
    return ret
}

const exist = (board, word) => {
    const words = [...word]
    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        for (let j = 0; j < element.length; j++) {
            if (dfs(board, words, i, j, 0)) {
                return true
            }
        }
    }

    return false
}

// console.log(exist([
//     ["A","B","C","E"],
//     ["S","F","C","S"],
//     ["A","D","E","E"]
// ], "ABCCED"))

console.log(exist([
    ["a", "b"],
    ["c", "d"]
], "abcd"))
```

