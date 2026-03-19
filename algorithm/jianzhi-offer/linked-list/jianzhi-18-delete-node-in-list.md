# 18. 删除链表的节点

## 题目描述

给定一个元素不重复的单向链表的头指针和要删除节点的值，定义一个函数删除该节点并返回删除后链表的头结点。

示例 1:
```
输入: head = [4, 5, 1, 9], val = 5
输出: [4, 1, 9]
```

示例 2:
```
输入: head = [4, 5, 1, 9], val = 1
输出: [4, 5, 9]
```

## 解题方案

### 解题思路

定义两个紧邻的指针，当前方指针指向的值刚好式样删除的值时，直接将后指针指向其后一个节点。

### 算法流程

- 首先判断头指针是否为 null 如果是则直接返回
- 如果头指针的值即为要删除的值，直接返回 head.next 即可
- 初始化前指针 pre 和后指针 post, 两个指针紧挨着距离为 1
- 前后两个指针一起遍历链表，直到遍历到结尾或者遇到需要删除的节点则跳出
- 遍历过程中如果遇到 pre.val === val 则让 post.next = pre.next 相当于删除了链表中的值

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
        console.log(`Current timestamp ${Date.now()} nextVal: `, nextVal)
        cursor.next = new Node(nextVal)
        cursor = cursor.next
    }

    return head
}

const head = createList([4, 5, 1, 9])

const deleteNode = (head, val) => {
    if (head.val === null) {
        return head.val
    }

    if (head.val === val) {
        return head.next
    }

    let pre = head.next
    let post = head

    while (![null, val].includes(pre.val)) {
        post = pre
        pre = pre.next
    }

    if (pre.val !== null) {
        post.next = pre.next
    }

    return head
}

console.log(deleteNode(head, 1));
```

