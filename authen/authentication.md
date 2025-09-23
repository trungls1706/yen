Đoạn văn bản bạn cung cấp đã trình bày chi tiết về **Authentication** (Xác thực) và **Authorization** (Ủy quyền), cũng như đi sâu vào một phương pháp xác thực cổ điển: **Basic Authentication**. Dưới đây là tóm tắt các điểm chính:

## Authentication vs Authorization

- **Authentication (Xác thực)**: Là quá trình xác nhận danh tính của người dùng. Nó giúp bạn trả lời câu hỏi "Bạn là ai?". Ví dụ, khi bạn đăng nhập vào một ứng dụng bằng tên người dùng và mật khẩu, đó là Authentication.
- **Authorization (Ủy quyền)**: Là quá trình xác định quyền truy cập của người dùng đối với các tài nguyên cụ thể sau khi đã xác thực. Nó giúp bạn trả lời câu hỏi "Bạn được phép làm gì?". Ví dụ, người dùng A chỉ có quyền xem bài viết của họ, trong khi người dùng B có quyền chỉnh sửa tất cả bài viết. **Authorization là một cấp độ cao hơn của Authentication.**

---

## Luồng hoạt động của Authentication

Hầu hết các phương pháp xác thực đều tuân theo một luồng cơ bản gồm 4 bước:

1.  **Gửi thông tin định danh**: Client (trình duyệt/ứng dụng) gửi thông tin xác thực (username/password, token,...) đến server.
2.  **Kiểm tra và phản hồi**: Server kiểm tra thông tin. Nếu hợp lệ, server trả về một "dấu hiệu" cho biết đăng nhập thành công.
3.  **Lưu trữ và gửi lại**: Client lưu "dấu hiệu" này và gửi nó lên server trong các yêu cầu tiếp theo để truy cập tài nguyên.
4.  **Truy cập tài nguyên**: Server kiểm tra "dấu hiệu" và cung cấp tài nguyên nếu nó hợp lệ.

---

## Basic Authentication

**Basic Authentication** là một phương pháp xác thực đơn giản và lâu đời.

-   **Cách thức hoạt động**:
    1.  Khi truy cập một trang web được bảo vệ, server yêu cầu xác thực bằng cách trả về header `WWW-Authenticate`.
    2.  Trình duyệt tự động hiển thị một cửa sổ pop-up yêu cầu người dùng nhập tên người dùng và mật khẩu.
    3.  Trình duyệt mã hóa (encode) chuỗi `username:password` bằng **Base64** và gửi lên server qua header `Authorization`.
    4.  Server giải mã chuỗi này để xác thực người dùng.

-   **Ứng dụng**: Thường được sử dụng cho các môi trường nội bộ, như trang quản trị `/admin` hoặc môi trường phát triển (staging), nơi bạn cần một lớp bảo mật đơn giản mà không cần phải phát triển hệ thống đăng nhập phức tạp.

-   **Ưu và nhược điểm**:
    -   **Ưu điểm**:
        -   ✅ Đơn giản, dễ hiểu và dễ triển khai, không cần can thiệp sâu vào code backend.
    -   **Nhược điểm**:
        -   ❌ **Không an toàn**: Chuỗi Base64 không phải là mã hóa mạnh, dễ bị giải mã. Cần phải sử dụng HTTPS để bảo vệ thông tin.
        -   ❌ **Thiếu linh hoạt**: Không hỗ trợ quản lý quyền truy cập phức tạp hay các cơ chế đăng xuất chi tiết.
        -   ❌ **Không thể logout**: Chỉ có thể "đăng xuất" bằng cách đóng hoàn toàn trình duyệt.
        -   ❌ **Không phù hợp cho ứng dụng mobile**: Do thiếu giao diện pop-up tích hợp.