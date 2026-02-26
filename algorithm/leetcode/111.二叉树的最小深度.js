/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
var minDepth = function (root) {
  if (!root) {
    return 0;
  }

  const queue = [[root, 1]];

  while (queue.length) {
    const [node, level] = queue.pop();
    if (!node.left && !node.right) {
      return level;
    }

    node.left && queue.unshift([node.left, level + 1]);
    node.right && queue.unshift([node.right, level + 1]);
  }
};
// @lc code=end
