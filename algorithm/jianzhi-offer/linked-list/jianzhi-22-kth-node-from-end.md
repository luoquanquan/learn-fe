# 22. 链表中倒数第 num 个节点

## 题目描述

输入一个链表，输出该链表中倒数第 num 个节点为头结点的链表

示例：
```
输入: head = [1, 2, 3, 4, 5], num = 2
输出: [4, 5]
```

## 解题方案

### 解题思路

使用双指针，定义两个指针相距为 num. 两个指针同时向后移动，当前方指针移动到尾部时后方指针就是倒数第 num 个节点。

### 算法步骤

- 首先构建 pre, post 两个指针都指向 head
- pre 指针先向后移动 num 个位置
- pre, post 指针同时向后移动，直到前指针为 null 为止
- 后指针即为倒数第 num 个节点

### 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)

## 代码

```js
class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

const createList = (eles) => {
    const head = new Node(eles.shift())
    let cursor = head
    let nextVal
    while (nextVal = eles.shift()) {
        cursor.next = new Node(nextVal)
        cursor = cursor.next
    }

    return head
}

const head = createList([1, 2, 3, 4, 5])

const getKthFromEnd = (head, num) => {
    let pre = head
    let post = head

    for (let i = 0; i < num; i++) {
        pre = pre.next
    }

    while (pre !== null) {
        pre = pre.next
        post = post.next
    }

    return post
}

console.log(getKthFromEnd(head, 2));
```

