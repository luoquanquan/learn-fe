/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (77.27%)
 * Likes:    2190
 * Dislikes: 0
 * Total Accepted:    383.5K
 * Total Submissions: 496.4K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：["()"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 8
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
const generate = (n, ret, l = 0, r = 0, str = '') => {
    if (l + r === 2 * n) {
        ret.push(str)
        console.log(str)
    }

    // 如果左括号个数小于 n 继续添加左括号
    if (l < n) {
        generate(n, ret, l + 1, r, str + '(')
    }

    // 如果右括号的个数小于左括号, 则继续追加右括号
    if (r < l) {
        generate(n, ret, l, r + 1, str + ')')
    }
}

var generateParenthesis = function (n) {
    const ret = []
    generate(n, ret)
    return ret
};
// @lc code=end
