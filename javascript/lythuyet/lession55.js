// Mỗi function trong Javascript sẽ tồn tại một biến cục bộ tên là this, biến này sẽ đại diện cho chính function đó.
// Lúc này bạn chỉ việc sử dụng biến this để khai báo các thuộc tính và phương thức của đối tượng,
//  và cuối cùng là đừng quên return this để có thể sử dụng từ khóa new để khởi tạo mới một đối tượng nhé.

function User() {
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

    this.viewInfo = () => {
        console.log(this.username + this.password)
    }

    // Phải return this thì mới tạo mới được đối tượng
    return this;
}

// Bổ sung phương thức
User.prototype.setInfo = function (username, password) {
    this.username = username;
    this.password = password;
};

// Cách sử dụng
var user = new User();
user.setInfo('admin', '@123');

console.log(user.viewInfo())