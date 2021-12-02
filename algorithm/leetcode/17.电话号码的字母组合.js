/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (57.42%)
 * Likes:    1629
 * Dislikes: 0
 * Total Accepted:    369.5K
 * Total Submissions: 643.5K
 * Testcase Example:  '"23"'
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 *
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：digits = ""
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= digits.length <= 4
 * digits[i] 是范围 ['2', '9'] 的一个数字。
 *
 *
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    // 创建字典
    const obj = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z']
    }
    let ret = [];

    for (let i = 0; i < digits.length; i++) {
        const num = digits[i];

        // 读取第一个字符的时候 ret 为空, 直接把字典里对应的数组给 ret
        if (!ret.length) {
            ret = obj[num]
        } else {
            const list = [];
            // 从第二个数字开始进入二层循环, 之前已经加入的 item 作为下次循环中可能出现的前缀
            for (let j = 0; j < ret.length; j++) {
                // 遍历当前位数字对应字典中的数组, 和之前已经出现的前缀分别组合
                for (let k = 0; k < obj[num].length; k++) {
                    list.push(ret[j] + obj[num][k])
                }
            }
            ret = list
        }
    }
    return ret;
};
// @lc code=end
