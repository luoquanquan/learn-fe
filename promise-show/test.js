const p = new Promise((resolve) => {
    resolve('success')
})

p.then(value => {
    console.log('success: ', value)
})
