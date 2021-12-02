/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (43.15%)
 * Likes:    1679
 * Dislikes: 0
 * Total Accepted:    576.9K
 * Total Submissions: 1.3M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 *
 *
 *
 *
 * 进阶：你能尝试使用一趟扫描实现吗？
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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 创建一个虚拟节点指向链表的头节点
    let dummyHead = new ListNode(0, head)

    // 左右两个指针分别指向虚拟节点
    let idxL = dummyHead
    let idxR = dummyHead

    // 先让又指针走到第 n + 1 个节点
    // 这是因为走完所有节点以后还要再走一个才能算结束
    for (let i = 0; i < n + 1; i++) {
        idxR = idxR.next
    }

    // 此时让左指针跟着又指针一起跑, 知道跑完整个链表
    while (idxR) {
        idxR = idxR.next
        idxL = idxL.next
    }

    // 删除此时左指针的下一个节点即可
    idxL.next = idxL.next.next

    // 这里一定要返回 dummyHead.next 要不有可能需要删除的就是 head 节点
    // 直接返回 head 肯定就错了
    return dummyHead.next
};
// @lc code=end
