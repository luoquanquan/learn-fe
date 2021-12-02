/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (33.97%)
 * Likes:    4038
 * Dislikes: 0
 * Total Accepted:    718.9K
 * Total Submissions: 2.1M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0
 * 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [0]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 3000
 * -105 <= nums[i] <= 105
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // 存储结果
    const ret = []

    // 如果凑不够三个数直接返回
    const len = nums.length
    if (len < 3) {
        return ret
    }

    // 所有数字升序处理
    nums.sort((a, b) => a - b)

    for (let i = 0; i < len - 2;) {
        const element = nums[i]
        // 如果当前数字大于 0, 则三数之和一定大于 0
        if (element > 0) {
            break;
        }

        let L = i + 1
        let R = len - 1
        while (L < R) {
            const sum = element + nums[L] + nums[R]
            if (sum == 0) {
                ret.push([element, nums[L], nums[R]])
                // 左右指针去重 & L+1 & R-1
                while (L < R && nums[L] == nums[++L]);
                while (L < R && nums[R] == nums[--R]);
            } else if (sum < 0) {
                while (L < R && nums[L] == nums[++L]);
            } else {
                while (L < R && nums[R] == nums[--R]);
            }
        }

        // 定值去重
        while (nums[i] == nums[++i]);
    }

    return ret
};
// @lc code=end
