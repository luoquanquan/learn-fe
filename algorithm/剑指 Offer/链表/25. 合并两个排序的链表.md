# 25. 合并两个排序的链表

## 题目描述

输入两个递增排序的链表, 合并这两个链表并使新链表中的节点仍然是递增排序的 ~

示例:
```
输入: [1, 2, 4], [1, 3, 4]
输出: [1, 1, 2, 3, 4, 4]
```

## 解题方案

- 本题可以利用递归实现, 返回的新的链表也不需要创建新的节点
- 终止条件: 两个链表分别为 l1 和 l2, 当 l1 或 l2 为空的时候结束
- 返回值: 每次调用都返回排序好的链表头
- 本级递归内容: 如果 l1 的 val 更小, 则将 l1 的 next 与排序好的链表头相接, l2 同理

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

const l1 = createList([1, 2, 4])
const l2 = createList([1, 3, 4])

const mergeTwoLists = (l1, l2) => {
    if (l1 === null) {
        return l2
    }

    if (l2 === null) {
        return l1
    }

    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}

console.log(JSON.stringify(mergeTwoLists(l1, l2), null, 2));
```

