/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode-cn.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (46.05%)
 * Likes:    1208
 * Dislikes: 0
 * Total Accepted:    581.1K
 * Total Submissions: 1.3M
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,3,5,6], target = 5
 * 输出: 2
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1,3,5,6], target = 2
 * 输出: 1
 *
 *
 * 示例 3:
 *
 *
 * 输入: nums = [1,3,5,6], target = 7
 * 输出: 4
 *
 *
 * 示例 4:
 *
 *
 * 输入: nums = [1,3,5,6], target = 0
 * 输出: 0
 *
 *
 * 示例 5:
 *
 *
 * 输入: nums = [1], target = 0
 * 输出: 0
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * -10^4
 * nums 为无重复元素的升序排列数组
 * -10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 背题达人解法
var searchInsert = function(nums, target) {
    // 由于两个地方可能用到 length 单独定义一个变量
    const {length} = nums

    // 遍历数组
    for (let i = 0; i < length; i++) {
        // 添加到数组中的情况
        if (nums[i] >= target) {
            return i
        }
    }

    // 添加到数组末尾的情况
    return length
};
// @lc code=end

// 我自己想到的比较 lowb 的解法
// var searchInsert = function(nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//         const element = nums[i]
//         if (element === target) {
//             return i
//         } else if (element > target) {
//             nums.splice(i, 0, target)
//             return i
//         }
//     }

//     nums.push(target)
//     return nums.length - 1
// };

