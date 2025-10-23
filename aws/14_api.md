Tuyệt vời! **Amazon API Gateway** là một dịch vụ cực kỳ quan trọng trong kiến trúc Serverless và Microservices. Dưới đây là tổng hợp các ý chính, chức năng, ứng dụng thực tế và các câu hỏi thường gặp khi đi thi về API Gateway.

---

# AMAZON API GATEWAY: BUILD, DEPLOY, & MANAGE APIS

**API Gateway** đóng vai trò là **"mặt tiền" (front door)** được quản lý hoàn toàn cho các ứng dụng backend của bạn (thường là AWS Lambda, EC2, hoặc các dịch vụ web bên ngoài). Nó giúp bạn dễ dàng tạo, xuất bản, bảo trì, giám sát và bảo mật API cho các ứng dụng.

## 1. Các Ý Chính và Chức năng Cốt Lõi

| Chức năng | Mô tả | Từ khóa & Ghi chú |
| :--- | :--- | :--- |
| **Routing (Định tuyến)** | Nhận request, định tuyến nó đến dịch vụ backend phù hợp (**Integration Backend**). | **REST API, HTTP API, WebSocket API**. |
| **Throttling (Kiểm soát Lưu lượng)** | Bảo vệ các dịch vụ backend khỏi bị quá tải bằng cách giới hạn số lượng request mỗi giây. | **Rate Limit, Burst Limit**. Áp dụng theo từng Key hoặc tài khoản. |
| **Security (Bảo mật)** | Xác thực và ủy quyền người dùng trước khi request chạm đến backend. | **Cognito Authorizer, Lambda Authorizer, IAM**. |
| **Caching (Bộ nhớ đệm)** | Lưu trữ phản hồi (response) của API tại API Gateway để giảm tải cho backend và tăng tốc độ phản hồi. | **Caching Layer**. |
| **Monitoring (Giám sát)** | Tích hợp với CloudWatch để theo dõi request/response, tỷ lệ lỗi và độ trễ. | **CloudWatch Metrics, Logging**. |
| **Transformations (Chuyển đổi)** | Chuyển đổi định dạng dữ liệu (payload) giữa client và backend. | Dùng **VTL (Velocity Template Language)**. |

---

## 2. Các Loại API

| Loại API | Đặc điểm | Trường hợp sử dụng |
| :--- | :--- | :--- |
| **REST API** | Cấu trúc truyền thống, dễ cấu hình, phù hợp cho các API phức tạp hơn, có khả năng **Cache** và **Request/Response Transformation** mạnh mẽ. | Ứng dụng nghiệp vụ (Business Application) hoặc API nội bộ (Internal API). |
| **HTTP API** | Phiên bản nhẹ hơn, chú trọng vào **hiệu suất cao** và **chi phí thấp**. Cấu hình đơn giản hơn REST API. | Serverless Backends, Proxy đơn giản đến EC2/ECS. |
| **WebSocket API** | Duy trì kết nối hai chiều, liên tục giữa client và server (stateful). | Ứng dụng Real-time (Trò chuyện, Bảng điều khiển trực tiếp, Game). |

---

## 3. Các Loại Backend Tích hợp (Integration Backend)

API Gateway có thể tích hợp với nhiều dịch vụ AWS và bên ngoài khác:

1.  **Lambda Function:** Sử dụng **Lambda Proxy Integration** để chuyển nguyên vẹn request đến hàm Lambda và nhận lại response chuẩn. Đây là mô hình phổ biến nhất trong kiến trúc Serverless.
2.  **HTTP Endpoint (EC2/On-premise):** Proxy request đến một dịch vụ web HTTP bên ngoài.
3.  **AWS Services:** Tích hợp trực tiếp với các dịch vụ như **DynamoDB, SQS, SNS** (qua **AWS Service Proxy Integration**).

---

## 4. Ứng dụng Thực tế (Use Cases)

