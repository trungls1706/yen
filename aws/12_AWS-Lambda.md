AWS Lambda là dịch vụ **Tính toán phi máy chủ (Serverless Compute)** của Amazon Web Services.

Nó cho phép bạn **chạy mã (code)** mà **không cần cung cấp hoặc quản lý máy chủ** (servers). Bạn chỉ cần tải mã nguồn lên, và Lambda sẽ tự động lo mọi thứ để chạy và điều chỉnh quy mô (scale) cho mã đó.

---

## 💡 Các Ý Chính về AWS Lambda

| Khía cạnh | Mô tả |
| :--- | :--- |
| **Mô hình dịch vụ** | **FaaS (Function as a Service)**. Bạn chỉ chạy các hàm (functions) riêng lẻ. |
| **Thanh toán** | Thanh toán theo **mức sử dụng thực tế** (từng **miligiây**), không phải trả tiền khi mã không chạy. |
| **Kích hoạt** | Mã được kích hoạt bởi các sự kiện (Events) từ nhiều dịch vụ AWS khác (ví dụ: upload file lên S3, request từ API Gateway, message từ SQS/SNS). |
| **Quản lý Hạ tầng** | AWS tự động quản lý việc cung cấp tài nguyên, bảo trì hệ điều hành, vá lỗi bảo mật và điều chỉnh quy mô. |
| **Khả năng mở rộng** | Tự động **tăng/giảm số lượng hàm** chạy đồng thời để đáp ứng mọi lưu lượng truy cập, từ số 0 đến hàng ngàn. |

---

## 🎯 Ví dụ Ứng dụng Thực tế

Lambda thường được sử dụng làm "keo dán" để kết nối các dịch vụ AWS khác:

1.  **Xử lý Ảnh/Dữ liệu:** Khi một bức ảnh mới được tải lên **S3**, sự kiện này kích hoạt hàm **Lambda** để tự động thay đổi kích thước ảnh (tạo thumbnail) và lưu lại vào S3.
2.  **Backend API:** **API Gateway** nhận request từ người dùng và chuyển đến **Lambda**, Lambda chạy logic nghiệp vụ (ví dụ: xử lý đăng ký, lấy dữ liệu), sau đó truy vấn **DynamoDB** và trả về kết quả.
3.  **Xử lý Hàng đợi:** **Lambda** thăm dò (poll) **SQS Queue** để xử lý các tác vụ bất đồng bộ (ví dụ: gửi email, xử lý đơn hàng).

Chào bạn, việc ôn tập về Serverless trong AWS là rất quan trọng, đặc biệt cho các chứng chỉ và phỏng vấn. Dưới đây là tổng hợp toàn diện các kiến thức, ứng dụng thực tế (Use Case), và các câu hỏi thường gặp khi đi phỏng vấn về hệ sinh thái **Serverless** của AWS.

---

# TỔNG HỢP KIẾN THỨC SERVERLESS TRONG AWS

**Serverless** (Phi máy chủ) là mô hình điện toán đám mây, nơi AWS quản lý toàn bộ cơ sở hạ tầng, cho phép bạn tập trung hoàn toàn vào mã ứng dụng. Bạn chỉ trả tiền cho những gì bạn sử dụng, không cần lo lắng về việc cung cấp hoặc quản lý máy chủ.

## 1. Các Dịch vụ Serverless Cốt Lõi

| Dịch vụ | Loại hình | Ý Chính Cốt Lõi |
| :--- | :--- | :--- |
| **AWS Lambda** | **FaaS** (Function as a Service) | Dịch vụ tính toán cốt lõi. Chạy mã code mà không cần quản lý máy chủ. **Thanh toán theo thời gian sử dụng (từng miligiây)**. |
| **DynamoDB** | **NoSQL Database** | Cơ sở dữ liệu NoSQL, hiệu suất cao, có độ trễ thấp, có thể mở rộng quy mô gần như vô hạn. Hoàn toàn được quản lý và **Serverless**. |
| **API Gateway** | **API Management** | Dịch vụ quản lý, tạo, duy trì và bảo mật các API RESTful và WebSocket, thường làm giao diện cho các hàm Lambda. |
| **Amazon S3** | **Lưu trữ Đối tượng** | Serverless Storage. Thường được sử dụng để kích hoạt hàm Lambda (khi upload file) và lưu trữ dữ liệu tĩnh cho ứng dụng web. |
| **Amazon SNS & SQS** | **Messaging** | **SNS** (Pub/Sub): Dịch vụ Push-based, kích hoạt nhiều Lambda. **SQS** (Queueing): Tách rời ứng dụng, Lambda có thể **poll** queue. |
| **Kinesis Data Firehose** | **Data Ingestion** | Dịch vụ serverless để tải dữ liệu streaming vào S3, Redshift hoặc Elasticsearch. **Không cần quản lý Shard**. |
| **Aurora Serverless** | **Relational Database** | Phiên bản Serverless của Amazon Aurora (MySQL/PostgreSQL tương thích). Tự động điều chỉnh dung lượng theo nhu cầu, lý tưởng cho khối lượng công việc không thường xuyên. |
| **AWS Cognito** | **Identity & Access** | Cung cấp khả năng **xác thực, ủy quyền và quản lý người dùng** cho ứng dụng web và di động. |

---

## 2. Serverless Orchestration & Compute

