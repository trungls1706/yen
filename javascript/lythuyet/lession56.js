var objectName = {};
// Hoặc
var objectName = new Object();

var User = {

    // Thuộc tính
    username: "",
    password: "",

    // Phương thức
    setInfo: function (username, password) {
        this.username = username;
        this.password = password;
    },
    checkLogin: function () {
        return (this.username === 'admin' && this.password === '@123');
    }

};


// Cách sử dụng
User.setInfo('admin', '@123');
if (User.checkLogin()) {
    alert('Đăng nhập thành công');
}
else {
    alert('Đăng nhập thất bại');
}


var User = new function () {

    // Thuộc tính
    this.username = '';
    this.password = '';

    // Phương thức
    this.setInfo = function (username, password) {
        this.username = username;
        this.password = password;
    };

    this.checkLogin = function () {
        return (this.username === 'admin' && this.password === '@123');
    };

};