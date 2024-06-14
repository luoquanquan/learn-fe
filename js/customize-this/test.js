require('./call')
require('./apply')
require('./bind')

function willCall(a, b) {
    console.log(this.name)
    console.log(a, b)
}

const obj = {
    name: 'quanquan'
}

willCall.customCall(obj, 1, 2)

function willApply(a, b) {
    console.log(this.name)
    console.log(a, b)
}

willApply.customApply(obj, [1, 2])


function willBind(a, b) {
    this.a = a
    console.log(this.name)
    console.log(a, b)
}

willBind.customBind(obj, 1)(2)

const bound = willBind.customBind(obj, 1)
const obj2 = new bound(2)
console.log(obj)
console.log(obj2)