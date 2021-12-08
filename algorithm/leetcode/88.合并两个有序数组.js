/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 *
 * https://leetcode-cn.com/problems/merge-sorted-array/description/
 *
 * algorithms
 * Easy (51.89%)
 * Likes:    1209
 * Dislikes: 0
 * Total Accepted:    514.1K
 * Total Submissions: 990.6K
 * Testcase Example:  '[1,2,3,0,0,0]\n3\n[2,5,6]\n3'
 *
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 *
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 *
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m
 * 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6]
 * 解释：需要合并 [1,2,3] 和 [2,5,6] 。
 * 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [1], m = 1, nums2 = [], n = 0
 * 输出：[1]
 * 解释：需要合并 [1] 和 [] 。
 * 合并结果是 [1] 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
 * 输出：[1]
 * 解释：需要合并的数组是 [] 和 [1] 。
 * 合并结果是 [1] 。
 * 注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
 *
 *
 *
 *
 * 提示：
 *
 *
 * nums1.length == m + n
 * nums2.length == n
 * 0 <= m, n <= 200
 * 1 <= m + n <= 200
 * -10^9 <= nums1[i], nums2[j] <= 10^9
 *
 *
 *
 *
 * 进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？
 *
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 解法 2: 双指针
var merge = function(nums1, m, nums2, n) {
    // 定义指针
    let p = m - 1
    let q = n - 1
    let r = m + n - 1

    // 逐步从 nums1 和 nums2 中选取大数填充到 nums1 的后边
    while (p >= 0 && q >= 0) {
        if(nums1[p] > nums2[q]) {
            nums1[r--] = nums1[p--]
        } else {
            nums1[r--] = nums2[q--]
        }
    }

    // 如果 nums1 已经跑完了, 但是 nums2 的数据还没有跑完
    // 就需要加一个循环把剩下的 nums2 跑完
    while (q >= 0) {
        nums1[r--] = nums2[q--]
    }

    // 那么问题来了, 如果 nums2 的数据跑完了, 但是 nums1 的数还没有跑完咋弄呢?
    // 哈哈哈哈, 把跑剩余 nums1 的代码补上就知道咋回事儿了
};
// @lc code=end

// // 解法 1: 牛逼解法
// var merge = function(nums1, m, nums2, n) {
//     nums1.splice(m, n, ...nums2)
//     return nums1.sort((a, b) => a - b)
// };

