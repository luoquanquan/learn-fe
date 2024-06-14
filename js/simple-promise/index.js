const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    let called = false

    if (promise2 === x) throw new TypeError('Circular reference')

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            const {then} = x

            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(excutor) {
        this.status = PENDING
        this.value = null
        this.reason = null

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (value instanceof Promise) {
                return value.then(data => resolve(data), err => reject(err))
            }

            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            excutor(resolve, reject)
        } catch(e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function'  ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function'  ? onRejected : e => {throw e}

        const promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const r = onRejected(this.reason)
                        resolvePromise(promise2, r, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                          } catch (e) {
                            reject(e)
                          }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                          const r = onRejected(this.reason)
                          resolvePromise(promise2, r, resolve, reject)
                        } catch (e) {
                          reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }
}

Promise.defer = Promise.deferred = () => {
    const dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
}

Promise.all = promises => new Promise((resolve, reject) => {
    const ret = []
    let index = 0

    const run = (idx, data) => {
        ret[idx] = data
        if (++index === promises.length) {
            resolve(ret)
        }
    }

    promises.forEach((promise, idx) => {
        if (promise instanceof Promise) {
            promise.then(data => {
                run(idx, data)
            }, reject)
        } else {
            run(idx, promise)
        }
    })
})

Promise.race = ps => new Promise((resolve, reject) => ps.forEach(promise => {
    if (promise instanceof Promise) {
        promise.then(data => {
            resolve(data)
        }, reject)
    } else {
        resolve(promise)
    }
}))

Promise.resolve = data => new Promise(resolve => resolve(data))
Promise.reject = e => new Promise((resolve, reject) => reject(e))


Promise.promisefy = fn => (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
        if (err) return viod(reject(err))
        resolve(data)
    })
})

module.exports = Promise