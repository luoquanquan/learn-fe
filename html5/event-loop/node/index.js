console.log('start')

setTimeout(() => {
    console.log('timeout')
}, 0);

Promise.resolve().then(() => {
    console.log('then')
})

process.nextTick(() => {
    console.log('nextTick')
})

console.log('end')

// start
// end
// nextTick
// then
// timeout

// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/