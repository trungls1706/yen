let data2 = '|huyne|trungne|kietne'.split('|')

let convert = (string, symbol) => {
    let text = ''
    let arr = []
    for (let i in string) {
        if (string[i] == symbol) {
            arr.push(text)
            text = ''
        } else {
            text += string[i]

            if (parseInt(i) + 1 === string.length) {
                arr.push(text)
                text = ''
            }
        }
    }
    return arr
}


let data = convert('|huyne|trungne|kietne', '|')

console.log(data)
console.log(data2)