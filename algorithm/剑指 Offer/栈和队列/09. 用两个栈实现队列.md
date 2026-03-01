# 09. 用两个栈实现队列

## 题目描述

用两个栈实现一个队列. 队列的声明如下, 实现它的 appendTail 和 deleteHead, 分别完成在队列尾部插入整数和在队列头部删除整数的功能, 如果队列中没有了元素则直接返回 -1.

## 解题方案

### 解题思路

栈实现队列的方案本来就是负负得正, 两次先进后出的结果就是先进先出了.
- 首先在构造函数中初始化两个栈 stack1, stack2
- appendTail 给 stack1 尾部添加元素
- 如果 deleteHead 的时候, stack2 已经空了, 就把当前 stack1 的元素依次弹出并压入 stack2
- deleteHead 从 stack2 尾部取出元素, 如果 stack2 还是空的就返回 -1

### 复杂度

- 时间复杂度: O(1)
- 空间复杂度: O(n)

## 代码

```js
class Queue {
    constructor() {
        this.stack1 = []
        this.stack2 = []
    }

    appendTail(val) {
        this.stack1.push(val)
    }

    deleteHead() {
        // 如果当前 stack2 直接把 stack1 的值灌入 stack2
        // 实现负负得正的效果
        if (!this.stack2.length) {
            let ele
            while (ele = this.stack1.pop()) {
                this.stack2.push(ele)
            }
        }

        if (this.stack2.length) {
            return this.stack2.pop()
        } else {
            return -1
        }
    }
}
```
