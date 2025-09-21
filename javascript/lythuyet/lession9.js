'- Number + String = String + String = String '
'- Number - NumberString = Number - Number = Number '

// phép cộng, biến đổi từ số sang chuỗi, rồi nối chuỗi
// phép trừ, biến chuỗi về số, không biến đổi trả về NaN

// cộng là nối chuỗi
// trừ là thự thi

//string + string = string
// number + string = string + string = string

//100 + '200' = '100200'
console.log(100 + '200')

// 200200
console.log(100 + 100 + '200')

// 100200200
console.log(100 + '200' + 200)

//-----//

// num - num = num
// str - str = NaN

//NumberString
//vd : '110', '220'

//100
console.log(200 - '100')

//300
console.log(500 - '100' - 100)

console.log(100 + 100 + '100' - 100)

console.log(100 + '100' - '100' + 100)

console.log(100 + 100 - 'abc')
