const status = {
    pending: 'pending', fulfilled: 'fulfilled', rejected: 'rejected',
}

function PromiseByMyself(executor) {
    this.PromiseState = status.pending
    this.PromiseResult = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    const self = this

    function resolve(value) {
        if (self.PromiseState === status.pending) {
            self.PromiseState = status.fulfilled
            self.PromiseResult = value;
            self.onFulfilledCallbacks.forEach(function (callback) {
                callback()
            })
        }
    }

    function reject(value) {
        if (self.PromiseState === status.pending) {
            self.PromiseState = status.rejected
            self.PromiseResult = value
            self.onRejectedCallbacks.for((function (callback) {
                callback()
            }))
        }
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }

    return this
}

PromiseByMyself.prototype.then = function (fulfilled, rejected) {
    const self = this
    let nextPromise
    if (this.PromiseState === status.fulfilled) {
        nextPromise = new PromiseByMyself((resolve, reject) => {
            setTimeout(() => {
                try {
                    const value = fulfilled(self.PromiseResult)
                    resolve(value)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        })
        return nextPromise
    } else if (this.PromiseState === status.rejected) {
        nextPromise = new PromiseByMyself((resolve, reject) => {
            setTimeout(() => {
                try {
                    const value = rejected(self.PromiseResult)
                    reject(value)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        })

        return nextPromise
    } else if (this.PromiseState === status.pending) {
        nextPromise = new PromiseByMyself((resolve, reject) => {
            self.onFulfilledCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let value = fulfilled(self.PromiseResult)
                        resolve(value)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
            self.onRejectedCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let value = rejected(self.PromiseResult)
                        reject(value)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
        })
        return nextPromise
    }
}

PromiseByMyself.prototype.catch = function (rejected) {
    return this.then(null, rejected)
}


const p = new PromiseByMyself((resolve, reject) => {
    console.log('我立即执行')
    setTimeout(() => {
        resolve(100)
    }, 1000)
})
p.then((val) => {
    console.log('成功的值是：' + val)
    return ++val
}).then((val) => {
    console.log('我是链式调用输出' + val)
})