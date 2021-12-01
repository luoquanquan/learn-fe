/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode-cn.com/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (62.36%)
 * Likes:    2984
 * Dislikes: 0
 * Total Accepted:    578.2K
 * Total Submissions: 927.1K
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为
 * (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 说明：你不能倾斜容器。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 *
 * 示例 2：
 *
 *
 * 输入：height = [1,1]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：height = [4,3,2,1,4]
 * 输出：16
 *
 *
 * 示例 4：
 *
 *
 * 输入：height = [1,2,1]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == height.length
 * 2 <= n <= 10^5
 * 0 <= height[i] <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // 根据木桶原理, 短板决定了盛水的多少
    // 左板的下标
    let idxL = 0
    // 右板的下标
    let idxR = height.length - 1
    let ret = 0

    // 只要左板坐标小于右板坐标就一直循环
    while (idxL < idxR) {
        // 取出左板 & 右板并选出两者中的短板
        const woodL = height[idxL]
        const woodR = height[idxR]
        const shortWood = Math.min(woodL, woodR)

        // 根据短板和板间距计算容积
        ret = Math.max(ret, shortWood * (idxR - idxL))

        // 如果当前左板是短板则向右移动坐标, 尝试找长板和右板搭配
        shortWood === woodL && idxL++
        // 如果右板是短板, 同理
        shortWood === woodR && idxR--
        // 综上, 你总不能知道了当前的板是短板还留着它吧
    }

    return ret
};
// @lc code=end

// 暴力法, 直接执行 js 可以通过, 但是判题超时
// var maxArea = function(height) {
//     let ret = 0
//     height.forEach((ele, i) => {
//         for (let j = i + 1; j < height.length; j++) {
//             ret = Math.max(ret, Math.min(ele, height[j]) * (j - i))
//         }
//     })

//     return ret
// };
