// test.js
const Promise = require('./promise')

const p = new Promise((resolve) => {
    setTimeout(() => {
        resolve('success')
    }, 1e2);
})

p.then(value => {
    console.log('success: ', value)
})

p.then(value => {
    console.log('success2: ', value)
})
