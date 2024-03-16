const throttle = function (fn, interval = 500) {
    let func = fn
    let lastTime = 0
    let firstTime = true
    return function () {
        let args = arguments;
        let self = this;
        console.log(self);
        if (firstTime) {
            func.apply(self, args);
            return firstTime = false;
        }
        let nowTime = Date.now()
        if (nowTime - lastTime < interval) {
            return false;
        }
        lastTime = nowTime
        func.apply(self, args)
    }
}

let input = document.querySelector("#textArea")
let show = document.querySelector("#result")
input.addEventListener("click", throttle(function () {
    show.textContent = input.value
}))