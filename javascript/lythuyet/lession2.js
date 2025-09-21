let getFunction = (num) => {
    if (num >= 0) return () => { console.log('so duong') }
    return () => { console.log('so am') }
}

getFunction(-1)();


let a = ()=>{}

console.log(a())