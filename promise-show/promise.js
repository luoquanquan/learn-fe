class Promise {
    constructor(executor) {

        const resolve = value => {
            this.value = value
        }

        executor(resolve)
    }

    then(onFulfilled) {
        onFulfilled(this.value)
    }
}

module.exports = Promise
