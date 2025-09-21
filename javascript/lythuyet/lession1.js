let a = 10;
if (true) {
    let b = 10 // không console.log được
    var c = 10 // chạy console được
}

let arr = [1, 3, 5, 6, 9]

var arr2 = arr.map(val => {
    return val * 2
})

var arr3 = arr.map(function (val) {
    return val * 2
})

var arr4 = arr.map(val => val * 2)


arr.forEach(e => {
    console.log(e)
})

function add1(a, b) {
    return a * b
}
let add2 = (a, b) => a * b
let add3 = (a, b) => {
    return a * b
}


console.log(arr4)