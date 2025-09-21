let square = (a, b, h) => (a + b) * h / 2


let callback = () => {
    setTimeout(() => {
        callback(123)
    }, 2000)
}

let add = (a, b, cb) => {
    setTimeout(() => {
        let err, result;
        if (typeof (a) != 'number' || typeof (b) != 'number') {
            // err = 'tham số phải là number'
            // return cb(err, result)
            // return cb('tham số phải là number')
            return cb(new Error('Tham số phải là number'))
        } else {
            // result = a * b
            // return cb(err, result)

            return cb(undefined, a + b)
        }
    }, 0)
}

add(4, 5, (err, result) => {
    if (err) {
        console.log('err', err)
    } else {
        console.log(result)
    }
})