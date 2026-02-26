/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let l = 0;
  let r = 0;
  let ret = "";

  const needed = new Map();
  for (char of t) {
    needed.set(char, needed.has(char) ? needed.get(char) + 1 : 1);
  }
  let neededChars = needed.size;

  while (r < s.length) {
    const charRight = s[r];

    if (needed.has(charRight)) {
      needed.set(charRight, needed.get(charRight) - 1);

      if (needed.get(charRight) === 0) {
        neededChars--;
      }
    }

    while (neededChars === 0) {
      const targetStr = s.substring(l, r + 1);
      if (!ret || ret.length > targetStr.length) {
        ret = targetStr;
      }

      const charLeft = s[l];
      if (needed.has(charLeft)) {
        needed.set(charLeft, needed.get(charLeft) + 1);
        if (needed.get(charLeft) === 1) {
          neededChars++;
        }
      }

      l++;
    }

    r++;
  }

  return ret;
};
// @lc code=end
