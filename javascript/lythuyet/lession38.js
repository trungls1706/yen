// JavaScript Hoisting
// Hoisting là hành động mặc định của Javascript, 
// nó sẽ chuyển phần khai báo lên phía trên top Trong Javascript,
// một biến (variable) có thể được khai báo sau khi được sử dụng
 
// console.log(a);
// var a = 'Hello Hoisting'

// x = 10;
// console.log("x = ", x); // in ra 10
// var x;

// x = 10;
// console.log("x = ", x); // Báo lỗi x is not defined
// let x;

// var x;
// x = 10;
// console.log("x = ", x); // in ra 10

say_something('YOLO');
function say_something(a){
    console.log(a);
}//YOLO

do_something();
function do_something(){
    console.log(a);
    var a = 'fly';
}//undefined

// phần khai báo chỉ được chuyển lên trên top của hàm do_something chứ không phải của chương trình
// var a
// console.log(a)
// a = 'fly' => undefined


var show_me;
show_me();
function show_me() {
  console.log('Money');
}
show_me = function() {
  console.log('Diamond');
}