function round(num) {
    let data = num
    data = (data - Math.trunc(data))
    return Math.trunc(num) + Number(data.toFixed(1))
}

function converse(num) {
    let index = num.toString().length
    let arrDevide = [
        1000,       //1.000
        1000,       //10.000
        1000,       //100.000
        1000000,    //1.000.000
        1000000,    //10.000.000
        1000000,    //100.000.000
        1000000000, //1.000.000.000
        1000000000, //10.000.000.000
        1000000000, //100.000.000.000
    ]

    let arrText = ['K', 'K', 'K', 'M', 'M', 'M', 'B', 'B', 'B']

    if (num && num > 999) {
        let data = round(num / arrDevide[index - 4])
        console.log(data + arrText[index - 4])
    } else {
        console.log(num)
    }
}

console.log(converse(1234))

