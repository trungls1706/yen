// value types and reference typestypes tham chiếu địa chỉ trong ram

let a1 = 1;
let a2 = 1;
console.log(a1 === a2) //true

let obj1 = { a: 1 }
let obj2 = { a: 1 }
console.log(obj1 === obj2) //false
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) //true

let a3 = a2
a3 = 2
console.log(a2) //1

let obj3 = obj2
obj3.a = 2
console.log('obj2',obj2)

function log(x) {
    x.b = 5 // thay đổi cả obj bên ngoài
}
log(obj1)

console.log(obj1)
