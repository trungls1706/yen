let obj1 = {
    email: "zzxxcc@gmail.com",
    first_name: "hdbdbbd",
    last_name: "bfhddhb",
    name: "bfhddhb hdbdbbd"
}

let obj2 = {
    userId: 1022423380
}



obj1.userId = obj2.userId
let a = {...obj1, ...obj2   } // clone

console.log(a)