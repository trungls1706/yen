// https://kipalog.com/posts/var--let-va-const-trong-ES6

// const dùng để khai báo một hằng số - là một giá trị không thay đổi được trong suốt quá trình chạy.

// let tạo ra một biến chỉ có thể truy cập được trong block bao quanh nó, 
// khác với var - tạo ra một biến có phạm vi truy cập xuyên suốt function chứa nó.
// var có thể cập nhật lại

// Ngoài ra, khi ở global scope (tức là không nằm trong một function nào cả), 
// từ khóa var tạo ra thuộc tính mới cho global object (this), còn let thì không:


for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log('Yo! ', i);
    }, 1000);
}

// Yo! 5
// Yo! 5
// Yo! 5
// Yo! 5
// Yo! 5

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log('Yo! ', i);
    }, 1000);
}

// Yo!  0
// Yo!  1
// Yo!  2
// Yo!  3
// Yo!  4

function foo() {
    var x = 10;
    if (true) {
        var x = 20; // x ở đây cũng là x ở trên
        console.log(x); // in ra 20
    }
    console.log(x); // vẫn là 20
}

function foo() {
    let x = 10;
    if (true) {
        let x = 20; // x này là x khác rồi đấy
        console.log(x); // in ra 20
    }
    console.log(x); // in ra 10
} 