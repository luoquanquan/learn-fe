# 58 - I. 翻转单词顺序

## 题目描述

输入一个英文句子，翻转句子中单词的顺序，但是单词内字符的顺序不变。为了简单起见标点符号和普通字母一样处理。例如输入字符串 `I am a student.` 则输出 `student. a am I`

示例 1:
```
输入: "the sky is blue"
输出: "blue is sky the"
```

示例 2:
```
输入: "  hello world!  "
输出: "world! hello"
解释: trim 掉输入中的空格
```

示例 3:
```
输入: "a good   example"
输出: "example good a"
解释: 如果两个单词中有多余的空格, 则只保留一个单词
```

## 解题方案

### 整体思路

先将开头和结尾处的多余的空格去掉，从后向前遍历。通过前后指针锁定单词，跳过中间的空格，最终将整个句子中的单词反转。

### 算法流程

- 首先将原始字符串去掉开头和结尾的空格得到 tmp, 便于之后直接从单词处理开始
- 初始化单词起始位置 start 和单词结束位置 end 指针，位置在字符串的结尾处 (因为要倒着遍历)
- 初始化结果字符串 ret
- 当 start >= 0 时，说明遍历尚未结束，继续执行
- 如果 `tmp[start]` 位置不是空格，说明还没有获取到完整的单词，start--
- 获取到完整的单词之后，截取 `[start + 1, end + 1]` 这一段字符串加入到结果字符串中，翻转单词
- 如果 `tmp[start]` 位置仍然为空格，说明还没有到下一个单词的结尾位置，start--
- 找到单词结尾的位置后，end = start 开始查找下一个单词

### 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)

## 代码

```js
const reverseWords = s => {
    let start = s.length - 1
    let end = s.length - 1
    let ret = ''

    const tmp = s.trim()

    while (start >= 0) {
        while (start >= 0 && !/ /.test(tmp[start])) {
            start--
        }

        ret += tmp.slice(start + 1, end + 1) + ' '

        while (start >= 0 && / /.test(tmp[start])) {
            start--
        }
        end = start
    }

    return ret.trim()
}
```
