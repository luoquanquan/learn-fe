/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 *
 * https://leetcode-cn.com/problems/4sum/description/
 *
 * algorithms
 * Medium (39.50%)
 * Likes:    1025
 * Dislikes: 0
 * Total Accepted:    239.6K
 * Total Submissions: 606.6K
 * Testcase Example:  '[1,0,-1,0,-2,2]\n0'
 *
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a],
 * nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 *
 *
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 *
 * 你可以按 任意顺序 返回答案 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,2,2,2,2], target = 8
 * 输出：[[2,2,2,2]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * -10^9 <= nums[i] <= 10^9
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    // 首先, 给数组排个序. 方便查找
    nums = nums.sort((a, b) => a - b)

    // 取出数组长度备用
    const {
        length
    } = nums

    // 存储结果
    let ret = []

    // 查找第一个数
    for (let i = 0; i < length - 3; i++) {
        const eleI = nums[i];
        // 这里的判断主要是为了满足 "不重复的四元组" 的要求
        if (i > 0 && nums[i - 1] === eleI) {
            continue
        }

        // 查找第二个数
        for (let j = i + 1; j < length - 2; j++) {
            const eleJ = nums[j];
            if (j > i + 1 && nums[j - 1] === eleJ) {
                continue
            }

            // 查找第二个数
            for (let k = j + 1; k < length - 1; k++) {
                const eleK = nums[k];
                if (k > j + 1 && nums[k - 1] === eleK) {
                    continue
                }

                // 查找第二个数
                for (let l = k + 1; l < length; l++) {
                    const eleL = nums[l];
                    if (l > k + 1 && nums[l - 1] === eleL) {
                        continue
                    }

                    // 如果四个数之和正好是想要的目标那就记录这一组值
                    if (eleI + eleJ + eleK + eleL === target) {
                        ret.push([eleI, eleJ, eleK, eleL])
                    }
                }
            }
        }
    }

    return ret
};
// @lc code=end
