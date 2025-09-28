Tốt, chúng ta sẽ ôn tập chuyên sâu về **WebSockets**, công nghệ cốt lõi cho giao tiếp thời gian thực (real-time communication) trên web.

### WebSockets là gì?

WebSockets là một giao thức giao tiếp tiên tiến cung cấp kênh giao tiếp **hai chiều (bi-directional)** và **toàn phần (full-duplex)** trên một kết nối TCP duy nhất.

Nói một cách đơn giản, WebSockets mở một "ống dẫn" cố định giữa trình duyệt (client) và máy chủ (server). Một khi kết nối được thiết lập, cả hai bên có thể gửi dữ liệu cho nhau bất cứ lúc nào mà không cần phải request lặp đi lặp lại.

-----

### 1\. Sự khác biệt cốt lõi (vs. HTTP)

WebSockets giải quyết các hạn chế về hiệu suất của mô hình HTTP truyền thống:

| Tiêu chí | HTTP (Polling/Long Polling) | WebSockets |
| :--- | :--- | :--- |
| **Mô hình** | **Request-Response** (Client hỏi, Server trả lời) | **Event-Driven** (Cả hai bên có thể gửi dữ liệu bất cứ lúc nào) |
| **Kết nối** | **Mở và đóng** cho mỗi request. | **Mở cố định** (Persistent) sau lần handshake đầu tiên. |
| **Overhead** | **Cao.** Mỗi request/response đều có header HTTP đầy đủ. | **Thấp.** Sau khi thiết lập, chỉ gửi frame dữ liệu nhỏ. |
| **Độ trễ** | **Cao.** Dữ liệu bị trễ do phải chờ client gửi request mới. | **Rất thấp.** Dữ liệu được gửi ngay lập tức khi có sự kiện. |

-----

### 2\. Cách thức hoạt động: WebSocket Handshake

Việc thiết lập kết nối WebSocket bắt đầu bằng một **HTTP Handshake** tiêu chuẩn:

1.  **Client gửi yêu cầu nâng cấp (Upgrade Request):** Client gửi một request HTTP thông thường tới server với các header đặc biệt:
    ```http
    GET /chat HTTP/1.1
    Host: server.example.com
    Connection: Upgrade
    Upgrade: websocket
    Sec-WebSocket-Key: [random_base64_key] 
    ```
2.  **Server trả lời chấp nhận:** Nếu server hỗ trợ giao thức này, nó sẽ trả về response với code `101 Switching Protocols`:
    ```http
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: [key_computed_from_client_key]
    ```
3.  **Kết nối thiết lập:** Sau khi handshake thành công, kết nối TCP được chuyển sang giao thức WebSocket, và quá trình giao tiếp dữ liệu thời gian thực bắt đầu.

-----

### 3\. Trường hợp sử dụng lý tưởng

WebSockets là lựa chọn tốt nhất cho các ứng dụng đòi hỏi sự tương tác tức thời:

  * **Chat/Messaging:** Gửi và nhận tin nhắn ngay lập tức.
  * **Live Notifications:** Thông báo được đẩy đến người dùng ngay lập tức (ví dụ: thông báo có người thích bài viết của bạn).
  * **Financial Tickers:** Cập nhật giá cổ phiếu, tiền điện tử theo thời gian thực.
  * **Multiplayer Games:** Đồng bộ hóa trạng thái trò chơi giữa nhiều người chơi.
  * **Collaborative Tools:** Biên tập tài liệu đồng thời (ví dụ: Google Docs).

-----

### 4\. Best Practices (Thực tiễn tốt nhất)

1.  **Sử dụng Heartbeats:** Gửi các "ping" định kỳ để đảm bảo rằng kết nối vẫn còn hoạt động và không bị ngắt quãng bởi các proxy hoặc load balancer.
2.  **Xử lý lại kết nối (Reconnection Logic):** Kết nối WebSocket có thể bị mất do mạng. Code của client **phải** có logic để tự động thử kết nối lại theo chiến lược backoff (ví dụ: thử lại sau 1s, rồi 2s, 4s...).
3.  **Tải trọng dữ liệu nhỏ gọn:** WebSockets gửi "frames" dữ liệu. Hãy sử dụng JSON hoặc các định dạng nhị phân như Protocol Buffers để giữ cho kích thước payload nhỏ nhất có thể.
4.  **Sử dụng Subprotocols:** Đối với các ứng dụng phức tạp, hãy xác định các subprotocol (ví dụ: STOMP, MQTT) trong quá trình handshake để cấu trúc dữ liệu và xử lý message tốt hơn.
5.  **Bảo mật:** Luôn sử dụng **WSS (WebSocket Secure)** (tương đương với HTTPS) để mã hóa dữ liệu. Xác thực người dùng (Authentication) và Ủy quyền (Authorization) phải được xử lý ngay sau khi kết nối được thiết lập.