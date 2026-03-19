# 48. 最长不含重复字符的子字符串

## 题目描述

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

示例 1:
```
输入: "abcabcbb"
输出: 3
解释: 无重复的最长子串为 abc, 所以长度为 3
```

示例 2:
```
输入: "bbbb"
输出: 1
解释: 无重复的最长子串为 b, 所以长度为 1
```

示例 3:
```
输入: "pwwkew"
输出: 3
解释: 无重复的最长子串为 wke, 所以长度为 3
```

## 解题方案

### 暴力解法

暴力解法相当于要双重循环时间复杂度达到了 O(n^2)

### 时间窗

使用时间窗方案，时间复杂度降低为 O(n)

## 算法流程

- 首先，定义一个 Set 和记录最大长度的 maxLen
- 遍历字符串，如果 set 中不存在 s\[i\] 则将其加入 set, 并更新 maxLen
- 如果 set 中存在 s\[i\] 则删除 set 中所有的值

## 代码

```js
const lengthOfLongestSubstring = str => {
    let maxLen = 0
    let j = 0
    const set = new Set()

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!set.has(char)) {
            set.add(char)
            maxLen = Math.max(maxLen, set.size)
        } else {
            while (j < i) {
                set.delete(str[j])
                j++
            }
        }
    }

    return maxLen
}

console.log(lengthOfLongestSubstring('pwwkew'));
```

