const fs = require('fs')
const util = require('util')
// const co = require('co')
const readFile =  util.promisify(fs.readFile)

const co = it => new Promise((resolve, reject) => {
    const next = data => {
        const {value, done} = it.next(data)

        if (!done) {
            if (value instanceof Promise) {
                value.then(data => {
                    next(data)
                }, reject)
            } else {
                next(data)
            }
        } else {
            resolve(data)
        }
    }
    next()
})


function * readHello() {
    const content1 = yield readFile('1', 'utf8')
    const content2 = yield readFile(content1, 'utf8')
    const content3 = yield readFile(content2, 'utf8')
    const content4 = yield [1,2,3]
    return content3
}

var it = readHello()

co(it).then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
})

async function readHello2() {
    const content1 = await readFile('1', 'utf8')
    const content2 = await readFile(content1, 'utf8')
    const content3 = await readFile(content2, 'utf8')
    return content3
}

readHello2().then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
})