//apply: function apply(this, [param1, param2,...]) // có thể nhận vào object like array
// Hai function này đều đều nằm trong function prototype cho nên chỉ có function mới có thể gọi được
// Chức năng chung của chúng là xác định một tham số, xác định this và truyền các tham số còn lại vào.
// Điểm khác nhau cơ bản giữa chúng là apply sẽ truyền 1 array các tham số còn call sẽ truyền lần lượt các tham số.


// call()
// Function.prototype.call(thisArg[, arg1[ , arg2, …]])
// apply()
// Function.prototype.apply(thisArg, argArray)

function sum() {
    const numbers = Array.from(arguments)
    return numbers.reduce((sum, num) => sum + num, 0)
}

function avg() {
    const result = sum.apply(null, arguments)
    return result / arguments.length
}

console.log(avg(1, 2, 3, 6))



var obj = {
    firstName: "Ahihi",
    lastName: "Ihaha",

    mMethod: function (firstName, lastName) {
        var firstName = firstName || this.firstName
        var lastName = lastName || this.lastName
        console.log("Hello " + firstName + " " + lastName)
    }
}

var obj1 = {
    firstName: 'xxx',
    lastName: "yyy"
};

obj.mMethod() // Hello Ahihi Ihaha

obj.mMethod.call(obj1) // Hello xxx yyy

obj.mMethod.apply(obj1) // Hello xxx yyy

obj.mMethod.call(obj1, "xxx", "yyy") // Hello xxx yyy

obj.mMethod.apply(obj1, ["xxx", "yyy"]) // Hello xxx yyy



// Trong ví dụ trên hàm call đã set biến this cho hàm callback nên khi gọi hàm print biến this được gọi chính là obj. 
// Nếu không gọi call , this.mVal sẽ chỉ là undefnied . Với apply cũng tương tự như vậy


function print() {
    console.log(this.mVal)
}

var obj = {
    mVal: "lalala",

    mMethod: function (callback) {
        // truyền đối tượng hiện tại cho hàm phản hồi callback
        callback.call(this)
    }
}

obj.mMethod(print) //sẽ in ra lalala

//   Sử dụng để mượn hàm (borrowing function)

function test(firstParam, secondParam, thirdParam) {
    var args = Array.apply(null, arguments);

    console.log(args);

}

test(1, 2, 3); // [1, 2, 3]

// Arguments là một object giống array nhưng không phải là array.
// Arguments giống array vì nó có fieldlength, có thể truy cập các giá trị nó chứa thông qua index 0, 1, 2.
// Tuy nhiên, do arguments không phải là array nên nó không thể gọi các hàm của Array.prototype.
// Do đó, ta phải sử dụng call / apply để mượn một số hàm trong Array.prototype, các hàm này sẽ trả ra một array cho ta xử lý.
// Dòng code phía trên chuyển object arguments thành một array


var user = {
    name: 'XXX',
    showName: function () {
        console.log('My name is:' + this.name);
    }
}
user.showName() // My name is XXX

var oldShowName = user.showName.bind(user);
user.showName = function () {  // ở đây ta thay đổi hàm showName bằng hàm mới
    console.log('before show name');
    oldShowName.call(this);  // giữ nguyên hàm cũ
    console.log('after show name');

}

user.showName();