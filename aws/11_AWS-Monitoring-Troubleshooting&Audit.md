Chào bạn, việc nắm vững các dịch vụ Giám sát (Monitoring), Khắc phục sự cố (Troubleshooting) và Kiểm toán (Audit) là cực kỳ quan trọng cho mọi chứng chỉ AWS. Dưới đây là tổng hợp toàn diện về **CloudWatch, X-Ray, và CloudTrail**, cùng với các Use Case và Câu hỏi thường gặp khi đi thi.

---

# TỔNG HỢP VỀ MONITORING, TROUBLESHOOTING & AUDIT

## I. Amazon CloudWatch (Giám sát và Vận hành)

**Mục đích cốt lõi:** Cung cấp khả năng **quan sát (observability)** toàn diện cho các tài nguyên, ứng dụng và dịch vụ AWS.

### 1. Các thành phần chính

| Thành phần | Ý Chính & Chức năng | Từ khóa & Ghi chú |
| :--- | :--- | :--- |
| **Metrics** | Các biến số thời gian thực đại diện cho hiệu suất của tài nguyên AWS (ví dụ: CPU Utilization, Disk Read/Write). | **Standard Metrics** (tự động thu thập) và **Custom Metrics** (do bạn định nghĩa, cần API hoặc Agent). |
| **Monitoring** | Quá trình theo dõi các Metrics để kiểm tra sức khỏe hệ thống. | Giám sát **theo thời gian thực** và **lịch sử**. |
| **Logs** | Thu thập và lưu trữ file log từ EC2, Lambda, và các ứng dụng. | **CloudWatch Logs**. Dùng **CloudWatch Agent** để gửi log và metrics từ EC2/on-premise. |
| **Alarms** | Tự động thực hiện hành động khi một Metric vượt quá ngưỡng định nghĩa. | **Threshold** (Ngưỡng). Hành động thường là gửi thông báo (qua SNS), hoặc kích hoạt Auto Scaling, hoặc dừng/khởi động lại EC2. |
| **CloudWatch Agent** | Phần mềm cài đặt trên EC2 hoặc máy chủ on-premise để thu thập **Custom Metrics** (ví dụ: bộ nhớ, dung lượng ổ đĩa) và **Logs** của ứng dụng. | Cần thiết để có **Memory Utilization** trên EC2. |
| **EventBridge (CloudWatch Events)** | Dịch vụ định tuyến sự kiện (Event Bus) cho phép ứng dụng phản ứng với các thay đổi trạng thái trong tài nguyên AWS hoặc từ các ứng dụng của bạn. | **EventBridge Rule** (Quy tắc): Định nghĩa nguồn sự kiện và đích đến (target). |

### 2. Use Cases (Ứng dụng thực tế)

* **Tự động hóa phản ứng:** Thiết lập Alarm để khi CPU Utilization của EC2 đạt 90%, tự động **Scale-out** (thêm instance) thông qua Auto Scaling Group.
* **Giám sát sâu EC2:** Cài đặt **CloudWatch Agent** để theo dõi các chỉ số quan trọng như **RAM Utilization** (mà AWS không cung cấp mặc định).
* **Xử lý sự kiện theo thời gian thực:** Dùng **EventBridge Rule** để khi một file mới được upload lên S3, một hàm Lambda tự động được kích hoạt để xử lý file đó.

---

## II. AWS X-Ray (Truy tìm giao dịch)

**Mục đích cốt lõi:** Cung cấp thông tin chi tiết về hiệu suất và sự cố của các **ứng dụng phân tán** (Distributed Applications), bao gồm microservices.

### 1. Các thành phần chính

* **Tracing (Truy tìm):** Theo dõi đường đi của một yêu cầu (request) khi nó đi qua nhiều dịch vụ trong ứng dụng của bạn.
* **Service Map (Bản đồ dịch vụ):** Biểu đồ trực quan hóa tất cả các dịch vụ (Nodes) và kết nối (Edges) mà request đi qua, giúp dễ dàng xác định điểm nghẽn.
* **Segments & Subsegments:** Dữ liệu thời gian và chi tiết được thu thập từ mỗi thành phần.

### 2. Use Cases (Ứng dụng thực tế)

