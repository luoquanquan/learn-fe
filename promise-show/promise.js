// promise.js
class Promise {
    constructor(executor) {
        this.value = null
        this.onFulfilled = null

        const resolve = value => {
            this.value = value
            this.onFulfilled(this.value)
        }

        executor(resolve)
    }

    then(onFulfilled) {
        this.onFulfilled = onFulfilled
    }
}

module.exports = Promise
