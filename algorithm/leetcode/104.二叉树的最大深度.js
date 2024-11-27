/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * @return {number}
 */
// eslint-disable-next-line no-var, no-unused-vars
var maxDepth = function (root) {
    let ret = 0
    const dfs = (node, level = 1) => {
        if (!node) {
            return
        }

        if (!node.left && !node.right) {
            ret = Math.max(ret, level)
        }

        dfs(node.left, level + 1)
        dfs(node.right, level + 1)
    }
    dfs(root)

    return ret;
}
// @lc code=end
