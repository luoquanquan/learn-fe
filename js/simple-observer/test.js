const Observer = require('./index')

class TestClass {
    constructor(name) {
        this.name = name
    }

    update(newState) {
        console.log(`i'm ${this.name} i found new state ${newState}`)
    }
}

const baby = new Observer('sad');
const father = new TestClass('father')
const mother = new TestClass('mother')
baby.attach(father)
baby.attach(mother)

baby.setState('happy')
baby.setState('sad')


