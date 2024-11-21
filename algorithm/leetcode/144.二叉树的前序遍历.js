/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {
    const ret = []
    const stack = []

    if (root) {
        stack.push(root)
    }

    while (stack.length) {
        const { val, left, right } = stack.pop()

        ret.push(val)
        right && stack.push(right)
        left && stack.push(left)
    }

    return ret
}
// @lc code=end