| Use Case | Mục tiêu | Lợi ích của API Gateway |
| :--- | :--- | :--- |
| **Serverless Backend** | Cung cấp một API an toàn và có thể mở rộng cho ứng dụng di động/web. | Xử lý **Auth** (Cognito), **Throttling**, **Routing** đến Lambda. |
| **Tạo Cache cho API** | Giảm tải cho các hàm Lambda/Server backend và tăng tốc độ tải dữ liệu tĩnh. | Sử dụng **Caching** tích hợp của API Gateway. |
| **Đơn giản hóa Truy cập DB** | Cho phép ứng dụng client truy cập DynamoDB một cách gián tiếp và an toàn. | Tích hợp trực tiếp với **DynamoDB** (loại bỏ nhu cầu viết mã proxy bằng Lambda cho các thao tác CRUD đơn giản). |
| **API Versioning** | Triển khai các phiên bản API khác nhau cùng lúc (ví dụ: `/v1`, `/v2`) và dễ dàng chuyển đổi lưu lượng. | Sử dụng **Stages** (các môi trường triển khai) và **Resource Path** khác nhau. |

---

# CÁC CÂU HỎI HAY GẶP KHI ĐI THI/PHỎNG VẤN

1.  **Giải thích sự khác biệt chính giữa REST API và HTTP API.**
    * **HTTP API** thiên về **hiệu suất và chi phí thấp** (thường rẻ hơn và nhanh hơn 60% so với REST API). Nó thiếu một số tính năng nâng cao của REST API như **Caching, API Keys** và **Request/Response Transformation** mạnh mẽ.

2.  **Làm thế nào để bảo mật API Gateway?**
    * Sử dụng **Cognito User Pool Authorizer** (để xác thực người dùng di động/web) hoặc **Lambda Authorizer** (cho logic xác thực tùy chỉnh).

3.  **Bạn gặp lỗi Throttling (lỗi 429 - Too Many Requests). Bạn nên làm gì để giải quyết?**
    * Tăng **Rate Limit** và **Burst Limit** ở cấp độ Stage hoặc ở cấp độ Method. (Hoặc thiết lập một **Usage Plan** mới cho các khách hàng yêu cầu thông lượng cao).

4.  **Khi nào bạn nên sử dụng Caching trong API Gateway?**
    * Khi phản hồi từ backend là **tĩnh (static)** hoặc **thay đổi ít** và bạn cần giảm tải cho backend, đồng thời giảm độ trễ cho client.

5.  **Lambda Proxy Integration là gì và tại sao nó phổ biến?**
    * Là cách đơn giản nhất để kết nối. API Gateway chuyển toàn bộ request (header, body, query string) đến Lambda và Lambda trả về một cấu trúc JSON đơn giản. **Phổ biến vì nó đơn giản hóa việc chuyển đổi dữ liệu và giảm logic phức tạp ở API Gateway.**

Tuyệt vời! Tôi sẽ bổ sung thêm các khía cạnh quan trọng về kiến trúc, bảo mật, và các tính năng nâng cao của **Amazon API Gateway**, đặc biệt tập trung vào các khái niệm như **Endpoint Types, Stages, Variables, Canary Deployment,** và **Caching**.

---

# BỔ SUNG KIẾN THỨC SÂU VỀ API GATEWAY

## I. Kiến trúc và Các Loại Endpoint (Endpoint Types)

API Gateway sử dụng các loại Endpoint khác nhau để tối ưu hóa kết nối và giảm độ trễ tùy thuộc vào vị trí của người dùng và dịch vụ.

### 1. Endpoint Types (Loại Điểm cuối)

| Loại Endpoint | Mô tả | Ứng dụng/Lợi ích |
| :--- | :--- | :--- |
| **Edge-Optimized** | Là loại mặc định. Request được định tuyến thông qua **AWS CloudFront** (CDN) tại các Edge Location. | **Giảm độ trễ** cho các Client phân tán trên toàn thế giới. |
| **Regional** | API chỉ được triển khai trong **một Khu vực (Region)** cụ thể mà bạn triển khai. | Tốt nhất cho các Client và dịch vụ Backend đều nằm trong **cùng một Khu vực AWS**, hoặc khi bạn sử dụng một CDN khác (không phải CloudFront). |
| **Private** | API chỉ có thể được truy cập **bên trong VPC** của bạn thông qua **VPC Endpoint** (sử dụng AWS PrivateLink). | Cực kỳ an toàn. Tuyệt vời cho các **API nội bộ** (Internal API) không bao giờ cần phơi bày ra Internet công cộng. |

## 2. Bảo mật (Security)

API Gateway đóng vai trò là hàng rào bảo vệ đầu tiên cho backend của bạn.

