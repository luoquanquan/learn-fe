/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (44.53%)
 * Likes:    2803
 * Dislikes: 0
 * Total Accepted:    850.5K
 * Total Submissions: 1.9M
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "()"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "()[]{}"
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "(]"
 * 输出：false
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "([)]"
 * 输出：false
 *
 *
 * 示例 5：
 *
 *
 * 输入：s = "{[]}"
 * 输出：true
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由括号 '()[]{}' 组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// 这个经典问题主要考察了栈数据结构的用法, 后进先出
var isValid = function(s) {
    // 创建一个括号字典
    const bracketObj = {
        '(': ')',
        '[': ']',
        '{': '}',
    }

    // 关闭括号的集合
    const brackets = []

    // 遍历传入的字符串
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        // 如果包含右括号, 则对比栈顶元素和当前元素是否相等
        if (Object.values(bracketObj).includes(char)) {
            if (brackets.pop() !== char) {
                return false
            }
        } else {
            // 否则向栈中添加一个新元素
            brackets.push(bracketObj[char])
        }
    }

    // 遍历完成后如果栈空说明所有的左括号都找到了与之匹配的右括号
    return !brackets.length
};
// @lc code=end

