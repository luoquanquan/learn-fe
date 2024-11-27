/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    let ret = false

    const dfs = (head, curSum) => {
        if (!head) {
            return
        }

        if (!head.left && !head.right && curSum === targetSum) {
            ret = true
        }

        head.left && dfs(head.left, head.left.val + curSum)
        head.right && dfs(head.right, head.right.val + curSum)
    }

    dfs(root, root?.val)
    return ret
};
// @lc code=end

