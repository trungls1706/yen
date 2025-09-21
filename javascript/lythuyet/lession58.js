// Tham số đầu tiên của hàm call() là đối tượng this, 
// tiếp theo chính là các tham số của hàm cần gọi.

// Hàm này dùng để xử lý khởi tạo
function initProduct(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    // Khởi tạo
    // biến this chính là Food, vì vậy sau khi chạy xong đối tượng Food sẽ có hai
    // thuộc tính là name và price
    initProduct.call(this, name, price);
}

function Hat(name, price) {
    // Khởi tạo
    // biến this chính là Food, vì vậy sau khi chạy xong đối tượng Food sẽ có hai
    // thuộc tính là name và price
    initProduct.call(this, name, price);
}


var food = new Food('Trái xoài', 5);
var hat = new Food('Cái mũ', 6);

console.log(food);
console.log(hat);