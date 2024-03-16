const add10 = (x) => x + 10
const mul10 = (x) => x * 10
const add100 = (x) => x + 100

function compose(...functions) {
    return function (x) {
        return functions.reduceRight(
            async (accumulator, currentValue) => currentValue(await accumulator), x
        )
    }
}

compose(add10, mul10, add100)(10).then(result => console.log(result))

