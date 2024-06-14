// 获取当前时间的时间戳的方案有三种方法, 但是他们啥区别呢?
const testCount = 1e5
console.time('+new Date')
for(let i = 0; i < testCount; i++) {
  +new Date()
}
console.timeEnd('+new Date')

console.time('new Date().getTime')
for(let j = 0; j < testCount; j++) {
  new Date().getTime();
}
console.timeEnd('new Date().getTime')

console.time('Date.now')
for(let k = 0; k < testCount; k++) {
  Date.now()
}
console.timeEnd('Date.now')

/*
以上代码在 node v12.14.1 版本中执行的结果如下

+new Date: 26.719ms
new Date().getTime: 14.721ms
Date.now: 7.406ms

可以看出, +new Date 执行使用的时间最长. 推测是因为先要创建实例还要转化类型
new Date().getTime 花费的时间大于 Date.now 的原因应该是创建实例需要时间
*/

