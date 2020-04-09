// promise.js
class Promise {
    constructor(executor) {
        this.value = null
        this.onFulfilledCallbacks = []

        const resolve = value => {
            this.value = value
            this.onFulfilledCallbacks.forEach(fn => fn(this.value))
        }

        executor(resolve)
    }

    then(onFulfilled) {
        this.onFulfilledCallbacks.push(onFulfilled)
    }
}

module.exports = Promise
