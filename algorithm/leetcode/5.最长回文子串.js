/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (35.75%)
 * Likes:    4403
 * Dislikes: 0
 * Total Accepted:    798.7K
 * Total Submissions: 2.2M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "a"
 * 输出："a"
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "ac"
 * 输出："a"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由数字和英文字母（大写和/或小写）组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const {
        length
    } = s

    // 如果字符串长度小于等于 1, 那还看个锤子回文子串
    if (length <= 1) {
        return s
    }

    // 存储所有的回文子串
    const innerStrs = []

    // 遍历字符串中每个字符
    for (let i = 0; i < length; i++) {

        // 处理  1abcba2 这种情况
        let j = 0
        // 以每一个元素为基准, 他的前 n 个字符和后 n 个字符如果相等说明是回文字符串
        while (s[i - j] && s[i + j] && s[i - j] === s[i + j]) {
            j++
        }
        // 最后一次 j++ 对应的值不能通过回文校验, 所以要减回来
        j--
        // 提取回文字符串, 由于 slice 的包前不包后特性. 后边的参数要加 1
        innerStrs.push(s.slice(i - j, i + j + 1))

        // 处理 1aabbccbbaa2 这种情况
        let k = 0
        // 这个相当于以每一个缝为基准, 他的前 n 个字符和后 n 个字符如果相等说明是回文字符串
        while (s[i - k] && s[(i + 1) + k] && s[i - k] === s[(i + 1) + k]) {
            k++
        }
        k--
        innerStrs.push(s.slice(i - k, (i + 1) + k + 1))
    }

    // 所有的回文字符串按照长度排序, 并取出最后一个返回
    return innerStrs.sort((a, b) => a.length - b.length).pop()
};

console.log(longestPalindrome("bb"))
// @lc code=end
