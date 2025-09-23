JSON Web Token (JWT) là một chuẩn mở để truyền tải thông tin một cách an toàn giữa các bên dưới dạng đối tượng JSON. JWT có kích thước nhỏ, cho phép nó dễ dàng được gửi qua URL, POST parameter hoặc HTTP Header.

Tất cả các JWT đều là token, nhưng không phải tất cả các token đều là JWT. Token nói chung là một chuỗi ký tự đại diện cho một đối tượng hoặc quyền truy cập.

---

## 🔑 Cấu trúc JWT

Một chuỗi JWT được mã hóa hoàn chỉnh có cấu trúc gồm ba phần, được phân tách bằng dấu chấm:

* **Header**: Chứa thông tin về loại token (JWT) và thuật toán mã hóa (ví dụ: HMAC SHA256). Header được mã hóa dưới dạng chuỗi Base64Url.
* **Payload**: Chứa các thông tin người dùng định nghĩa, hay còn gọi là các "claims." Payload cũng được mã hóa dưới dạng chuỗi Base64Url.
* **Signature**: Được tạo ra bằng cách kết hợp Header, Payload và một **secret key** chỉ có máy chủ biết. Signature đảm bảo tính toàn vẹn và bảo mật của dữ liệu, ngăn chặn việc làm giả token.



---

## 🔒 Xác thực người dùng với Access Token

**Access Token** là một loại token dùng để xác thực quyền truy cập của người dùng vào các tài nguyên được bảo vệ. Thông thường, Access Token được tạo dưới dạng JWT.

### Quy trình xác thực

1.  Client gửi yêu cầu đăng nhập với username và password.
2.  Server xác minh thông tin và tạo một **Access Token (dạng JWT)** có chứa thông tin người dùng (ví dụ: `user_id`). Token này được ký bằng một secret key mà server giữ bí mật.
3.  Server gửi Access Token về cho client. Server **không lưu trữ** token này.
4.  Client lưu Access Token trên thiết bị (ví dụ: cookie, local storage).
5.  Đối với các yêu cầu tiếp theo, client gửi kèm Access Token trong header của request.
6.  Server nhận token, dùng secret key để xác minh tính hợp lệ của nó. Nếu hợp lệ, server cho phép truy cập tài nguyên.

---

## ⚡ Vấn đề và giải pháp với Access Token

Sử dụng Access Token giúp server trở nên **stateless** (không lưu trạng thái người dùng), tiết kiệm bộ nhớ và tăng tốc độ xử lý.

Tuy nhiên, nó có một số nhược điểm:
* Không thể thu hồi ngay lập tức một Access Token đã cấp, ngay cả khi nó bị lộ.
* Để giảm rủi ro, Access Token thường có thời gian hết hạn ngắn, điều này có thể gây bất tiện cho người dùng vì phải đăng nhập lại thường xuyên.

### Giải pháp: Sử dụng thêm Refresh Token

Để khắc phục nhược điểm trên, người ta thường dùng thêm **Refresh Token**.

* **Refresh Token** là một loại token khác, được tạo ra cùng lúc với Access Token.
* Nó có thời gian hiệu lực dài hơn nhiều so với Access Token (ví dụ: 1 tuần, 1 tháng).
* Refresh Token được **lưu trữ trên database** của server.

#### Quy trình xác thực kết hợp Access Token và Refresh Token

1.  Client đăng nhập thành công, server tạo ra cả Access Token (thời gian ngắn) và Refresh Token (thời gian dài).
2.  Server lưu Refresh Token vào database và gửi cả hai token về cho client.
3.  Client lưu cả hai token. Mọi yêu cầu truy cập tài nguyên đều sử dụng Access Token.
4.  Khi Access Token hết hạn, client gửi Refresh Token lên server để yêu cầu một cặp token mới.
5.  Server kiểm tra Refresh Token trong database. Nếu hợp lệ, server sẽ:
    * **Xóa Refresh Token cũ** trong database.
    * **Tạo ra một Refresh Token mới** (với ngày hết hạn không đổi).
    * **Tạo một Access Token mới**.
6.  Server gửi cặp token mới về cho client. Client lưu trữ cặp token mới này và sử dụng Access Token mới để tiếp tục truy cập tài nguyên mà không cần đăng nhập lại.

Việc lưu trữ Refresh Token vào database làm cho hệ thống không còn hoàn toàn **stateless** (không lưu trạng thái) nữa, nhưng nó tăng cường đáng kể tính bảo mật, cho phép server chủ động thu hồi token khi cần.

---

## ❓ Câu hỏi thường gặp về JWT

### Tại sao lại tạo một Refresh Token mới sau mỗi lần làm mới?

Đây gọi là **refresh token rotation**. Nếu Refresh Token bị lộ, việc tạo mới sau mỗi lần sử dụng sẽ làm giảm khả năng hacker dùng nó để lấy Access Token mới.

### Làm thế nào để thu hồi (revoke) một Access Token?

