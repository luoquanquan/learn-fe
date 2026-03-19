# 30. 包含 min 函数的栈

## 题目描述

定义一个栈数据结构，请在该类型中实现一个能够得到最小元素的 `min` 函数。调用 `min` `push` `pop` 的时间复杂度都是 O(1).

示例：
```js
const minStack = new MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
minStack.min() // --> -3
minStack.pop()
minStack.top() // --> 0
minStack.min() // --> -2
```

## 解题方案

### 解题思路

`push` `pop` `top` 三个方法直接用数组的方法即可实现。对于取最小值 `min` 函数则需要建立辅助线。辅助线中降序存储 `push` 过程中的值

### 复杂度

- 时间复杂度：O(1)
- 空间复杂度：O(n)

### 算法流程

- 创建 `MinStack` 类，并初始化数据栈 stack1 和辅助栈 stack2
- push 函数中将 val 正常添加到 stack1 中，如果 stack2 为空或者 stack2 栈顶值大于等于 val 时，则将 val 加入到 stack2 中，这样保证了 stack2 中的值一定是降序的并且存储元素的数量会小于等于 stack1.
- pop 方法首先将 stack1 中的元素 pop 出去，如果 stack2 栈顶元素与 stack1 的栈顶元素相等，则将 stack2 中的值也 pop 出去，保证数据栈和辅助栈的数据一致性
- top 函数则直接取 stack1 栈顶值即可
- min 函数则直接取 stack2 栈顶值即可

## 代码

```js
class MinStack {
    constructor() {
        this.stack1 = []
        this.stack2 = []
    }

    push(val) {
        this.stack1.push(val)

        if (this.min() === undefined || this.min() >= val) {
            this.stack2.push(val)
        }
    }

    pop() {
        if (this.stack1.pop() === this.min()) {
            this.stack2.pop()
        }
    }

    top() {
        return this.stack1[this.stack1.length - 1]
    }

    min() {
        const { length } = this.stack2
        if (length === 0) {
            return
        }

        return this.stack2[length - 1]
    }
}

const minStack = new MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
console.log(minStack.top())
console.log(minStack.min())
minStack.pop()
console.log(minStack.top())
console.log(minStack.min())

/*
-3
-3
0
-2
*/
```

