function Animal() {
    if (!(this instanceof Animal)) {
        throw new Error('the constructor must called with new~')
    }

    this.name = 'Animal'
}

function defineProperty(Constructor, protoProperties) {
    if(Array.isArray(protoProperties)) {
        protoProperties.forEach(({key, value}) => {
            Object.defineProperty(Constructor.prototype, key, {
                configurable: true,
                // 模拟 es6 的 class 中的原型方法不可枚举
                enumerable: false,
                value
            })
        })
    }

}

defineProperty(Animal, [
    {
        key: 'eat',
        value: function() {
            console.log('i can eat~')
        }
    },
    {
        key: 'say',
        value: function() {
            console.log('i can say~')
        }
    }
])

const animal = new Animal()
console.log(Animal.prototype)
