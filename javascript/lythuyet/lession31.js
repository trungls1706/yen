// function printString (str, callback){
//     setTimeout(()=>{
//         console.log(str)
//         callback()
//     },0) // 1s
// }

// function printAll() {
//     printString("A", () => {
//         printString("B", () => {
//             printString("C", () => { })
//         })
//     })
// }


function printString(string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(string)
            resolve()
        }, 0)
    })
}

// function printAll() {
//     printString("A")
//         .then(() => {
//             return printString("B")
//         })
//         .then(() => {
//             return printString("C")
//         })
// }

// let arr = ['A', 'B', 'C']

// async function printAll() {
//     let index = -1
//     await printString(arr[++index])
//     await printString(arr[++index])
//     await printString(arr[++index])
// }

// printAll()

function printString(string, indx, cb){
    if(indx == 27) {
      cb('err')
    }
    cb(null, string)
}

function printAll(){
    let arr = [...Array(26)].map((val, i) => String.fromCharCode(i + 65)); 
    // console.log(arr) // ["A", "B", "C", "D" ... "Z"]
  
    let index = 0;
    setTimeout(function cbOfcb() {
      let array = arr
      if(index < 27){
        printString(array[index++], index, callback); // pass string , index , callback
        cbOfcb(); // call itself
      }
  
      
    }, 1000)
  
  
  }
  
  printAll()

