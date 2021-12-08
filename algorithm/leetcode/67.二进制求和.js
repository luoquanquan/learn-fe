/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 *
 * https://leetcode-cn.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (54.15%)
 * Likes:    712
 * Dislikes: 0
 * Total Accepted:    208.7K
 * Total Submissions: 385.5K
 * Testcase Example:  '"11"\n"1"'
 *
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 *
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入: a = "11", b = "1"
 * 输出: "100"
 *
 * 示例 2:
 *
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *
 *
 *
 * 提示：
 *
 *
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 *
 *
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    // 缓存结果
    let ret = []

    // 保证 a 是相对长的
    if (a.length < b.length) {
        [a, b] = [b, a]
    }

    // 取出较长的长度备用
    const { length } = a

    // 较短的参数补零补齐
    b = b.padStart(length, '0')

    // 进位
    let addNum = 0

    for (let i = length - 1; i >= 0; i--) {
        // 取出 a / b 的当前位数字
        const curNumA = +a[i]
        const curNumB = +b[i]

        // 当前位求和
        const sum = curNumA + curNumB + addNum

        // 不满二直接加
        if (sum < 2) {
            ret.unshift(sum)
            addNum = 0
        } else {
            // 满二进一
            ret.unshift(sum % 2)
            addNum = 1
        }
    }

    // 所有位置都计算完成还有进位, 直接加一位
    if (addNum) {
        ret.unshift(1)
    }

    return ret.join('')
};
// @lc code=end
