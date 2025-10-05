Bạn đang muốn mô tả quy trình xác thực (authentication) và quản lý phiên (session management) theo mô hình được thể hiện trong sơ đồ luồng. Đây là mô tả chi tiết của mô hình **Xác thực dựa trên Phiên (Session-based Authentication)**.

---

## Mô tả Mô hình Xác thực dựa trên Phiên (Session-based Authentication)

Mô hình này mô tả cách một hệ thống duy trì trạng thái đăng nhập của người dùng thông qua việc sử dụng **Session ID** được lưu trữ ở cả phía server và client (dưới dạng cookie).

### 1. Quá trình Đăng nhập (Authentication)

Quá trình bắt đầu khi người dùng muốn xác thực danh tính:

| Bước | Hành động | Vai trò | Chi tiết |
| :--- | :--- | :--- | :--- |
| **(1) Login** | Client gửi thông tin đăng nhập (Username/Password) đến Server. | Client $\rightarrow$ Server | Gửi thông tin qua API Request (thường là POST). |
| **(2) Login** | Server chuyển tiếp thông tin đăng nhập đến Database để kiểm tra. | Server $\rightarrow$ Database | Kiểm tra tính hợp lệ của cặp Username/Password. |
| **(3) Return Data** | Database trả về xác nhận đăng nhập hợp lệ (ví dụ: thông tin User ID) cho Server. | Database $\rightarrow$ Server | |
| **(4) Store Session** | Server tạo một **Session ID** duy nhất, liên kết nó với thông tin người dùng, và lưu trữ cặp (Session ID, User Data) này trong kho lưu trữ Session (ví dụ: Redis). | Server $\rightarrow$ Session Store | Server tạo ra trạng thái (state) cho phiên làm việc. |
| **(5) Return Session ID** | Server trả lại Session ID vừa tạo cho chính nó. | Server $\rightarrow$ Server | Hoàn tất việc tạo session. |
| **(6) Session ID Response** | Server gửi Session ID về Client. | Server $\rightarrow$ Client | Thông báo đăng nhập thành công. |
| **(7) Cookie Request** | Client sử dụng Session ID nhận được để thực hiện request đầu tiên (thường là thông qua Cookie). | Client $\rightarrow$ Server | Client yêu cầu Server thiết lập cookie chứa Session ID. |

### 2. Quá trình Duy trì Phiên (Session Management)

Sau khi đăng nhập thành công, hệ thống duy trì phiên làm việc cho các request tiếp theo:

| Bước | Hành động | Vai trò | Chi tiết |
| :--- | :--- | :--- | :--- |
| **(7) Cookie Request (Ongoing)** | Trong mọi request tiếp theo, Client tự động gửi **Cookie** chứa Session ID đến Server. | Client $\rightarrow$ Server | Cookie là cách phổ biến nhất để Client lưu và tự động đính kèm Session ID vào các request. |
| **(8) Check by Session ID** | Server sử dụng Session ID từ Cookie để tra cứu thông tin phiên làm việc trong kho lưu trữ Session (Redis). | Server $\rightarrow$ Session Store | Xác minh Session ID có hợp lệ và còn thời hạn không. |
| **(9) Return Session** | Kho lưu trữ Session trả về dữ liệu người dùng tương ứng (ví dụ: User ID, quyền hạn) cho Server. | Session Store $\rightarrow$ Server | Server sử dụng thông tin này để ủy quyền (Authorization) cho request hiện tại. |

**Tóm lại:**

Mô hình này là **Stateful** (có trạng thái) vì Server **phải lưu trữ** trạng thái của mỗi phiên làm việc trong một cơ sở dữ liệu (Database hoặc Redis) để hoạt động. Client chỉ giữ một định danh duy nhất (Session ID) trong Cookie.

* **Ưu điểm:** Dễ dàng thu hồi phiên (logout) ngay lập tức bằng cách xóa Session ID khỏi kho lưu trữ Session.
* **Nhược điểm:** Đòi hỏi tài nguyên server để lưu trữ và quản lý trạng thái của tất cả các phiên.