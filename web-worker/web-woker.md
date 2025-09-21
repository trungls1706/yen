Web Worker là một API của trình duyệt cho phép bạn chạy các script JavaScript ở chế độ nền (background thread), tách biệt với luồng chính (main thread) của trang web.

### Lý thuyết

JavaScript theo mặc định là đơn luồng (single-threaded). Điều này có nghĩa là tất cả các tác vụ, từ cập nhật giao diện người dùng (UI) đến xử lý các phép tính phức tạp, đều chạy trên một luồng duy nhất. Khi bạn chạy một tác vụ tốn nhiều thời gian trên luồng chính, giao diện người dùng sẽ bị "đơ" hoặc "treo", gây ra trải nghiệm người dùng kém. 

Web Worker được tạo ra để giải quyết vấn đề này. Nó cho phép bạn gửi các tác vụ nặng (như xử lý dữ liệu lớn, mã hóa hoặc giải mã) sang một luồng riêng biệt. Điều này giúp luồng chính luôn "rảnh", đảm bảo trang web của bạn vẫn phản hồi và mượt mà.

**Cách hoạt động:**
-   **Tạo Worker:** Bạn tạo một đối tượng `Worker` mới và truyền vào đường dẫn của file JavaScript sẽ chạy ở chế độ nền.
-   **Giao tiếp:** Luồng chính và Web Worker giao tiếp thông qua hệ thống tin nhắn (message system). Bạn sử dụng `postMessage()` để gửi dữ liệu và lắng nghe các sự kiện `message` để nhận dữ liệu.
-   **Giới hạn:** Web Worker không có quyền truy cập trực tiếp vào DOM hoặc các API của trình duyệt như `window`, `document`, `alert`. Điều này là để đảm bảo an toàn và tính độc lập của nó.

### Best Practices (Thực tiễn tốt nhất)

1.  **Chỉ sử dụng cho các tác vụ nặng:** Đừng lạm dụng Web Worker cho mọi thứ. Chỉ sử dụng nó khi bạn cần xử lý các tác vụ tiêu tốn nhiều CPU, kéo dài hơn 50ms và có thể gây tắc nghẽn luồng chính.
2.  **Giữ cho dữ liệu giao tiếp nhỏ gọn:** Việc truyền dữ liệu giữa luồng chính và Worker tốn chi phí. Hãy truyền các đối tượng hoặc mảng nhỏ gọn. Tránh truyền các đối tượng DOM hoặc dữ liệu lớn không cần thiết.
3.  **Tạo một file Worker độc lập:** Luôn đặt code của Worker trong một file JavaScript riêng biệt, tách rời với file script chính của bạn. Điều này giúp quản lý và debug dễ dàng hơn.
4.  **Sử dụng để xử lý các tác vụ tính toán:** Web Worker rất phù hợp cho các tác vụ như tính toán phức tạp, xử lý hình ảnh, nén dữ liệu, hoặc tìm kiếm trong tập dữ liệu lớn.
5.  **Kết hợp với Promises/async-await:** Sử dụng các Promise để quản lý việc giao tiếp bất đồng bộ một cách rõ ràng. Khi bạn gửi một tin nhắn đến Worker, hãy trả về một Promise và xử lý kết quả khi Worker gửi lại tin nhắn.

```
// index.js (Luồng chính)
if (window.Worker) {
  // Tạo một instance của Worker, trỏ đến file worker.js
  const myWorker = new Worker('worker.js');
  
  // Gửi một tin nhắn đến worker
  myWorker.postMessage('Hãy tính toán số lớn!');

  // Lắng nghe tin nhắn từ worker
  myWorker.onmessage = (e) => {
    console.log('Tin nhắn từ worker:', e.data);
    // Nhận kết quả và cập nhật UI (nếu cần)
    document.getElementById('result').textContent = e.data;
  };
}
```

```
// worker.js (Luồng nền)
self.onmessage = (e) => {
  const messageFromMainThread = e.data;
  console.log('Tin nhắn nhận được từ luồng chính:', messageFromMainThread);

  // Thực hiện một tác vụ tính toán nặng
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }

  // Gửi kết quả trở lại luồng chính
  self.postMessage(result);
};
```