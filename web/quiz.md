## 🔑 **Authentication & Authorization**

1. **Authentication vs Authorization**

   * **Authentication**: Xác minh *bạn là ai* (vd: login bằng username/password, OTP).
   * **Authorization**: Xác định *bạn được phép làm gì* (vd: user thường không được xóa dữ liệu admin).

2. **CSRF token chống gì?**

   * CSRF (Cross-Site Request Forgery) là kiểu tấn công khi attacker lừa user gửi request hợp lệ (có cookie session) nhưng trái ý.
   * CSRF token là random string kèm theo form/request, attacker không đoán được → chặn được CSRF.

3. **Không lưu password plain text**

   * Nếu DB bị lộ → toàn bộ password lộ.
   * Phải **hash + salt** mật khẩu trước khi lưu.

4. **JWT vs Session-based**

   * **Session-based**: Server lưu session state, cookie chỉ chứa session id.
   * **JWT**: Server không lưu state, thông tin chứa trong token (signed).
   * JWT tiện (stateless), nhưng khó thu hồi ngay lập tức khi bị lộ.

5. **HTTPS thay vì HTTP**

   * HTTP gửi plain text → MITM có thể đọc và sửa.
   * HTTPS mã hóa bằng TLS → an toàn hơn.

---

## 🛡️ **OWASP Top 10**

6. **SQL Injection**

   * Xảy ra khi input chèn thẳng vào query mà không escape (vd: `SELECT * FROM users WHERE id = ' "1 OR 1=1" '` ).
   * Phòng chống: dùng *prepared statement*, ORM, input validation.

7. **XSS (Cross-Site Scripting)**

   * Attacker chèn script độc hại để chạy trong trình duyệt victim.
   * VD: `<script>alert('XSS')</script>`.

8. **Stored vs Reflected XSS**

   * Stored: script lưu trong DB, ai truy cập cũng bị (nguy hiểm hơn).
   * Reflected: script chỉ xuất hiện khi click link chứa payload.

9. **CSP (Content Security Policy)**

   * HTTP header giúp giới hạn nguồn script (chỉ cho phép từ domain an toàn).
   * Giảm nguy cơ XSS.

10. **Clickjacking**

* Attacker nhúng web bạn vào iframe trong web xấu → user click nhầm (vd: click "Like" FB).
* Phòng chống: header `X-Frame-Options: DENY` hoặc `SAMEORIGIN`.

---

## 📜 **HTTP & Headers**

11. **SameSite cookie**

* Ngăn cookie gửi trong cross-site request.
* `Strict`: chỉ gửi khi cùng site.
* `Lax`: cho phép trong GET link.
* `None`: gửi mọi lúc (cần `Secure`).

12. **X-Frame-Options**

* Ngăn website bị load trong iframe → chặn clickjacking.

13. **HttpOnly vs Secure cookie**

* **HttpOnly**: JS không đọc được cookie → chống XSS đánh cắp.
* **Secure**: cookie chỉ gửi qua HTTPS → chống MITM.

14. **CORS (Cross-Origin Resource Sharing)**

* Dùng khi web front-end gọi API từ domain khác.
* Các mode: `simple request`, `preflight request`, `credentialed request`.

15. **HSTS (HTTP Strict Transport Security)**

* Ép trình duyệt luôn dùng HTTPS.
* Chống downgrade attack (ép người dùng truy cập HTTP).

---

## 🔒 **Mã hóa & Lưu trữ**

16. **Hashing vs Encryption**

* Hashing: 1 chiều, không đảo ngược được (dùng cho password).
* Encryption: 2 chiều, có thể giải mã bằng key (dùng cho dữ liệu cần đọc lại).

17. **bcrypt/Argon2 vs MD5/SHA1**

* MD5/SHA1 nhanh quá → dễ brute force.
* bcrypt/Argon2 chậm + có salt + memory hard → an toàn hơn.

18. **Salt vs Pepper**

* Salt: random string riêng cho mỗi password, lưu kèm DB.
* Pepper: secret key chung, lưu ngoài DB (server secret).

19. **Symmetric vs Asymmetric encryption**

* Symmetric: cùng key để mã hóa/giải mã (AES).
* Asymmetric: dùng cặp public/private key (RSA, ECC).

20. **TLS handshake**

* Client gửi list cipher → server chọn → trao đổi key (Diffie-Hellman/RSA).
* Sau đó dùng key để mã hóa dữ liệu.

---

## 🌐 **Misc**

21. **Rate limiting**

* Ngăn brute force login, DDoS.
* VD: chỉ cho 5 lần login thất bại trong 1 phút.

22. **MITM attack**

* Hacker chặn traffic giữa client-server để nghe lén/chỉnh sửa.
* Phòng chống: HTTPS + cert validation.

23. **SQL Injection vs NoSQL Injection**

* SQLi: tấn công query SQL.
* NoSQLi: khai thác query JSON, MongoDB (vd: `{ "$gt": "" }`).

24. **Input validation ở backend**

* Frontend dễ bypass (chỉnh JS, gọi API trực tiếp).
* Backend mới là chốt chặn cuối cùng.

25. **Subdomain takeover**

* Subdomain trỏ đến dịch vụ (vd: Azure, AWS S3) nhưng resource bị xóa.
* Attacker chiếm dịch vụ đó → upload nội dung độc hại.
