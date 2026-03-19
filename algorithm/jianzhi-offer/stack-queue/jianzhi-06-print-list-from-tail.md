# 06. 从尾到头打印链表

## 题目描述

给你一个链表的头结点，要求你从尾到头反过来返回每个节点的值 ~

示例：
```
输入: head = [1, 2, 3]
输出: [3, 2, 1]
```

限制：
```
0 <= 链表长度 <= 10000
```

## 解题方案

### 解题思路

- 栈的特点是后进先出，因为题目要求从尾到头打印元素，所以符合栈的特性
- 首先遍历一遍链表，将链表中的元素存入栈中
- 不断弹出栈内的元素，将弹出的元素放到结果数组中

### 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)

## 代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */

const head = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: null
        }
    }
}

const reversePrint = head => {
    const stack = []
    const ret = []
    let pointer = head

    while (pointer) {
        stack.push(pointer.val)
        pointer = pointer.next
    }

    let ele
    while (ele = stack.pop()) {
        ret.push(ele)
    }

    return ret
}

console.log(reversePrint(head));
```
