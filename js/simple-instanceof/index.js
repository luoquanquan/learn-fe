class Person { }

class Man extends Person { }

const quanquan = new Man();

console.log(quanquan instanceof Object)  // true
console.log(quanquan instanceof Person)  // true
console.log(quanquan instanceof Man)     // true
console.log(quanquan instanceof Array)   // false

const simpleInsetanceof = (sub, sup) => {
    let __proto__ = sub.__proto__
    while (__proto__) {
        if (__proto__ === sup.prototype) return true
        __proto__ = __proto__.__proto__
    }

    return false
}

console.log(simpleInsetanceof(quanquan, Object))  // true
console.log(simpleInsetanceof(quanquan, Person))  // true
console.log(simpleInsetanceof(quanquan, Man))     // true
console.log(simpleInsetanceof(quanquan, Array))   // false

// 由于 __proto__ 是非标准属性, 所以...
const simpleInsetanceof2 = (sub, sup) => {
    // 基本数据类型都返回false
    if (typeof sub !== 'object' || sub === null) return false;
    let proto = Object.getPrototypeOf(sub);
    while (true) {
        if (proto === null) return false;
        if (proto === sup.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

console.log(simpleInsetanceof2(quanquan, Object))  // true
console.log(simpleInsetanceof2(quanquan, Person))  // true
console.log(simpleInsetanceof2(quanquan, Man))     // true
console.log(simpleInsetanceof2(quanquan, Array))   // false
