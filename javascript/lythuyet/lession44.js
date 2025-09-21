let data = [10, 10, 100, 1000, 1000, 4, 5, 7]

// let data = arr.sort()
let result = []
let num = 0
let num2 = 0
for (var i in data) {
    let index = i++


    let num = data[index] - data[i]
    console.log(num)
    if (!isNaN(num)) {
        result.push(Math.abs(num))
    }
}

result && result.map((val, index) => {
    num2 = num2 + val
})

console.log('num2', num2)



function minDiff(arr) {
    // Write your code here
    let data = arr.sort(function(a, b){return b - a});

    let result = 0
    let num = 0
    for (var i in data) {
        let index = i++
        let num = Math.abs(data[index] - data[i])
        if (!isNaN(num) && num != 0) {
            result = result + num
        }
    }
    return result

}