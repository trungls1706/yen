var person1 = { firstName: 'Jon', lastName: 'Kuperman' };
var person2 = { firstName: 'Kelly', lastName: 'King' };

function say(greeting1, greeting2) {
    console.log(greeting1 + ',' + greeting2 + ' ' + this.firstName + ' ' + this.lastName);
}

say.call(person1, 'Hello', 'Good morning'); // => Hello,Good morning Jon Kuperman
say.call(person2, 'Hello', 'Good morning'); // => Hello,Good morning Kelly King

/// 

var person1 = { firstName: 'Jon', lastName: 'Kuperman' };
var person2 = { firstName: 'Kelly', lastName: 'King' };

function say(greeting0, greeting1) {
    console.log(greeting0 + ',' + greeting1 + ' ' + this.firstName + ' ' + this.lastName);
}

say.apply(person1, ['Hello', 'Good moring']); // => Hello,Good moring Jon Kuperman
say.apply(person2, ['Hello', 'Good moring']); // => Hello,Good moring Kelly King

///

var person1 = { firstName: 'Jon', lastName: 'Kuperman' };
var person2 = { firstName: 'Kelly', lastName: 'King' };

function say(greeting0, greeting1) {
    console.log(greeting0 + ',' + greeting1 + ' ' + this.firstName + ' ' + this.lastName);
}

var sayHelloJon = say.bind(person1, 'Hello', 'Good morning');
var sayHelloKelly = say.bind(person2, 'Hello', 'Good morning');

sayHelloJon(); // => Hello,Good morning Jon Kuperman
sayHelloKelly(); // => Hello,Good morning Kelly King

// Nhìn chung, hàm call và apply là gần giống nhau.Chúng đều gọi hàm trực tiếp.
// Chỉ khác ở cách truyền tham số vào(với call thì đối số phân cách bởi dấu phẩy comma và với apply thì đối số cho bởi mảng array)
// Hàm bind thì hơi khác hơn một chút.Hàm này không gọi hàm trực tiếp mà nó sẽ trả về một hàm mới.
// Và bạn có thể sử dụng hàm số mới này sau.Về cách truyền tham số vào thì nó giống với hàm call.
