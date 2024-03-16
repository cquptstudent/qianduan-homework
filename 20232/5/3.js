let person = {
    name: '佐科姐姐',
    age: 1000000,
    address:{
        city: 'ChongQing',
        area: 'NanShan',
    },
    title: ['student', {year:2022, title:'GoodStudent'}]
}


let people = {}

Object.assign(people, person)

console.log(people)

people.age = 0;

console.log(people)
console.log(person)