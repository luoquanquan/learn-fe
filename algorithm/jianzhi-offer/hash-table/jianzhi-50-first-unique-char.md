# 50. 第一个只出现一次的字符

## 题目描述

在字符串 `s` 中找出第一个只出现一次的字符。如果没有，返回一个单空格，`s` 只包含小写字母⋯⋯

示例 1:
```
输入: s = 'abaccdeff'
输出: b
```

示例 2:
```
输入: s = ''
输出: ''
```

## 解题方案

### 解题思路

- 首先定义一个 Map
- 遍历 s, 如果 map 中没有当前的元素设置其为 map 元素，如果 map 中存在当前元素，则把 map\[ele\] 设置为 false
- 再次遍历 s, 找到第一个 map 中值为 truthy 的元素并返回
- 如果上一步中没有找到对应的元素，则返回 ''

### 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)

## 代码

```js
const firstUniqChar = s => {
    const map = new Map()

    for (const char of s) {
        map.set(char, !map.has(char))
    }

    for (const char of s) {
        if (map.get(char)) {
            return char
        }
    }

    return ''
}

console.log(firstUniqChar('abaccdeff'));
```
