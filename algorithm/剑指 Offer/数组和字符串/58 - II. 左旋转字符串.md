# 58 - II. 左旋转字符串

## 题目描述

字符串左旋操作是把字符串前边的若干个字符转移到字符串的尾部. 请定义一个函数实现字符串左旋的功能. 比如输入字符串 "abcdefg" 和数字 2. 该函数返回左旋两位得到的结果 "cdefgab"

示例 1:
```
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

示例 2:
```
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```

## 解题方案

### 解题思路

- 首先定义一个新的结果字符串
- 从原字符串的第 k 位开始遍历, 逐个添加到新的字符串里
- 从原字符串的头开始遍历到 k - 1, 逐个添加到新的字符串里
- 返回结果

### 复杂度

- 时间复杂度: O(n)
- 空间复杂度: O(n)

## 代码

```js
const reverseLeftWords = (s, k) => {
    let ret = ''

    for (let i = k; i < s.length; i++) {
        ret += s[i];
    }

    for (let i = 0; i < k; i++) {
        ret += s[i];
    }

    return ret
}
```
