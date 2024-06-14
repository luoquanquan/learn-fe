function Animal (name) {
    this.name = name
}

Animal.prototype.say = function () {
    console.log('Hi i a`m', this.name)
}

function myNew (Constructor, ...args) {
    const obj = {}
    // eslint-disable-next-line
    obj.__proto__ = Constructor.prototype

    // 如果构造函数中显式返回了一个引用类型的结果, new 直接返回引用类型
    const ret = Constructor.apply(obj, args)

    // eslint-disable-next-line
    return typeof ((ret && typeof ret === 'object') || typeof ret === 'function') ? ret : obj
}

const animal = myNew(Animal, 'miao')
animal.say()

// 由于 __proto__ 是非标准的属性, 所以建议这样写

function myNew2 (Constructor, ...args) {
    const obj = Object.create(Constructor.prototype)

    // 如果构造函数中显式返回了一个引用类型的结果, new 直接返回引用类型
    const ret = Constructor.apply(obj, args)
    return ((ret && typeof ret === 'object') || typeof ret === 'function') ? ret : obj
}

const animal2 = myNew2(Animal, 'miao')
animal2.say()
