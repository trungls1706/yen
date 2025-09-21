//tham trị và tham chiếu

// const a = 1000
// true, false, null - tham trị

// const a = {name:'trung'}
// tham chiếu, kho chứa trên RAM
// với địa chỉ vùng nhớ gán cho a, không giữ giá trị
// phép gán tương đương copy địa chỉ
// const b = a => b trỏ về địa chỉ vùng nhớ của a



// tham trị
let a = 5
let b = a
a = 10
console.log(b) // 5

let obj1 = { name: 'son' }
let obj2 = obj1
obj1.name = 'trung'
console.log(obj2) // { name: 'trung' }

doMagic = (number) => {
    number = 10
}

let c = 5
doMagic(c)
console.log(c) // 5

doMagic2 = (obj) => {
    obj.name = 'aaa'
}

let obj3 = { name: 'cccc' }
doMagic2(obj3)
console.log(obj3)

// giải quyết cloneObj, cloneArr
// spread operator (...)