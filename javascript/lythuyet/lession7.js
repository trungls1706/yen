let addPr = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof (a) != 'number' || typeof (b) != 'number') {
                reject(new Error('Tham số phải là number'))
            } else {
                resolve(a + b)
            }
        }, 2000)
    })
}

// let add = async () => {
//     let res = await addPr(4, 5)
//     console.log(res)
// }
// add()

let add = () => {
    addPr('a', 5)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

add()