| Dịch vụ | Loại hình | Ý Chính Cốt Lõi |
| :--- | :--- | :--- |
| **Step Functions** | **Workflow/Orchestration** | Điều phối nhiều dịch vụ AWS (bao gồm Lambda) thành các **quy trình làm việc (workflow) có trạng thái (Stateful)**. Tuyệt vời cho các quy trình phức tạp. |
| **Fargate** | **Compute for Containers** | Công cụ tính toán Serverless cho **Amazon ECS** và **EKS**. Bạn chạy container mà không cần quản lý EC2 Instances (máy chủ ảo). **Không phải FaaS như Lambda**, nhưng là mô hình Serverless cho Container. |

---

## 3. Ứng Dụng Thực Tế (Use Cases)

| Use Case | Mục tiêu | Dịch vụ Serverless được sử dụng |
| :--- | :--- | :--- |
| **Xử lý dữ liệu File** | Kích hoạt logic khi tệp được tải lên/thay đổi. | **S3** (lưu trữ) -> **Lambda** (xử lý, ví dụ: tạo thumbnail, chuyển đổi định dạng). |
| **Backend Ứng dụng Web/Mobile** | Xây dựng API tốc độ cao, linh hoạt. | **Cognito** (Auth) -> **API Gateway** (Endpoint) -> **Lambda** (Logic nghiệp vụ) -> **DynamoDB** (Lưu trữ). |
| **Xử lý Dữ liệu Streaming** | Thu thập và tải dữ liệu theo thời gian thực. | **Producers** -> **Kinesis Data Firehose** -> **S3/Redshift** (lưu trữ và phân tích). |
| **Quy trình ETL Phức tạp** | Xây dựng các quy trình làm việc nhiều bước, có thể thất bại và thử lại (retry). | **Step Functions** (Điều phối) -> Nhiều **Lambda** (Từng bước xử lý) |
| **Chạy Container** | Triển khai ứng dụng dựa trên container mà không cần quản lý máy chủ. | **Fargate** (Compute) + **ECS** (Orchestration). |

---

# CÁC CÂU HỎI HAY GẶP KHI ĐI PHỎNG VẤN

## 💡 Về AWS Lambda (Cốt lõi FaaS)

1.  **Hạn chế của Lambda là gì?**
    * **Giới hạn thời gian chạy (Execution Timeout):** Tối đa 15 phút.
    * **Giới hạn bộ nhớ và CPU.**
    * **Giới hạn dung lượng triển khai (Deployment Package Size).**

2.  **Làm thế nào để truy cập cơ sở dữ liệu quan hệ (RDS/Aurora) từ Lambda một cách hiệu quả?**
    * Sử dụng **Amazon RDS Proxy** để quản lý và nhóm các kết nối cơ sở dữ liệu, tránh tình trạng **Connection Sprawl** (quá nhiều kết nối) khi nhiều Lambda chạy đồng thời.

3.  **Sự khác biệt giữa Lambda và Fargate?**
    * **Lambda:** FaaS. Chạy **hàm** (function). Tự động **scale về 0**. Lý tưởng cho tác vụ ngắn, dựa trên sự kiện.
    * **Fargate:** Serverless cho **Container**. Chạy **ứng dụng/services** trong container. Tốt cho các ứng dụng web phức tạp, yêu cầu tài nguyên lớn hơn hoặc cần chạy các công cụ tiêu chuẩn trong container.

4.  **Bạn xử lý "Cold Start" (Thời gian khởi động lạnh) của Lambda như thế nào?**
    * **Provisioned Concurrency:** Trả tiền để giữ một số lượng instance của Lambda luôn nóng (warm), giảm độ trễ khởi động.
    * Tối ưu hóa mã (giảm dung lượng package, sử dụng ngôn ngữ khởi động nhanh như Python/Node.js).

## 💡 Về Triển khai và Kiến trúc

5.  **Khi nào bạn nên dùng SQS thay vì SNS để kích hoạt Lambda?**
    * Dùng **SQS** khi bạn cần **điều chỉnh tải (load leveling)** hoặc muốn **đảm bảo message không bị mất** nếu Lambda bị lỗi (SQS lưu message cho đến khi xử lý thành công).
    * Dùng **SNS** khi bạn cần **kích hoạt tức thời** và **gửi đến nhiều đích** cùng lúc (Pub/Sub).

6.  **Giải thích vai trò của API Gateway trong kiến trúc Serverless.**
    * API Gateway là **mặt tiền (front door)** của ứng dụng. Nó xử lý việc định tuyến, **kiểm soát băng thông (throttling)**, **quản lý cache**, và **xác thực** (thông qua Cognito Authorizer hoặc Lambda Authorizer) trước khi gọi đến Lambda.

7.  **Trong một quy trình làm việc phức tạp (multi-step process), bạn chọn dùng gì để điều phối: Lambda gọi Lambda hay Step Functions?**
    * Chọn **Step Functions**. Step Functions giúp **quản lý trạng thái (stateful)**, xử lý logic phức tạp (rẽ nhánh, thử lại), giám sát và **giới hạn thời gian chạy vượt quá 15 phút** của Lambda (Step Functions có thể chạy lên đến 1 năm).

## 💡 Về Database Serverless

8.  **Ưu điểm chính của DynamoDB so với Aurora Serverless trong Serverless Backend?**
    * **DynamoDB (NoSQL):** Mở rộng quy mô **vô hạn** và **hiệu suất đồng nhất** bất kể quy mô (tính bằng **RCU/WCU**). Độ trễ cực thấp. Phù hợp cho dữ liệu linh hoạt.
    * **Aurora Serverless (SQL):** Tự động scale, nhưng có thể gặp **"Cold Start"** khi cần tăng dung lượng đột ngột. Phù hợp cho các ứng dụng yêu cầu tính toàn vẹn dữ liệu **ACID** và truy vấn phức tạp.