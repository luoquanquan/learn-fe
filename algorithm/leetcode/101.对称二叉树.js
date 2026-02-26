/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
// https://leetcode.cn/problems/symmetric-tree/solutions/6694/hua-jie-suan-fa-101-dui-cheng-er-cha-shu-by-guanpe
const isMirror = (t1, t2) => {
  if (t1 == null && t2 == null) return true;
  if (t1 == null || t2 == null) return false;
  return (
    t1.val === t2.val &&
    isMirror(t1.right, t2.left) &&
    isMirror(t1.left, t2.right)
  );
};

// eslint-disable-next-line no-unused-vars
const isSymmetric = function (root) {
  return isMirror(root, root);
};
// @lc code=end
