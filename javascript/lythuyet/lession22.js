//static không được gọi từ instance của class
//instance obj được tạo ra từ class

// class Foo{
//     static someMethod(){
//         console.log('someMethod')
//     }

//     anotherMethod(){
//         console.log('anotherMethod')
//     }
// }

// console.log(Foo.someMethod()) // someMethod
// console.log(Foo.anotherMethod()) // Foo.anotherMethod is not a function

// const foo = new Foo()
// console.log(foo.someMethod()) // foo.someMethod is not a function
// console.log(foo.anotherMethod()) // anotherMethodanotherMethod

// function Foo(){

// }

// Foo.prototype.anotherMethod = function(){
//     console.log('anotherMethod')
// }

// Foo.someMethod = function(){
//     console.log('someMethod')
// }

// const foo = new Foo()
// console.log(foo.anotherMethod())

