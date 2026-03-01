# 52. 两个链表的第一个公共节点

## 题目描述

输入两个链表, 找出它们的第一个公共节点.

如下图所示的两个链表:

![](http://handle-note-img.niubishanshan.top/20221128225421.png)

在节点 c1 开始相交

示例 1:
```
输入: l1 = [4, 1, 8, 4, 5], l2 = [5, 0, 1, 8, 4, 5]
输出: 8
```

示例 2:
```
输入: l1 = [0, 9, 1, 2, 4], l2 = [3, 2, 4]
输出: 2
```

示例 3:
```
输入: l1 = [2, 6, 4], l2 = [1, 5]
输出: null
```

### 注意

- 如果两个链表没有交点, 返回 null
- 在返回结果后, 两个链表仍保持原有的结构
- 可假定两个链表中没有循环

## 解题方案

### 解题思路

分别构造两个指针去遍历两个链表, 无论哪个指针直到尾部时让其指向对方的头部, 最终会在第一个公共节点相遇. 如果没有则会在 null 相遇

### 算法流程

- 使用 head1 和 head2 分别初始化两个指针 cur1 和 cur2, 用来遍历使用
- 进行循环遍历, 知道 cur1 和 cur2 相同时结束
- 遍历过程中如果 cur1 到了尾部则将其重新放回头部 head2, 如果 cur2 到尾部则将其重新放回头部 head1
- 循环结束时在第一个公共节点相遇, 返回该节点 cur1

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

const l1 = createList([2, 6, 4])
const l2 = createList([1, 5])

const getIntersectionNode = (l1, l2) => {
    let cur1 = l1
    let cur2 = l2

    while (cur1?.val != cur2?.val) {
        cur1 = cur1 != null ? cur1.next : l2
        cur2 = cur2 != null ? cur2.next : l1
    }

    return cur1?.val || null
}

console.log(JSON.stringify(getIntersectionNode(l1, l2), null, 2));
```
