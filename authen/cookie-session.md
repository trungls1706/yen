Chắc chắn rồi! Dưới đây là tóm tắt toàn bộ nội dung bạn đã cung cấp, được định dạng thành file Markdown.

---

# Tổng quan về Cookie và Session Authentication

## 🍪 Cookie là gì?

**Cookie** là một file nhỏ được lưu trữ trên thiết bị của người dùng bởi trình duyệt web. Nó dùng để lưu trữ thông tin về người dùng, ví dụ như tên đăng nhập, giỏ hàng, lịch sử duyệt web...

* **Cách thức hoạt động:** Khi bạn truy cập một trang web, máy chủ có thể gửi cookie về trình duyệt của bạn. Trình duyệt sẽ lưu cookie này và tự động gửi lại cho máy chủ đó trong các lần truy cập tiếp theo. Cookie chỉ được đọc và ghi theo **domain** cụ thể.
* **Lưu ý:**
    * Nên tránh lưu trữ mật khẩu trực tiếp trong cookie vì lý do bảo mật.
    * Dung lượng cookie bị giới hạn (thường tối đa 50 cookie và tổng kích thước không quá 4KB cho một trang web).
    * File cookie được lưu trên ổ cứng, ví dụ trên macOS: `/Users/<username>/Library/Application Support/Google/Chrome/Default/Cookies`.
* **Cách thức ghi và đọc cookie:**
    * **Ghi:**
        1.  Máy chủ gửi header `Set-Cookie` trong response.
        2.  Sử dụng JavaScript với `document.cookie`.
        3.  Thiết lập thủ công qua DevTools của trình duyệt.
    * **Đọc:**
        1.  Trình duyệt **tự động** gửi cookie lên máy chủ khi có request.
        2.  Sử dụng JavaScript với `document.cookie`.
        3.  Kiểm tra trong DevTools.

---

## 🛡️ Các lỗ hổng bảo mật và cách phòng chống

### **1. Tấn công XSS (Cross-Site Scripting)**

* **Tấn công:** Kẻ tấn công chèn mã JavaScript độc hại vào trang web, sau đó lấy cắp cookie của người dùng (ví dụ: cookie chứa thông tin nhạy cảm).
* **Phòng chống:** Sử dụng thuộc tính **`HttpOnly`** cho cookie. Cookie được set `HttpOnly` sẽ không thể đọc được bằng JavaScript, từ đó ngăn chặn tấn công XSS.

### **2. Lỗ hổng MITM (Man-in-the-Middle)**

* **Tấn công:** Kẻ tấn công can thiệp vào kết nối giữa người dùng và máy chủ, đọc trộm dữ liệu, bao gồm cả cookie.
* **Phòng chống:** Sử dụng thuộc tính **`Secure`** cho cookie. Cookie `Secure` chỉ được gửi qua các kết nối được mã hóa bằng HTTPS, giúp bảo vệ dữ liệu khỏi bị nghe lén.

### **3. Tấn công CSRF (Cross-Site Request Forgery)**

* **Tấn công:** Kẻ tấn công lợi dụng việc trình duyệt tự động gửi cookie, tạo một trang web giả mạo để lừa người dùng thực hiện các hành động độc hại trên trang web chính (ví dụ: đăng bài, chuyển tiền...).
* **Phòng chống:**
    * **Cách 1: SameSite Cookie:**
        * Thiết lập thuộc tính `SameSite` cho cookie.
        * `SameSite=Strict` ngăn trình duyệt gửi cookie cho các yêu cầu cross-site.
        * `SameSite=Lax` (mặc định với nhiều trình duyệt) chỉ cho phép gửi cookie với các yêu cầu GET.
    * **Cách 2: CSRF Token:**
        * Máy chủ tạo ra một chuỗi ngẫu nhiên (CSRF Token) và lưu vào cookie của người dùng.
        * Khi người dùng gửi request (ví dụ: form), token này phải được đính kèm.
        * Máy chủ so sánh token trong request với token trong cookie để xác thực.
    * **Cách 3: CORS (Cross-Origin Resource Sharing):**
        * Cơ chế này cho phép máy chủ chỉ chấp nhận các yêu cầu từ các tên miền được chỉ định, ngăn chặn yêu cầu từ các tên miền độc hại.

---

## 🔒 Session Authentication

### **1. Session là gì?**

**Session** là phiên lưu trữ thông tin người dùng trên **máy chủ**. Không giống cookie lưu trên client, session lưu trữ các dữ liệu quan trọng ở phía server.

### **2. Session Authentication là gì?**

Đây là một cơ chế xác thực người dùng sử dụng session.

* **Cách thức hoạt động:**
    1.  Người dùng đăng nhập thành công.
    2.  Máy chủ tạo một `Session ID` duy nhất và lưu thông tin phiên (session) tương ứng trên máy chủ.
    3.  Máy chủ gửi `Session ID` về cho client dưới dạng cookie.
    4.  Trong các request tiếp theo, trình duyệt sẽ tự động gửi `Session ID` này lên máy chủ.
    5.  Máy chủ kiểm tra `Session ID` để xác định người dùng.

### **3. Ưu và nhược điểm**

| Ưu điểm | Nhược điểm |
| :--- | :--- |
| Dễ triển khai | Cần bộ nhớ lưu trữ phiên trên server (RAM, DB, cache) |
| Bảo mật thông tin (không lộ username, password) | Dễ phình to bộ nhớ khi có nhiều người dùng |
| Toàn quyền kiểm soát phiên | Tốc độ chậm vì phải truy vấn session với mỗi request |
| | Khó khăn khi scale ngang (thêm server) vì phải chia sẻ session |

---