class Animal {
    constructor() {
        this.name = 'Animal'
    }

    eat() {
        console.log('i can eat~')
    }
}

const animal = new Animal()
console.log(Animal.prototype)
