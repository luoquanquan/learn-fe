/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 *
 * https://leetcode-cn.com/problems/plus-one/description/
 *
 * algorithms
 * Easy (46.34%)
 * Likes:    870
 * Dislikes: 0
 * Total Accepted:    409.1K
 * Total Submissions: 883.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 *
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 *
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 * 解释：输入数组表示数字 123。
 *
 *
 * 示例 2：
 *
 *
 * 输入：digits = [4,3,2,1]
 * 输出：[4,3,2,2]
 * 解释：输入数组表示数字 4321。
 *
 *
 * 示例 3：
 *
 *
 * 输入：digits = [0]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    // 默认 + 1
    let addNum = 1
    for (let i = digits.length - 1; i >= 0; i--) {
        // 如果当前没有进位, 跳出循环
        if (!addNum) {
            break
        }

        // 加了进位以后的当前位的数
        const newNumI = digits[i] + addNum

        // 如果新算出的当前位小于 10,说明无需再次进位, 直接修改数组上的当前
        // 位置上的数即可, 并且进位数要清零
        if (newNumI < 10) {
            digits[i] = newNumI
            addNum = 0
        } else {
            // 否则, 当前位只保留个位的数进一即可
            digits[i] = newNumI % 10
        }
    }

    // 如果 digits 数组处理完成后还要进一, 说明之前的最高位为 9
    // 且有进位, 那么添加最高位补 1 即可
    if (addNum) {
        digits.unshift(1)
    }

    return digits
};
// @lc code=end
