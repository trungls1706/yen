let add = (a, b, cb) => {
    setTimeout(() => {
        if (typeof (a) != 'number' || typeof (b) != 'number') {
            return cb(new Error('Tham số phải là number'))
        } else {
            return cb(undefined, a + b)
        }
    }, 0)
}

let multiply = (a, b, cb) => {
    setTimeout(() => {
        if (typeof (a) != 'number' || typeof (b) != 'number') {
            return cb(new Error('Tham số phải là number'))
        } else {
            return cb(undefined, a * b)
        }
    }, 0)
}

let devide = (a, b, cb) => {
    setTimeout(() => {
        if (typeof (a) != 'number' || typeof (b) != 'number') {
            return cb(new Error('Tham số phải là number'))
        } else if (b == 0) {
            return cb(new Error('Chia cho 0'))
        } else {
            return cb(undefined, a / 2)
        }
    }, 0)
}

let tinhDientich = (a, b, h, cb) => {
    add(a, b, (err, result) => {
        if (err) return cb(err);
        multiply(result, h, (err, result) => {
            if (err) return cb(err);
            devide(result, 2, (err, result) => {
                if (err) return cb(err)
                cb(undefined, result)
            })
        })
    })
}

tinhDientich(2, 3, 5, (err, result) => {
    if (err) {
        console.log(err.toString())
    } else {
        console.log(result)
    }
})