Dưới đây là bảng so sánh chi tiết giữa **Local Storage**, **Session Storage**, và **Cookies** trong việc lưu trữ dữ liệu trên trình duyệt.

***

### Khái niệm cơ bản

* **Cookies**: Tệp văn bản nhỏ được trang web tạo ra và lưu trữ trên máy tính của người dùng. Cookie có thể chứa thông tin về người dùng, phiên đăng nhập, hoặc tùy chọn cá nhân.
* **Local Storage**: Một API lưu trữ dữ liệu phía client, cho phép các trang web lưu trữ dữ liệu vĩnh viễn (cho đến khi bị xóa thủ công) ngay trên trình duyệt của người dùng.
* **Session Storage**: Tương tự Local Storage, nhưng dữ liệu chỉ tồn tại trong suốt phiên làm việc của trình duyệt. Khi tab hoặc cửa sổ trình duyệt được đóng, dữ liệu sẽ bị xóa.

***

### Bảng so sánh

| Tiêu chí | Local Storage | Session Storage | Cookies |
| :--- | :--- | :--- | :--- |
| **Thời gian tồn tại** | Vĩnh viễn (cho đến khi bị xóa thủ công) | Tồn tại trong suốt phiên làm việc (khi đóng tab/cửa sổ thì mất) | Có thể cài đặt thời gian tồn tại cụ thể hoặc tồn tại trong suốt phiên làm việc |
| **Dung lượng lưu trữ** | Lớn (thường khoảng 5-10MB) | Lớn (thường khoảng 5-10MB) | Rất nhỏ (khoảng 4KB) |
| **Truy cập** | **Được truy cập từ JavaScript** | **Được truy cập từ JavaScript** | Có thể truy cập từ JavaScript (nếu không set `httpOnly`) hoặc được gửi tự động trong HTTP header |
| **Phạm vi** | Dữ liệu được chia sẻ giữa các tab/cửa sổ cùng một domain | Dữ liệu chỉ tồn tại trong tab/cửa sổ hiện tại | Dữ liệu được chia sẻ giữa các tab/cửa sổ cùng một domain và đường dẫn |
| **Gửi đến Server** | **Không tự động gửi** kèm theo HTTP request | **Không tự động gửi** kèm theo HTTP request | **Tự động gửi** kèm theo mọi HTTP request đến server (nếu cùng domain) |
| **Bảo mật** | **Dễ bị tấn công XSS** (nếu không có biện pháp phòng ngừa) | **Dễ bị tấn công XSS** (nếu không có biện pháp phòng ngừa) | An toàn hơn với XSS (nếu set `httpOnly`) nhưng **dễ bị tấn công CSRF** |

***

### Khi nào nên sử dụng?

* **Cookies**:
    * Thường được dùng để lưu trữ thông tin phiên đăng nhập, cá nhân hóa trang web, hoặc theo dõi người dùng.
    * Nên sử dụng khi cần server truy cập dữ liệu một cách tự động với mỗi request.
* **Local Storage**:
    * Lý tưởng để lưu trữ dữ liệu lớn hơn và không nhạy cảm, như tùy chọn giao diện (chế độ tối/sáng), thông tin giỏ hàng, hoặc cache cục bộ.
    * Phù hợp khi cần dữ liệu tồn tại vĩnh viễn giữa các lần truy cập.
* **Session Storage**:
    * Thích hợp để lưu trữ dữ liệu tạm thời, ví dụ như thông tin biểu mẫu chưa hoàn thành, hoặc dữ liệu cần dùng trong suốt một phiên làm việc duy nhất.
    * Đảm bảo dữ liệu sẽ được xóa sạch khi người dùng đóng tab, giúp bảo vệ quyền riêng tư.