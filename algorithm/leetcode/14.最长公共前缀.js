/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (41.30%)
 * Likes:    1896
 * Dislikes: 0
 * Total Accepted:    671.4K
 * Total Submissions: 1.6M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let commonPrefix = ''

    // 取出第一个字符串
    const firstArr = strs.shift()

    for (let i = 0; i < firstArr.length; i++) {
        // 当前下标字符
        const char = firstArr[i];
        // 当前下标字符相同的 string 个数
        let commonCount = 0
        // 统计当前下标相同 string 个数
        strs.forEach(str => {
            if (str[i] === char) {
                commonCount++
            }
        })

        // 如果 strs 中所有字符串当前下标字符都相等, 共同前缀加一个字符
        if (commonCount === strs.length) {
            commonPrefix += char
        } else {
            // 这里必须 break 兼容 case cir  car
            // 如果不 break 就会返回 cr
            break
        }
    }

    return commonPrefix
};
// @lc code=end

// 暴力方法, 超时了
// var longestCommonPrefix = function (strs) {
//     let prefix = ''

//     let idx = 0

//     while (1) {
//         for (let j = 0; j < strs.length; j++) {
//             const str = strs[j];

//             if (!prefix[idx] && str[idx]) {
//                 prefix += str[idx]
//             }

//             if (str[idx] !== prefix[idx]) {
//                 return prefix.slice(0, -1)
//             }
//         }

//         idx++
//     }
// };
