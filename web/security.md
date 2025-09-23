Ok, tôi hiểu rồi. Bạn muốn tôi giữ nguyên format giải thích lý thuyết chi tiết cho từng câu hỏi về Web Security. Đây là bản dịch và giải thích đầy đủ các câu trả lời mà bạn đã cung cấp, được sắp xếp và định dạng rõ ràng để bạn dễ dàng ôn tập.

---

### 🔑 Authentication & Authorization

* **Sự khác nhau giữa Authentication và Authorization là gì?**
    * **Authentication (Xác thực)** là quá trình xác minh danh tính của người dùng. Ví dụ: khi bạn nhập tên người dùng và mật khẩu để đăng nhập.
    * **Authorization (Ủy quyền)** là quá trình xác định quyền truy cập của người dùng đã được xác thực. Ví dụ: một người dùng thông thường có thể chỉ được xem dữ liệu, trong khi một admin có thể xem, chỉnh sửa và xóa dữ liệu.
* **CSRF token được dùng để chống lại loại tấn công nào?**
    * CSRF token được dùng để chống lại tấn công **CSRF (Cross-Site Request Forgery)**. 
    * Tấn công CSRF xảy ra khi kẻ tấn công lừa người dùng đã đăng nhập thực hiện một hành động mà họ không hề biết. CSRF token là một chuỗi ký tự ngẫu nhiên, duy nhất cho mỗi phiên làm việc, được nhúng vào các form hoặc request. Kẻ tấn công không thể đoán được token này, do đó request giả mạo sẽ bị server từ chối.
* **Tại sao không nên lưu password dạng plain text trong database?**
    * Nếu cơ sở dữ liệu bị xâm nhập, tất cả mật khẩu sẽ bị lộ. Điều này không chỉ gây nguy hiểm cho tài khoản đó mà còn cho các tài khoản khác của người dùng nếu họ sử dụng cùng một mật khẩu ở nhiều nơi.
    * Thay vào đó, bạn phải luôn **hash** và **salt** mật khẩu trước khi lưu trữ.
* **JWT khác gì với Session-based authentication?**
    * **Session-based authentication:** Server tạo một session ID duy nhất sau khi người dùng đăng nhập và lưu ID này trong cơ sở dữ liệu hoặc bộ nhớ cache. Cookie của trình duyệt chỉ chứa session ID đó. Server phải kiểm tra session ID này cho mỗi request.
    * **JWT (JSON Web Token):** Server không lưu trữ trạng thái. Sau khi người dùng đăng nhập, server tạo một token đã được ký (signed) có chứa thông tin người dùng. Token này được gửi về client và client sẽ gửi token này trong mỗi request. Server chỉ cần xác minh chữ ký của token để đảm bảo tính toàn vẹn của dữ liệu.
    * **Ưu điểm của JWT:** stateless, tiện lợi cho các hệ thống phân tán (microservices).
    * **Nhược điểm của JWT:** khó thu hồi ngay lập tức nếu token bị lộ.
* **Vì sao cần dùng HTTPS thay vì HTTP?**
    * **HTTP** truyền dữ liệu dưới dạng văn bản thuần (plain text), dễ bị tấn công **MITM (Man-in-the-Middle)**. Kẻ tấn công có thể đọc hoặc sửa đổi dữ liệu đang truyền đi.
    * **HTTPS** sử dụng giao thức **TLS (Transport Layer Security)** để mã hóa dữ liệu, đảm bảo rằng dữ liệu chỉ có thể được đọc bởi người gửi và người nhận hợp lệ. 

---

### 🛡️ OWASP Top 10

* **SQL Injection có thể xảy ra khi nào? Cách phòng chống?**
    * SQL Injection xảy ra khi dữ liệu đầu vào của người dùng được sử dụng trực tiếp trong một câu truy vấn SQL mà không được lọc hoặc escape đúng cách. Ví dụ: `SELECT * FROM users WHERE username = ' "admin' OR '1'='1" '`.
    * **Phòng chống:** Sử dụng **Prepared Statements**, ORM (Object-Relational Mapping), hoặc sanitization (lọc) input.
* **XSS (Cross-Site Scripting) là gì? Có mấy loại?**
    * XSS là một kiểu tấn công mà kẻ tấn công chèn script độc hại (ví dụ: `<script>alert('XSS')</script>`) vào một trang web để chạy trong trình duyệt của người dùng khác.
    * Có ba loại chính:
        * **Stored XSS (Persistent XSS):** Script độc hại được lưu trữ trên server (ví dụ: trong cơ sở dữ liệu) và được phục vụ cho người dùng mỗi khi họ truy cập trang.
        * **Reflected XSS (Non-Persistent XSS):** Script độc hại được phản ánh lại từ server. Ví dụ: qua một URL chứa payload.
        * **DOM-based XSS:** Script độc hại được thực thi do sự thay đổi của DOM, không liên quan đến server.
