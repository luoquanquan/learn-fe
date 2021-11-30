/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (35.10%)
 * Likes:    3284
 * Dislikes: 0
 * Total Accepted:    896.5K
 * Total Submissions: 2.6M
 * Testcase Example:  '123'
 *
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 *
 * 如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 123
 * 输出：321
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = -123
 * 输出：-321
 *
 *
 * 示例 3：
 *
 *
 * 输入：x = 120
 * 输出：21
 *
 *
 * 示例 4：
 *
 *
 * 输入：x = 0
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * -2^31
 *
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    // 先把传入的数字转字符串备用
    let str = x.toString()

    // 记录下正负号
    let symbol = '+'
    if (str[0] === '-') {
        symbol = '-'
        str = str.slice(1)
    }

    // 反转后再把标点符号加回来
    const newStr = symbol + str.split('').reverse().join('')
    // 转回数字
    const newNumber = Number(newStr)

    // 边界处理
    if (newNumber < (-2) ** 31 || newNumber > 2 ** 31 - 1) {
        return 0
    }

    return newNumber
};
// @lc code=end

