const BigNumber = require("bignumber.js");
const toBigNumber = (raw) => new BigNumber(raw);

exports.plus = (a, b) => toBigNumber(a).plus(toBigNumber(b));
exports.minus = (a, b) => toBigNumber(a).minus(toBigNumber(b));
exports.times = (a, b) => toBigNumber(a).times(toBigNumber(b));
exports.div = (a, b) => toBigNumber(a).div(toBigNumber(b));
exports.idiv = (a, b) => toBigNumber(a).idiv(toBigNumber(b));

exports.gt = (a, b) => toBigNumber(a).gt(toBigNumber(b));
exports.gte = (a, b) => toBigNumber(a).gte(toBigNumber(b));
exports.lt = (a, b) => toBigNumber(a).lt(toBigNumber(b));
exports.lte = (a, b) => toBigNumber(a).lte(toBigNumber(b));