* **Khác nhau giữa Stored XSS và Reflected XSS?**
    * **Stored XSS** nguy hiểm hơn vì payload được lưu trữ trên server. Một khi đã bị chèn, nó sẽ tự động ảnh hưởng đến tất cả những ai truy cập trang đó.
    * **Reflected XSS** yêu cầu người dùng phải click vào một link độc hại để kích hoạt payload.
* **Tại sao cần dùng Content Security Policy (CSP)?**
    * CSP là một HTTP header giúp ngăn chặn tấn công XSS. Nó chỉ định các nguồn đáng tin cậy mà trình duyệt được phép tải script, font, hình ảnh, v.v. Nếu một script cố gắng tải từ một nguồn không được cho phép, trình duyệt sẽ chặn nó.
* **Clickjacking là gì và phòng chống như thế nào?**
    * **Clickjacking** là một kiểu tấn công mà kẻ tấn công nhúng trang web của bạn vào một iframe trên một trang web độc hại. Bằng cách làm cho iframe trong suốt (transparent), kẻ tấn công lừa người dùng click vào một nút hoặc link trên trang của họ, trong khi thực ra họ đang click vào một nút trên trang của bạn.
    * **Phòng chống:** Sử dụng header **`X-Frame-Options`** với giá trị `DENY` hoặc `SAMEORIGIN`.

---

### 📜 HTTP & Headers

* **Header SameSite trong Cookie có tác dụng gì?**
    * Header `SameSite` ngăn cookie được gửi cùng với các cross-site request. Điều này giúp chống lại tấn công CSRF.
    * **`Strict`:** Cookie chỉ được gửi khi request đến từ cùng một trang web (cùng domain).
    * **`Lax`:** Cookie được gửi trong các yêu cầu GET link từ một domain khác.
    * **`None`:** Cookie được gửi trong mọi request (cần đi kèm với `Secure`).
* **Header X-Frame-Options để làm gì?**
    * Header `X-Frame-Options` được dùng để ngăn trang web của bạn bị nhúng vào một iframe. Điều này giúp chống lại tấn công Clickjacking.
* **Sự khác biệt giữa HttpOnly cookie và Secure cookie?**
    * **`HttpOnly`:** Ngăn không cho các script phía client (ví dụ: JavaScript) truy cập cookie. Điều này giúp ngăn chặn tấn công XSS đánh cắp cookie.
    * **`Secure`:** Chỉ cho phép cookie được gửi qua các kết nối được mã hóa bằng HTTPS. Điều này giúp chống lại việc cookie bị nghe lén trong tấn công MITM.
* **Khi nào nên dùng CORS? Các mode chính của CORS là gì?**
    * CORS (Cross-Origin Resource Sharing) được dùng khi một trang web front-end đang cố gắng truy cập tài nguyên (ví dụ: API) từ một domain khác. CORS là một cơ chế an toàn cho phép server chỉ định những domain nào được phép truy cập tài nguyên của nó.
    * Các mode chính: `Simple request` (GET, HEAD, POST với một số header nhất định) và `Preflight request` (sử dụng request `OPTIONS` trước để kiểm tra quyền truy cập).
* **Header HSTS (Strict-Transport-Security) giúp chống lại loại tấn công nào?**
    * HSTS là một header HTTP giúp chống lại tấn công **downgrade attack**. Nó yêu cầu trình duyệt chỉ truy cập trang web bằng HTTPS, ngay cả khi người dùng gõ `http://`. Điều này ngăn kẻ tấn công ép trình duyệt kết nối không an toàn.

---

### 🔒 Mã hóa & Lưu trữ

* **Sự khác nhau giữa hashing và encryption?**
    * **Hashing** là một quá trình một chiều. Bạn không thể đảo ngược một hash để lấy lại dữ liệu gốc. Hashing được dùng để xác minh tính toàn vẹn của dữ liệu, đặc biệt là mật khẩu.
    * **Encryption** là một quá trình hai chiều. Bạn có thể giải mã dữ liệu đã mã hóa bằng một key. Encryption được dùng để bảo vệ dữ liệu nhạy cảm khi cần đọc lại.
