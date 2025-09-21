
// https://viblo.asia/p/cach-ma-google-amazon-quet-sach-hang-ngan-js-developers-xau-so-chi-boi-1-cau-interview-don-gian-1VgZveBRKAw?fbclid=IwAR15HeZzmAOYsXWzGbOX9OSGmx_6ua6ox8C-_HckRhgoibeIwOXmjOKkuUQ#_cau-hoi-phong-van-cua-google--amazon-0
// https://morioh.com/p/4a44367a548d?f=5c21fb01c16e2556b555ab32&fbclid=IwAR1W1Y-RRz5M48nZ-K1ovbFbTiUmsacvzfwouJocNey5yiiKDsnyVzdWstI
// https://morioh.com/p/37c7fd1937c2?f=5c21f93bc16e2556b555ab2f&fbclid=IwAR0pFf5n07126Ah6kkErYaL7egpTkCoXJoeoq-iB8PnKGFP0HyhUYIp4w0Y


// phỏng vấn gg
const arr = [1, 2, 3, 4];
// for (var i = 0; i < arr.length; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, 0)
// } 
// chạy xong hết vòng lặp, mới chạy function lúc này thì i = 4

//c1, Dùng IIFE (Immediately Invoked Function Expression)
// for (var i = 0; i < arr.length; i++) {
// (function (i) {
//       setTimeout(function() {
//         console.log(i);
//       }, 0)
//     })(i)
// }

// c2
// function log(val) {
//     setTimeout(() => {
//         console.log(val)
//     }, 0)
// }

// for (i = 0; i < arr.length; i++) {
//     log(i)
// }


// Vậy thì khi vòng For chạy, biến i được khai báo, mỗi vòng lặp sẽ gọi setTimeout,
// setTimeout nằm trong scope của vòng For cho nên nó có thể access biến i và lưu giá trị(còn gọi là tham chiếu tới biến i).
// setTimeout là async cho nên sẽ xếp vào hàng đợi và chờ cho vòng for kết thúc.Khi vòng For kết thúc, i lúc này là 4.
// Và như ta biết đặc tính của closure function: dù cho outer function hoặc block scope chứa nó kết thúc thì nó vẫn có thể lưu lại giá trị biến i.
// Sau đó khi không còn bất kỳ code đồng bộ nào được chạy nữa.
// Lúc này Call Stack rỗng và Event Queue sẽ đưa các function setTimeout chờ từ trước đó đưa vào Call Stack và thực hiện.
// Khi đó i = 4. Suy ra ta có kết quả: 4 4 4 4






// Trong javascript ta có 2 scopes: Global scope và local scope.
// Nếu bạn đã làm việc với js 1 thời gian, bạn sẽ nhận ra ngay.

// Global scope là scope mà các functions, variables được khai báo ở ngoài cùng của file js bạn đang code. 
// Tức là nó sẽ không nằm trong bất kì một functions nào khác.

// Local scope gồm chia làm 2 loại: Functional scope và Block scope. 
// Functional scope là phạm vi mà variables hoặc functions bạn khai báo nằm trong 1 function A, 
// do đó các variables/functions sẽ chỉ được access và exist trong scope của function A, 
// nếu thoát khỏi function A bạn không thể access hoặc use chúng nữa.


var a = 5; // a has global scope
function add(a) { // add function has global scope
    var b = 10; // b has local scope (functional scope)
    return function result() { // result function has local scope (functional scope)
        return a + b;
    }
}

{
    let c = 15; // c has local scope (block scope)
    let test = () => { // test has local scope (block scope)
        console.log('here is blockScope');
    }
}

var a = 10;
function test1() {
    console.log('test1', a);
    return function test2() {
        var a = 15;
        console.log('test2', a);
        return function test3() {
            console.log('test3', a);
        }
    }
}

console.log(test1()())

// Closure function
// là 1 function (inner function) nằm trong 1 function khác (outer function) hoặc block scope khác.
// Có thể access các variables (còn gọi là có lexical scope bind to outer function) trong outer function
//  và hold giá trị của các variables đó cho dù outer function được gọi và kết thúc, 
//  hoặc inner function được gọi ở global scope..

function A() { // outer function
    var a = 10; // can be accessible by closure function
    return function B() { // inner function (closure function)
        return a + 10;
    }
}

var closureFunc = A(); // assign B to a variable and finish A function

console.log(closureFunc())

// Không có một định nghĩa chính thức nào cho Closure, một số khái niệm trên mạng khá lằng nhằn. Có nơi gọi nó là function, có nơi gọi nó là một kĩ thuật trong javascript. Mình có đúc kết lại một định nghĩa dễ hiểu và dễ hình dung nhất cho các bạn như thế này.

// Closure là cách mà một function cha return về một function con bên trong nó. 
// Ở trong function con đó có thể truy cập và thực thi các biến của function cha. 
// Phải đủ 2 điều kiện này mới được gọi là Closure nhé.