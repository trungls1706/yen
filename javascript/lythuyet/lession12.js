let handleSpecialSymbol = (data) => {
    let str = ''
    let bool = true
    let arr = [
        { key: '(', val: '%26' },
        { key: ')', val: '%27' },
        { key: '|', val: '%28' },
        { key: '-', val: '%29' },
        { key: '&', val: '%30' }
    ]
    for (var i in data) {
        for (var j of arr) {
            if (data[i] == j.key) {
                str += j.val
                bool = false
                // break
            } else {
                bool = true
            }
        }
        if (bool) {
            str += data[i]
        }
    }
    return str
}

console.log(handleSpecialSymbol('Lock & Lock')) //Lock %30 Lock
console.log(handleSpecialSymbol('D-nee')) //D%29nee

