// Bước 1: Tạo hàm closure
var message = 'Biên toàn cục';
function showMessage() {
    var message = 'Biến cục bộ của hàm cha';
    return function () {
        console.log(message);
    };
}

// Bước 2: khởi tạo hàm closure
var messageFunc = showMessage();

// Bước 3: Chạy hàm closure
messageFunc();