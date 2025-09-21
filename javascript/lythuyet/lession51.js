let arr = [2, 3, 4, 6, 7, 8]

let data = []
let index = 0
for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 7) {
        index = i
    }
}

console.log(index)