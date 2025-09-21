//closure //garbage collector
// https://techmaster.vn/posts/34343/garbage-collector-cua-java
// https://kipalog.com/posts/Closure-va-scope-trong-javascript 
//https://viblo.asia/p/tim-hieu-ve-nested-functions-va-closures-trong-javascript-oOVlYyB4l8W

function sum(a,b){
    const c = a+b
    return function(){
        console.log(c)
    }
}

// console.log(sum(1,2)) // trả về function
// console.log(sum(1,2)()) //

function debug(name){
    return function log(str){
        console.log(`${name} - ${str}`)
    }
}

// const log = debug('aaa')
// console.log(log('vvv'))


function outerFunction(outerVariable){
    return function innerFunction(innerVariable){
        console.log('out ',outerVariable)
        console.log('in ',innerVariable)

    }
}

const a = new outerFunction('outside')
console.log(a('inside'))

