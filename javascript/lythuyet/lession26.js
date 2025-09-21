//https://viblo.asia/p/su-khac-nhau-giua-deep-copy-va-shallow-copy-trong-javascript-4dbZN3qylYM
const original = {
    name: 'Fiesta',
    age: 'aa',
    car: { //object lồng
        color: 'blue'
    }
}
// const copied = Object.assign({}, original)
// const copied = JSON.parse(JSON.stringify(original)) // để tránh việc thay đổi object lồng

const copied = {...original}

original.name = 'Focus'
original.age = 'bb'
original.car.color = 'yellow'

console.log(copied)
console.log(original)