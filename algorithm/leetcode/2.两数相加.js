/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (41.03%)
 * Likes:    7139
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 2.6M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 *
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807.
 *
 *
 * 示例 2：
 *
 *
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 *
 *
 * 示例 3：
 *
 *
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 每个链表中的节点数在范围 [1, 100] 内
 * 0
 * 题目数据保证列表表示的数字不含前导零
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // 先创建一个队列的队头
    const head = new ListNode(-1)
    // 定义游标标量, 运算过程中使用
    let cursor = head
    // 计算加法满十要进一位
    let carry = 0

    // 只要两个队列中有一个不为空就继续
    while (l1 || l2) {
        // 读取值
        const num1 = l1?.val || 0
        const num2 = l2?.val || 0

        // 当前位求和
        const sum = num1 + num2 + carry
        // 满十进一
        carry = Math.floor(sum / 10)
        // 结果链表添加一环
        cursor.next = new ListNode(sum % 10)
        cursor = cursor.next
        // 原链表往后移动
        l1 = l1?.next
        l2 = l2?.next
    }

    // 每位加法算玩之后如果还有前进一位, 则给结果链表添加一环
    if (carry === 1) {
        cursor.next = new ListNode(1)
    }

    return head.next
};
// @lc code=end

