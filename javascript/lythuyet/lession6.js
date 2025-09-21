// let aPromoise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Thanh cong')
//         reject(new Error('Không thành công'))
//     }, 1000)
// })

// aPromoise.then((msg) => console.log('Đã thực thi' + msg),
//     (errMsg) => console.log('err' + errMsg))

// let add = (a, b) => {

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (typeof (a) != 'number' || typeof (b) != 'number') {
//                 reject(new Error('Tham số phải là number'))
//             } else {
//                 resolve(a + b)
//             }
//         }, 0)
//     })
// }

// add(4, '5')
//     .then(result => add(result, 6))
//     // .catch(err => console.log(err.toString()))
//     .then(res => console.log(res))
//     .catch(err => console.log(err.toString()))

// // add(4, 5)
// //     .then(res => console.log(res),err=> console.log(err.toString()))  


let add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (a) != 'number' || typeof (b) != 'number') {
                reject(new Error('Tham số phải là number'))
            } else {
                resolve(a + b)
            }
        }, 0)
    })
}

let multiply = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (a) != 'number' || typeof (b) != 'number') {
                reject(new Error('Tham số phải là number'))
            } else {
                resolve(a * b)
            }
        }, 0)
    })
}

let devide = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (a) != 'number' || typeof (b) != 'number') {
                reject(new Error('Tham số phải là number'))
            } else if (b == 0) {
                reject(new Error('Chia cho 0'))
            } else {
                resolve(a / 2)
            }
        }, 0)
    })
}

let tinhDientich = (a, b, h) => {
    return add(a, b)
        .then(res => multiply(res , h))
        .then(result => devide(result , 2))
}

tinhDientich(6, 4, 5)
    .then(res => console.log(res))
    .catch(err => console.log(err.toString()))
    