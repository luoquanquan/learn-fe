# 31. 栈的压入、弹出序列

## 题目描述

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为栈的弹出顺序。假设压入栈的所有数字均不相等。例如，{1,2,3,4,5} 为某栈的压入序列。序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列。但是 {4,3,5,1,2} 就不可能是该栈的弹出序列

<!-- more-->

示例1:
```
输入: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
输出: true
解释: 我们可以按以下顺序执行:
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
```

示例2:
```
输入: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
输出: false
解释: 1 不能在 2 之前弹出
```

## 解题方案

### 解题思路

借用一个辅助栈模拟压入和弹出的操作，根据是否模拟成功即可得到结果

### 复杂度

- 时间复杂度：O(n), n 为入栈序列的长度
- 空间复杂度：O(n), 辅助栈最多存 n 个元素

### 算法流程

- 建立一个辅助栈
- 遍历入栈序列
  - 元素入栈
  - 若辅助栈顶元素等于弹出序列元素，则出栈

## 代码

### 解法 1

```js
const validateStackSequences = (pushed, popped) => {
    const stack = []
    let popIdx = 0

    pushed.forEach(ele => {
        stack.push(ele)

        while (stack.length && stack[stack.length - 1] === popped[popIdx]) {
            stack.pop()
            popIdx++
        }
    })

    return !stack.length
}

console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1]));
// true
console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2]));
// false
```

### 解法 2

双指针法 ~

```js
const validateStackSequences = (pushed, popped) => {
    let pushIdx = 0
    let popIdx = 0

    pushed.forEach((ele, i) => {
        pushed[pushIdx] = pushed[i];

        while (pushIdx >= 0 && pushed[pushIdx] === popped[popIdx]) {
            pushIdx--
            popIdx++
        }

        pushIdx++
    })

    return pushIdx === 0
}

console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1]));
// true
console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2]));
// false
```
