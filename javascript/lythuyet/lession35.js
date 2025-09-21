const numbers = [1,2,3,4,5];

// declarative programming
const doubleWithDec = numbers.map(number => number * 2);

console.log(doubleWithDec)

// imperative programming
const doubleWithImp = [];
for(let i=0; i<numbers.length; i++) {
    const numberdouble = numbers[i] * 2;
    doubleWithImp.push(numberdouble)
}

console.log(doubleWithImp)