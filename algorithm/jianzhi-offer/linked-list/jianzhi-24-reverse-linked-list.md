# 24. 反转链表

## 题目描述

定义一个函数, 输入一个链表的头结点, 反转该链表并输出反转后的链表头节点.

示例:
```
输入: [1, 2, 3, 4, 5]
输出: [5, 4, 3, 2, 1]
```

## 解题方案

### 解题思路

通过前指针, 当前指针和临时指针三个指针两两节点进行交换. 直到遍历到链表结尾则链表反转完成...

### 算法流程

- 初始化前指针 pre = head 和当前指针 cursor = null
- 当 pre !== null 时说明还没有到达链表的结尾, 不断遍历
- 临时指针 temp = pre.next 保存下一次要反转的指针位置
- pre.next = cursor 实现链表中后一节点的反转
- cursor = pre, 移动当前指针
- pre = temp 前指针指向当初的下一个节点
- 遍历完成后, cursor 指向的即为反转后的链表头节点

### 复杂度

- 时间复杂度: O(n)
- 空间复杂度: O(1)

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

const reverseList = (head) => {
    let pre = head
    let cursor = null

    while (pre !== null) {
        const temp = pre.next
        pre.next = cursor
        cursor = pre
        pre = temp
    }

    return cursor
}

console.log(JSON.stringify(reverseList(head), null, 2));
```

