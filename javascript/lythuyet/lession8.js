
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

// let tinhDientich = async (a, b, h, cb) => {

//     try {
//         let ab = await add(a, b)
//         let abh = await multiply(ab, h)
//         let b2 = await devide(abh, 2)
//         return cb(undefined, b2)
//     } catch (err) {
//         return cb(new Error(err))
//     }


// }

// tinhDientich(4, 5, 6,(err, result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })


let tinhDientich = async (a, b, h) => {

    try {
        let ab = await add(a, b)
        let abh = await multiply(ab, h)
        let b2 = await devide(abh, 2)
        return Promise.resolve(b2)
    } catch (err) {
        return Promise.reject(err)
    }


}

// tinhDientich(4, 5, 6)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

// Promise.all([multiply(4, 5), add(4, 5)])
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

Promise.race([multiply(4, 5), add(4, '5')])
    .then(res => console.log(res))
    .catch(err => console.log(err))