* **Tìm kiếm điểm nghẽn (Bottleneck):** Xác định chính xác dịch vụ/hàm (ví dụ: một cuộc gọi DB hoặc một hàm Lambda) đang gây ra độ trễ cao nhất trong một giao dịch.
* **Phân tích lỗi:** Theo dõi request đi qua toàn bộ kiến trúc để biết lỗi bắt nguồn từ đâu (ví dụ: do API Gateway, do Lambda, hay do DynamoDB).
* **Microservices Troubleshooting:** Phù hợp nhất cho kiến trúc Microservices nơi một request có thể đi qua hàng chục dịch vụ khác nhau.

---

## III. AWS CloudTrail (Kiểm toán và Quản trị)

**Mục đích cốt lõi:** **Ghi lại các hành động quản trị (API Calls)** được thực hiện trong tài khoản AWS của bạn.

### 1. Các thành phần chính

* **Event Log (Nhật ký Sự kiện):** Ghi lại mọi cuộc gọi API được thực hiện bởi người dùng, vai trò IAM, hoặc dịch vụ AWS.
* **Trail (Đường mòn):** Cấu hình để lưu trữ các Event Log một cách liên tục và an toàn vào một **S3 Bucket**.
* **Events Types:**
    * **Management Events (Sự kiện quản lý):** Các hoạt động tạo, xóa, sửa đổi tài nguyên (ví dụ: `RunInstance` trên EC2, `CreateBucket` trên S3). (Mặc định được ghi lại)
    * **Data Events (Sự kiện dữ liệu):** Các hoạt động cấp độ dữ liệu cao (ví dụ: `GetObject` hoặc `PutObject` trên S3). (Cần bật thủ công, tốn thêm chi phí)

### 2. Use Cases (Ứng dụng thực tế)

* **Kiểm toán An ninh:** Trả lời câu hỏi: "Ai đã tắt EC2 Instance Production vào lúc 3 giờ sáng?"
* **Tuân thủ (Compliance):** Cung cấp bằng chứng cho các cơ quan quản lý rằng các thay đổi hệ thống được ghi lại đầy đủ.
* **Phân tích thay đổi tài nguyên:** Theo dõi tất cả các hành động tạo/xóa/sửa đổi tài nguyên để khắc phục sự cố hoặc truy vết lỗi cấu hình.

---

# CÁC CÂU HỎI HAY GẶP KHI ĐI THI

| Stt | Tình huống/Câu hỏi | Dịch vụ/Tính năng được sử dụng | Lý do (Phân biệt) |
| :--- | :--- | :--- | :--- |
| **1** | Bạn muốn biết **mức sử dụng RAM (Memory Utilization)** của EC2. Dịch vụ nào cung cấp và làm thế nào để thu thập? | **CloudWatch** & **CloudWatch Agent**. | RAM không phải là Standard Metric. Agent cần được cài đặt để thu thập Custom Metrics. |
| **2** | Bạn cần tìm nguyên nhân gây ra **độ trễ cao** trong ứng dụng Microservices của mình. | **AWS X-Ray**. | X-Ray truy tìm toàn bộ đường đi của request qua các dịch vụ, lý tưởng cho việc **Troubleshooting Performance**. |
| **3** | Một nhân viên đã **vô tình xóa S3 Bucket chứa dữ liệu quan trọng**. Làm thế nào để truy vết hành động đó? | **AWS CloudTrail**. | CloudTrail ghi lại các cuộc gọi **API quản trị** (`DeleteBucket`) – đây là chức năng kiểm toán cốt lõi. |
| **4** | Làm thế nào để tự động kích hoạt một hàm Lambda mỗi khi **một tài nguyên AWS cụ thể được tạo** trong tài khoản của bạn? | **Amazon EventBridge Rule**. | EventBridge lý tưởng để tự động hóa các phản ứng theo sự kiện **giữa các dịch vụ AWS**. |
| **5** | Làm thế nào để **xem trước** tác động của một thay đổi cấu hình đối với một Stack CloudFormation đang hoạt động? | **CloudFormation Change Sets**. | Câu hỏi này liên quan đến IaC (CloudFormation) nhưng là một tính năng **Troubleshooting/Audit** trước triển khai. |
| **6** | Bạn muốn giám sát hiệu suất API Gateway của mình và tự động **thông báo qua email** khi tỷ lệ lỗi vượt quá 5%. | **CloudWatch Alarm** (Metric) và **SNS** (Hành động). | CloudWatch theo dõi tỷ lệ lỗi, Alarm kích hoạt SNS để gửi email. |