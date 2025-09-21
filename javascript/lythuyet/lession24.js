// ...spread trải ra

// const a = [1, 2, 3]
// const b = [0, ...a, 4] // [ 0, 1, 2, 3, 4 ]
// const c = [0, a, 4] // [ 0, [ 1, 2, 3 ], 4 ]


//vd 

const a = [1, 2, 3]

function sum(...nums) {
    return nums.reduce((a, b)=> a + b, 0)
}

console.log(sum(...a))

// spread obj
