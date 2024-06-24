/* eslint-disable no-unused-vars */
/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
// https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/solutions/313382/shou-hua-tu-jie-di-gui-fen-zhi-by-hyj8/?source=vscode
const helper = (nums, i, j) => {
    if (i > j) {
        return null
    }

    const mid = (i + j) >>> 1
    // eslint-disable-next-line no-undef
    const root = new TreeNode(nums[mid])

    root.left = helper(nums, i, mid - 1)
    root.right = helper(nums, mid + 1, j)

    return root
}

const sortedArrayToBST = function (nums) {
    return helper(nums, 0, nums.length - 1)
}
// @lc code=end
