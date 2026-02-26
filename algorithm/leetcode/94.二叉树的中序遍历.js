/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Easy (75.55%)
 * Likes:    1198
 * Dislikes: 0
 * Total Accepted:    624.8K
 * Total Submissions: 827K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1]
 * 输出：[1]
 *
 *
 * 示例 4：
 *
 *
 * 输入：root = [1,2]
 * 输出：[2,1]
 *
 *
 * 示例 5：
 *
 *
 * 输入：root = [1,null,2]
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 100] 内
 * -100
 *
 *
 *
 *
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 *
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
// 迭代版本
var inorderTraversal = function (root) {
  const ret = [];

  const stack = [];
  let head = root;

  while (stack.length || head) {
    // 先深度优先遍历所有的左子树
    while (head) {
      stack.push(head);
      head = head.left;
    }

    head = stack.pop();
    ret.push(head.val);
    head = head.right;
  }

  return ret;
};
// @lc code=end

// // 递归版本, 这个我居然都没想出来 😭
// var inorderTraversal = function(root) {
//     const ret = []

//     // 定义一个递归方程
//     const inOrder = node => {
//         // 如果么有到尾部, 就一直处理
//         if (node) {
//             // 递归左子树
//             inOrder(node.left)
//             // 添加中间节点到结果中
//             ret.push(node.val)
//             // 递归右子树
//             inOrder(node.right)
//         }
//     }

//     // 启动递归方程
//     inOrder(root)

//     return ret
// };