* **Tại sao nên dùng thuật toán bcrypt / Argon2 thay vì MD5 / SHA1 để lưu mật khẩu?**
    * Các thuật toán cũ như MD5 và SHA1 rất nhanh, khiến chúng dễ bị tấn công brute-force và rainbow table.
    * **Bcrypt** và **Argon2** được thiết kế để chậm. Chúng sử dụng **salt** và yêu cầu nhiều tài nguyên tính toán (thời gian và bộ nhớ), làm cho việc tấn công trở nên cực kỳ khó khăn.
* **Salt và Pepper trong lưu mật khẩu là gì?**
    * **Salt:** Một chuỗi ký tự ngẫu nhiên, duy nhất cho mỗi mật khẩu. Salt được thêm vào mật khẩu trước khi hashing để đảm bảo rằng hai người dùng có cùng mật khẩu sẽ tạo ra các hash khác nhau. Salt được lưu trữ cùng với hash trong cơ sở dữ liệu.
    * **Pepper:** Một secret key (khóa bí mật) chung cho toàn bộ ứng dụng. Pepper được thêm vào mật khẩu trước khi hashing và được lưu trữ **riêng biệt** với cơ sở dữ liệu mật khẩu, thường trong một biến môi trường.
* **Symmetric encryption và Asymmetric encryption khác nhau thế nào?**
    * **Symmetric encryption (Mã hóa đối xứng):** Cả hai bên sử dụng cùng một key để mã hóa và giải mã. Nó rất nhanh, nhưng việc chia sẻ key an toàn là một thách thức. Ví dụ: AES.
    * **Asymmetric encryption (Mã hóa bất đối xứng):** Sử dụng một cặp key (private key và public key). Dữ liệu được mã hóa bằng public key chỉ có thể được giải mã bằng private key tương ứng. Mặc dù chậm hơn, nhưng nó giải quyết được vấn đề chia sẻ key an toàn. Ví dụ: RSA.
* **TLS handshake hoạt động ra sao?**
    * Đây là quá trình thiết lập một kết nối HTTPS an toàn.
    * Client và server trao đổi thông tin về các thuật toán mã hóa được hỗ trợ.
    * Sau đó, họ sử dụng thuật toán mã hóa bất đối xứng (ví dụ: Diffie-Hellman) để trao đổi một key bí mật tạm thời (session key).
    * Sau khi session key được thiết lập an toàn, tất cả dữ liệu còn lại sẽ được mã hóa và giải mã bằng thuật toán mã hóa đối xứng, nhanh hơn.

---

### 🌐 Misc (Tổng hợp)

* **Khi nào cần Rate limiting và tại sao quan trọng?**
    * **Rate limiting** là kỹ thuật hạn chế số lượng request mà một người dùng có thể thực hiện trong một khoảng thời gian nhất định.
    * Nó quan trọng để ngăn chặn các cuộc tấn công như **DDoS (Distributed Denial-of-Service)**, brute-force login, hoặc spam.
* **Man-in-the-Middle (MITM) attack là gì? Cách phòng tránh?**
    * **MITM** là một kiểu tấn công mà kẻ tấn công bí mật chặn và có thể sửa đổi giao tiếp giữa hai bên.
    * **Phòng tránh:** Sử dụng **HTTPS** để mã hóa dữ liệu.
* **Sự khác nhau giữa SQL Injection và NoSQL Injection?**
    * **SQL Injection** nhắm vào các truy vấn SQL.
    * **NoSQL Injection** nhắm vào các database không phải SQL (như MongoDB) bằng cách chèn các toán tử hoặc cú pháp độc hại vào dữ liệu đầu vào.
* **Tại sao cần kiểm tra input validation ở backend thay vì chỉ frontend?**
    * Validation ở frontend chỉ mang tính chất tiện lợi cho người dùng (ví dụ: hiển thị lỗi ngay lập tức).
    * Tuy nhiên, kẻ tấn công có thể dễ dàng bỏ qua validation ở frontend bằng cách gửi request trực tiếp đến server (ví dụ: dùng Postman). **Backend là tuyến phòng thủ cuối cùng và quan trọng nhất.**
* **Subdomain takeover là gì?**
    * Đây là một kiểu tấn công khi kẻ tấn công chiếm quyền kiểm soát một subdomain của bạn (ví dụ: `blog.yourcompany.com`) mà đáng lẽ phải trỏ đến một dịch vụ bên thứ ba (như Heroku, GitHub Pages).
    * Nếu bạn xóa tài khoản trên dịch vụ bên thứ ba nhưng không xóa bản ghi DNS, kẻ tấn công có thể tạo tài khoản mới trên dịch vụ đó và chiếm quyền kiểm soát subdomain của bạn.