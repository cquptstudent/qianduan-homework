function factorial_notLoop(n) {
    if (n == 1) {
        return 1
    }
    return n * factorial_notLoop(n - 1)
}

function factorial_loop(n) {
    let result = 1
    let i
    for (i = 1; i <= n; i++) {
        result *= i
    }
    return result;
}

let a = 10
console.log(factorial_notLoop(a))
console.log(factorial_loop(a))