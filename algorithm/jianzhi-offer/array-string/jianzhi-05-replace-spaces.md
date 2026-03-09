# 05. 替换空格

## 题目描述

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1：

输入：s = "We are happy."

输出："We%20are%20happy."

限制：

0 <= s 的长度 <= 10000

## 解题思路

创建一个新的字符串, 并遍历之前的字符串. 如果匹配到非空的字符直接添加到新的字符串中. 如果匹配到可空格则在新字符串中添加一个 `%20`

## 代码

```js
const replaceSpace = str => {
    let ret = ''

    for (let i = 0; i < str.length; i++) {
        const char = str[i]

        if (char === ' ') {
            ret += '%20'
        } else {
            ret += char
        }
    }

    return ret
}
```
