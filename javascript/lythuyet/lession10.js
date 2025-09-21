//reduce lập qua mảnh, tính toán và trả ra kết quả cuối cùng
// for of là trả về phần tử arr
// for in là trả về vị trí obj

// Không nên bỏ trống các giá trị trong cú pháp của vòng lặp for.
// Chỉ nên sử dụng vòng lặp for...in khi cần lặp qua object, không nên sử dụng với array.
// Vòng lặp for...of không dùng được với object.


let sumFor = (arr) => {
    let sum = 0

    for (let num of arr) {
        let newSum = num + sum
        sum = newSum
    }

    // for (let num in arr){
    //     let newSum = arr[num] + sum
    //     sum = newSum
    // }

    // arr.map(e => {
    //     let newSum = e + sum
    //     sum = newSum
    // })

    return sum
}

// console.log(sumFor([1, 2, 3, 4,5]))

// 5*6 /2
// chiều dài mảng * chiều dài mảng + 1 /2


//reduce
// tham số đầu vào
// kết quả = kết quả trước đó + giá trị hiện tại

// let reduceSum = (arr)=>{
//     return arr.reduce((sum, num)=>{
//         let newSum = sum + num
//         return newSum
//     },0)
// }

// let reduceSum = (arr) => {
//     return arr.reduce((sum, num) => sum + num, 0)
// }

// console.log(reduceSum([1, 2, 3, 4, 5]))

let find = (arrWord) => {
    if (arrWord.length == 0) return null

    return arrWord.reduce((result, word) => data = result.length > word.length ? result : word, arrWord[0])
}

console.log(find(['avx', 'qweqwe', '22']))


// in put
const itemList = [
    { id: 'key1', value: 'ly' },
    { id: 'key2', value: 'son' },
    { id: 'key3', value: 'trung' }
]

// out put
// const itemArr = {
//     key1: 'ly',
//     key2: 'son',
//     key3: 'trung'
// }

let convert = (arr) => {
    if (arr.length == 0) return null

    return arr.reduce((result, data) => {
        result[data.id] = data.value
        return result
    }, {})
}

console.log(convert(itemList))
