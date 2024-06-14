function * fns() {
    const a = yield 'a'
    // 如果调用 next 的时候没有传入参数的话这里的 a 就是 undefined
    console.log('a', a)
    const b = yield 'b'
    // 第二次调用 next 的时候传入了参数所以此处的 b 是有值的
    // 后一次 next 传入的参数会赋值给上一次 yield 的返回值
    console.log('b', b)
    const c = yield 'c'
    console.log('c', c)
    return c
}

const it = fns()

console.log(it)
// 第一次调用 next 传入的参数无效-因为没有地方接收该参数
console.log(it.next('param -'))  // { value: 'a', done: false }
console.log(it.next())           // { value: 'b', done: false }
console.log(it.next('param b'))  // { value: 'c', done: false }
console.log(it.next('param c'))  // { value: 'param c', done: true }
// generater 函数执行完成后再次掉用 next 方法获取不到有效值了
console.log(it.next('param c'))  // { value: undefined, done: true }