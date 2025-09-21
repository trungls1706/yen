//Array like object
//arguments
const names = ['ly', 'son', 'trung']

for (let i = 0; i < names.length; i++) {
    console.log(names[i])
}

const obj = {
    0: 'ly',
    1: 'son',
    2: 'trung',
    length: 3
}
for (let i = 0; i < obj.length; i++) {
    console.log(obj[i])

}

// function sum(){
//     let result = 0
//     for(let i=0;i<arguments.length;i++){
//         result += arguments[i]
//     }
//     return result
// }

function sum() {
    const numbers = Array.from(arguments)
    return numbers.reduce(function (sum, num) {
        return sum + num
    }, 0)
}
sum(1, 2, 3)