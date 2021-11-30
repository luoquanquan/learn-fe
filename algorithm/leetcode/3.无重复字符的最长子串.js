/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (38.23%)
 * Likes:    6491
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 3.5M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 * 示例 4:
 *
 *
 * 输入: s = ""
 * 输出: 0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * s 由英文字母、数字、符号和空格组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 内部字符串, 用于存储子串
    let innerStr = ''
    // 记录最大的子串大小
    let size = 0

    for (let i = 0, len = s.length; i < len; i++) {
        // 逐个读取传入字符串的字符
        const char = s[i]

        /*
            拼接子串逻辑
            1. 当前字符在子串中没有出现过, 直接叠加到子串中
            2. 当前字符在子串中已经出现过, 抛弃该字符(包含)出现以前的所有字符以后再叠加最新字符
        */
        const innerIdx = innerStr.indexOf(char)
        if (innerIdx === -1) {
            innerStr += char
        } else {
            innerStr = innerStr.substring(innerIdx + 1) + char
        }

        // 每次 innerStr 的更新都要刷新下 size 变量
        size = Math.max(size, innerStr.length)
    }

    return size
};
// @lc code=end

