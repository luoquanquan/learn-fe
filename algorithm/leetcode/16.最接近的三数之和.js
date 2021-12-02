/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode-cn.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (45.84%)
 * Likes:    960
 * Dislikes: 0
 * Total Accepted:    280.7K
 * Total Submissions: 612.2K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 *
 * 返回这三个数的和。
 *
 * 假定每组输入只存在恰好一个解。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,0], target = 1
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 1000
 * -1000 <= nums[i] <= 1000
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    // 先给数组排个序, 方便后续使用两个指针法
    nums.sort((a, b) => a - b)

    // 取出 length 备用
    const {
        length
    } = nums

    /*
        计算出一个基准 sum 备用
        这里是有点说道的, 按照以往的惯例都是初始化一个 sum = 0;
        但是看一下后续的判断就知道, 如果你初始化的这个 0 正好就是题目中的 target 那么算法就作废了
    */
    let sum = nums[0] + nums[1] + nums[2]

    // 遍历数组中所有的元素, 并对其余的元素使用双指针法计算三者加和
    for (let i = 0; i < length - 2; i++) {
        let idxL = i + 1
        let idxR = length - 1

        while (idxL < idxR) {
            const curSum = nums[i] + nums[idxL] + nums[idxR]

            // 如果当前方位计算的加和值和目标值更近, 那么直接替换结果值
            if (Math.abs(curSum - target) < Math.abs(sum - target)) {
                sum = curSum
            }

            /*
                计算得出的加和大于目标值, 那么只有往左移动右指针才能更趋向于它
                如果小于目标值, 则可以通过右移左指针调大加和向其靠近
            */
            if (curSum - target > 0) {
                idxR--
            } else {
                idxL++
            }
        }
    }

    return sum
};
// @lc code=end
