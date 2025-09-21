//...rest : phần còn lại // gom các phần tử thành 1 array

// function a(a){
//     console.log(a)
// }

// console.log(a(1))            //1
// console.log(a(1,2,3,4,5))    //undefined

// function a(a){
//     console.log(a)
// }

// function log(...numbers){
//     console.log(numbers) // Array.from(arguments)
//     console.log(arguments) //array like object
// }

// log(1,2,3,4)

//vd:
// function sum(...nums){
//     return nums.reduce((a,b)=>a+b,0)
// }

// console.log(sum(1,2,3))

function concat(seperator, ...strings) {
    return strings.join(seperator)
}

console.log(concat('.', 'a', 'b', 'c'))
