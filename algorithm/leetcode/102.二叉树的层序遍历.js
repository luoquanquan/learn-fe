/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  const queue = [root];
  const ret = [];

  while (queue.length) {
    let length = queue.length;
    ret.push([]);

    while (length > 0) {
      const node = queue.shift();

      ret[ret.length - 1].push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);

      length--;
    }
  }

  return ret;
};

levelOrder();
// @lc code=end
