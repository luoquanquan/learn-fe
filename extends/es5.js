function Animal() {
    this.name = 'Animal'

    return function() {}
}

const animal = new Animal()
console.log(animal.name)
