/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] Sqrt(x)
 *
 * https://leetcode-cn.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (39.09%)
 * Likes:    833
 * Dislikes: 0
 * Total Accepted:    420.6K
 * Total Submissions: 1.1M
 * Testcase Example:  '4'
 *
 * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
 *
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
 *
 * 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 4
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = 8
 * 输出：2
 * 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= x <= 2^31 - 1
 *
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    // 使用二分法解决
    // x 的算数平方根一定是 <= x 的
    let left = 0
    let right = x

    // left < right: 说明两者中间还有区间可以查找
    // left === right:
    while (left <= right) {
        // 查找 left 和 right 的中间值
        const midIdx = Math.floor((right + left) / 2)

        // 如果中间值的平方比 x 大, 说明真正的算数平方根在左区间
        if (midIdx * midIdx > x) {
            right = midIdx - 1
        } else {
            // 否则想要的算数平方根在右区间
            left = midIdx + 1
        }
    }

    return right
};
// @lc code=end

// var mySqrt = function(x) {
//     // 这样解决好像有点简单了
//     return parseInt(Math.sqrt(x), 10)
// };