Vì Access Token được thiết kế để **stateless**, không có cách nào để thu hồi nó ngay lập tức. Giải pháp thường được áp dụng là thu hồi Refresh Token trong database. Access Token đã bị lộ sẽ không thể làm mới sau khi hết hạn.

### Có khi nào hai JWT trùng nhau không?

Có thể. Nếu hai JWT được tạo ra trong cùng một giây (vì trường `iat` - issued at - được tính bằng giây) và có cùng Payload và Secret Key, chúng sẽ giống hệt nhau.

### Nên lưu Access Token và Refresh Token ở đâu trên client?

Trên trình duyệt, có thể lưu ở **cookie** hoặc **local storage**. Cookie thường được xem là an toàn hơn một chút. Trên các ứng dụng di động, token được lưu trữ trong bộ nhớ của thiết bị.

### Gửi Access Token lên server như thế nào?

Client thường gửi Access Token trong HTTP Header, với key là `Authorization` và giá trị theo định dạng `Bearer <access_token>`.

### Tại sao cần thêm "Bearer" trước Access Token?

Tiền tố `Bearer` xác định loại xác thực là "Bearer Authentication," có nghĩa là "người mang" token này được coi là có quyền truy cập. Nó giúp server dễ dàng phân biệt với các phương thức xác thực khác và tuân thủ các chuẩn mực chung.


=======================

Dưới đây là tóm tắt nội dung về Access Token, Refresh Token và các phương pháp lưu trữ chúng trên client.

---

### Tổng quan về Access Token và Refresh Token

* **Access Token**: Một token có thời gian sống ngắn, dùng để xác thực các yêu cầu từ client đến server. Nó được gửi kèm trong các HTTP request.
* **Refresh Token**: Một token có thời gian sống dài hơn, dùng để tạo ra một Access Token mới khi Access Token cũ hết hạn.

---

### Nơi lưu trữ Access Token trên Client

Có nhiều cách để lưu trữ Access Token, mỗi cách đều có ưu và nhược điểm riêng.

#### Lưu trữ ở Local Storage

* **Ưu điểm**:
    * **Tiện lợi và nhanh chóng**: Dễ dàng truy cập từ JavaScript, không phụ thuộc vào backend để lưu trữ.
    * **Dung lượng lớn**: Thường trên 5MB.
    * **Linh hoạt**: Có thể tự quyết định request nào cần gửi token.
    * **An toàn hơn với CSRF**: Không tự động gửi lên server, tránh bị tấn công CSRF.
* **Nhược điểm**:
    * **Dễ bị tấn công XSS**: Nếu trang web bị tấn công XSS, kẻ tấn công có thể dễ dàng lấy được Access Token.

---

#### Lưu trữ ở Cookie

* **Ưu điểm**:
    * **An toàn hơn với XSS**: Nếu set thuộc tính `httpOnly`, JavaScript không thể truy cập được, giúp chống lại việc lấy token thông qua XSS.
* **Nhược điểm**:
    * **Dễ bị tấn công CSRF**: Mặc dù có thể giảm thiểu bằng cách thêm các thuộc tính như `sameSite`, `secure`, `domain`, `path`.
    * **Không thể đọc payload**: JavaScript không thể truy cập cookie có `httpOnly`, khiến client không đọc được các thông tin trong payload của JWT.
    * **Dung lượng nhỏ**: Chỉ khoảng 4KB.
    * **Phức tạp hơn cho backend**: Backend phải xử lý thêm logic để lấy token từ cookie (với trình duyệt) hoặc từ header (với ứng dụng di động).

---

### Giải pháp kết hợp

Để tận dụng ưu điểm của cả hai, có thể kết hợp Local Storage và Cookie:

* **Lưu Header và Payload ở Local Storage**: Cho phép client đọc các thông tin cần thiết như thời gian hết hạn.
* **Lưu Signature ở Cookie**: Tận dụng tính an toàn của Cookie (với `httpOnly`) để bảo vệ phần quan trọng nhất của token.

Khi gửi yêu cầu, client sẽ ghép hai phần này lại và gửi lên server để xác thực.

---

### Quan điểm chung

* **XSS là "game over"**: Bất kể bạn lưu token ở đâu, nếu trang web bị tấn công XSS, kẻ tấn công có thể làm được nhiều việc nghiêm trọng hơn là chỉ lấy token. Do đó, việc chống XSS là ưu tiên hàng đầu.
* **Local Storage hay Cookie đều ổn**: Không có phương pháp nào là hoàn hảo. Việc "anti" Local Storage một cách cực đoan là không cần thiết. Local Storage vẫn rất tiện lợi cho cả frontend và backend, và nếu ứng dụng được bảo mật tốt, nó hoàn toàn an toàn.
* **Cân nhắc sự tiện lợi và bảo mật**: Luôn cần cân nhắc giữa việc tăng cường bảo mật và mức độ phức tạp mà nó mang lại. Đôi khi, các biện pháp bảo mật quá phức tạp không thực sự cần thiết, tùy thuộc vào yêu cầu cụ thể của dự án.