function Animal(name) {
    this.name = name
}

Animal.prototype.say = function() {
    console.log('Hi i a`m', this.name)
}

function myNew(Constructor, ...args) {
    const obj = {}
    obj.__proto__ = Constructor.prototype

    // 如果构造函数中显式返回了一个引用类型的结果, new 直接返回引用类型
    const ret = Constructor.apply(obj, args)
    return typeof ret === 'object' ? ret : obj
}

const animal =  myNew(Animal, 'miao')
animal.say()
