/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 *
 * https://leetcode-cn.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (53.19%)
 * Likes:    2059
 * Dislikes: 0
 * Total Accepted:    634.7K
 * Total Submissions: 1.2M
 * Testcase Example:  '2'
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 *
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 *
 * 注意：给定 n 是一个正整数。
 *
 * 示例 1：
 *
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 *
 * 示例 2：
 *
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 动态规划
var climbStairs = function (n) {
    if (n <= 2) return n

    // 防止空指针, 添加 1级 2级 台阶的情况
    const obj = Object.create(null)
    obj[1] = 1 // 一级阶梯的时候有 1 种方法
    obj[2] = 2 // 两级阶梯的时候有 2 种方法

    for (let i = 3; i <= n; i++) {
        // 上到第 i 级台阶方程类似斐波那契
        obj[i] = obj[i - 1] + obj[i - 2]
    }

    return obj[n]
};

// @lc code=end
// // 直接用递归, 会超时
// var climbStairs = function(n) {
//     if (n === 0) {
//         return 1
//     }

//     if (n <= 3) {
//         return n
//     }

//     return climbStairs(n - 1) + climbStairs(n - 2)
// };

// // 添加一个 cache 变量缓存重复的计算可以过关 - 带缓存的递归
// var climbStairs = ((cache = {}) => function(n) {
//     // 如果台阶数 <= 3 时直接返回级数, 作为递归终止条件
//     if (n <= 3) {
//         return n
//     }

//     cache[n] =
//         // 如果缓存过当前级数的计算结果直接返回
//         cache[n]
//         // 否则递归计算
//         || climbStairs(n - 1) + climbStairs(n - 2)

//     return cache[n]
// })();
