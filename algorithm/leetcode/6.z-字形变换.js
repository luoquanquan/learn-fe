/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 *
 * https://leetcode-cn.com/problems/zigzag-conversion/description/
 *
 * algorithms
 * Medium (50.86%)
 * Likes:    1381
 * Dislikes: 0
 * Total Accepted:    327.1K
 * Total Submissions: 643.1K
 * Testcase Example:  '"PAYPALISHIRING"\n3'
 *
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 *
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 *
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 *
 * 请你实现这个将字符串进行指定行数变换的函数：
 *
 *
 * string convert(string s, int numRows);
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "PAYPALISHIRING", numRows = 3
 * 输出："PAHNAPLSIIGYIR"
 *
 * 示例 2：
 *
 *
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "A", numRows = 1
 * 输出："A"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由英文字母（小写和大写）、',' 和 '.' 组成
 * 1
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    const {
        length
    } = s

    if (length <= 1 || numRows <= 1) {
        return s
    }

    // 结果数组
    const ret = []
    // 行号
    let lineNumber = 0
    // 步进
    let nextStep = 1
    for (let i = 0; i < length; i++) {
        // 如果当前行还没有填充过, 添加一个空字符串
        if (!ret[lineNumber]) {
            ret[lineNumber] = ''
        }

        // 添加元素到行内
        ret[lineNumber] += s[i]

        // 获取下一个行号
        lineNumber += nextStep

        // 如果下一行是 0
        // 或者下一行是最高行数
        // 就转向
        if (lineNumber === 0 || lineNumber === numRows - 1) {
            nextStep = -nextStep
        }
    }

    return ret.join('')
};
// @lc code=end
