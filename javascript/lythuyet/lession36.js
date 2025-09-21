// Use strict dịch sang tiếng việt thì có nghĩa là sử dụng sự nghiêm ngặt.
// Khi một đoạn lệnh được khai báo use strict thì tất cả các dòng code ở phía dưới
// dòng khai báo use strict sẽ được quản lý một cách nghiêm ngặt hơn về cú pháp.

x = 10;
console.log(window.x);
// => 10

// Ở chế độ strict mode, bạn sẽ bị lỗi x chưa được định nghĩa:
// Uncaught ReferenceError: x is not defined

x = 10;
console.log(window.x);
// => Uncaught ReferenceError: x is not defined

// https://viblo.asia/p/use-strict-la-gi-va-cach-su-dung-trong-javascript-3P0lPz2mKox