* **Tích hợp Cognito Authorizer:** Sử dụng **Amazon Cognito User Pools** để quản lý danh tính người dùng và cấp **token** (JWT). API Gateway kiểm tra token này trước khi chuyển tiếp request.
* **Lambda Authorizer (Custom Authorizer):** Một hàm **AWS Lambda** tùy chỉnh chạy để xác thực mã thông báo (token) từ request (ví dụ: token Oauth, SAML) và trả về chính sách IAM (IAM Policy) để ủy quyền.
* **Sử dụng IAM:** Sử dụng các **IAM Role/User** để xác thực, phù hợp cho việc truy cập API giữa các dịch vụ AWS với nhau hoặc giữa các tài khoản.
* **API Keys & Usage Plans:** Sử dụng **API Keys** để theo dõi và kiểm soát việc sử dụng API của các đối tác/khách hàng. Kết hợp với **Usage Plans** để thiết lập hạn mức **Throttling** và **Quotas** (hạn mức sử dụng hàng ngày/tháng).

---

## III. Quản lý Triển khai và Phiên bản

### 1. Stages (Giai đoạn Triển khai)

* **Stage** là một tham chiếu logic, có thể quản lý được tới một **phiên bản (Deployment)** cụ thể của API.
* Bạn có thể có nhiều Stages cho cùng một API (ví dụ: `dev`, `test`, ``v1`, `v2`, `prod`).
* Mỗi Stage có **Stage Variables** riêng.

### 2. Stage Variables (Biến Giai đoạn)

* Là các cặp **Key-Value** mà bạn định nghĩa và gắn với một Stage cụ thể.
* Cho phép bạn thay đổi cấu hình mà **không cần triển khai lại API**.
* **Use Case:** Dùng để lưu trữ các giá trị cấu hình như **Tên hàm Lambda** (`MyLambda_dev`, `MyLambda_prod`) hoặc **URL Backend** khác nhau cho mỗi môi trường (Stage).

### 3. Canary Deployment (Triển khai Chim Hoàng Yến)

* Một chiến lược triển khai cho phép bạn gửi một **phần nhỏ** lưu lượng truy cập (ví dụ: 1-5%) đến một phiên bản API **mới (Canary)**, trong khi phần lớn lưu lượng vẫn đi đến phiên bản **ổn định (Production)**.
* **Lợi ích:** Giảm thiểu rủi ro khi triển khai các thay đổi lớn. Nếu phiên bản Canary gây lỗi, bạn có thể dễ dàng chuyển toàn bộ lưu lượng trở lại bản Production.

---

## IV. Caching (Bộ nhớ đệm)

* **Mục đích:** Giảm độ trễ và giảm tải cho Backend.
* Bạn có thể kích hoạt **caching** ở cấp độ Stage.
* Bạn có thể định cấu hình **thời gian sống (Time-To-Live - TTL)** cho các phản hồi trong cache.
* **Cache Invalidation:** Cho phép bạn **xóa thủ công** hoặc **xóa tự động** các mục cache cụ thể nếu dữ liệu trong backend đã thay đổi.

---

## 💡 Câu hỏi Phỏng vấn Thường gặp

1.  **Khi nào nên dùng Endpoint Regional thay vì Edge-Optimized?**
    * Khi tất cả người dùng và backend của bạn đều tập trung trong cùng một Region, hoặc bạn đã có CDN riêng và muốn tự quản lý.

2.  **Bạn muốn thử nghiệm một tính năng mới trên Production với 5% lưu lượng. Bạn dùng tính năng nào của API Gateway?**
    * **Canary Deployment**.

3.  **Bạn có 3 môi trường (Dev, Staging, Prod) và mỗi môi trường gọi đến một hàm Lambda khác nhau. Làm thế nào để quản lý các tên hàm đó mà không cần tạo 3 API Gateway khác nhau?**
    * Sử dụng **Stage Variables** để lưu trữ tên hàm Lambda cho từng Stage, sau đó tham chiếu biến này trong phần Integration Request.

4.  **Sự khác biệt giữa API Key và Authorization (Cognito/Lambda Authorizer) là gì?**
    * **Authorization:** Xác định **người dùng** là ai (Identity) và họ **được phép làm gì** (Authorization).
    * **API Key:** Xác định **ai đang sử dụng** API (Usage tracking) và dùng để áp dụng **hạn mức sử dụng** (Throttling/Quotas). API Key KHÔNG nên được coi là cơ chế bảo mật chính.