const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
    this.PromiseState = PENDING
    this.PromiseResult = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    const _this = this
    function resolve(value) {
        if (_this.PromiseState === PENDING) {
            _this.PromiseState = FULFILLED
            _this.PromiseResult = value
            _this.onFulfilledCallbacks.forEach(function (callback) {
                callback()
            })
        }
    }
    function reject(value) {
        if (_this.PromiseState === PENDING) {
            _this.PromiseState = REJECTED
            _this.PromiseResult = value
            _this.onRejectedCallbacks.forEach(function (callback) {
                callback()
            })
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
    return this
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const _this = this
    let nextPromise
    if (this.PromiseState === FULFILLED) {
        nextPromise = new MyPromise((resolve, reject) => {
            setTimeout(function () {
                try {
                    const returnValue = onFulfilled(_this.PromiseResult)
                    resolve(returnValue)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        })
        return nextPromise
    }
    if (this.PromiseState === REJECTED) {
        nextPromise = new MyPromise((resolve, reject) => {
            setTimeout(function () {
                try {
                    const returnValue = onRejected(_this.PromiseResult)
                    reject(returnValue)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        })
        return nextPromise
    }
    if (this.PromiseState === PENDING) {
        nextPromise = new MyPromise((resolve, reject) => {
            _this.onFulfilledCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        const returnValue = onFulfilled(_this.PromiseResult)
                        resolve(returnValue)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            })
            _this.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        const returnValue = onRejected(_this.PromiseResult)
                        reject(returnValue)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            })
        })
        return nextPromise
    }
}