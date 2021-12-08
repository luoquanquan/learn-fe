/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 *
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/
 *
 * algorithms
 * Easy (53.79%)
 * Likes:    691
 * Dislikes: 0
 * Total Accepted:    344.8K
 * Total Submissions: 641.3K
 * Testcase Example:  '[1,1,2]'
 *
 * 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
 *
 * 返回同样按升序排列的结果链表。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,1,2]
 * 输出：[1,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,1,2,3,3]
 * 输出：[1,2,3]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点数目在范围 [0, 300] 内
 * -100
 * 题目数据保证链表已经按升序排列
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
 * @param {ListNode} head
 * @return {ListNode}
 */
// 背题大佬的方法, 不得不服气. 大佬是真的牛逼
var deleteDuplicates = function (head) {
    // 添加一个游标
    let cursor = head

    // 迭代链表的每一个节点
    while (cursor && cursor.next) {
        // 如果游标节点的值和下一个节点的值相同直接链接下一个节点
        if (cursor.val === cursor.next.val) {
            cursor.next = cursor.next.next
        } else {
            // 否则移动游标
            cursor = cursor.next
        }
    }

    return head
};
// @lc code=end

// // 我自己想出来的双指针法
// var deleteDuplicates = function (head) {
//     let left = head
//     let right = head

//     // 如果右指针没有跑到最后边
//     while (right) {

//         // 如果左节点的值 === 右节点的值
//         // 右指针继续移动
//         if (left.val === right.val) {
//             right = right.next
//         } else {
//             // 否则左指针移动
//             left.next = right
//             left = left.next
//         }
//     }

//     // 如果链表处理完成了但是左节点还不是链表尾巴.
//     // 直接让他当链表尾巴, 兼容 [1, 2, 3, 3, 3] 这种最后重复的情况
//     if (left) {
//         left.next = null
//     }

//     return head
// };
