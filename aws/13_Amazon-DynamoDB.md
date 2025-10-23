Amazon DynamoDB là dịch vụ **cơ sở dữ liệu NoSQL** được quản lý hoàn toàn (Fully Managed) và **phi máy chủ (Serverless)** của AWS, được thiết kế cho các ứng dụng yêu cầu hiệu suất cao, độ trễ thấp và khả năng mở rộng quy mô gần như vô hạn.

---

# TỔNG HỢP Ý CHÍNH: Amazon DynamoDB

## 1. Các Đặc Điểm Cốt Lõi

| Khía cạnh | Mô tả | Ghi chú/Từ khóa |
| :--- | :--- | :--- |
| **Loại hình DB** | **NoSQL** (Phi quan hệ) dạng **Key-Value và Document**. Dữ liệu được lưu trữ dưới dạng các **Item** (hàng) và **Attributes** (thuộc tính/cột). | **Key-Value**, **Document**. |
| **Tính Serverless** | AWS tự động quản lý tất cả các máy chủ, cập nhật phần mềm, vá lỗi và sao lưu. Bạn chỉ tập trung vào dữ liệu và ứng dụng. | **Fully Managed**, **Serverless**. |
| **Hiệu suất** | Cung cấp hiệu suất ổn định với độ trễ thấp ở mức **một con số miligiây (single-digit millisecond latency)**, bất kể quy mô bảng. | **Low Latency**. |
| **Khả năng mở rộng** | Có thể mở rộng quy mô gần như **vô hạn** và **tự động** (nếu dùng chế độ On-Demand) để xử lý hàng triệu request mỗi giây. | **Massive Scalability**. |
| **Mô hình Khả năng sẵn sàng** | Dữ liệu được sao chép trên **nhiều Vùng sẵn sàng (AZs)** trong một Khu vực AWS (Region) để đảm bảo độ bền và khả năng sẵn sàng cao. | **High Availability & Durability**. |

---

## 2. Mô hình Dữ liệu và Truy vấn

| Khái niệm | Mô tả |
| :--- | :--- |
| **Primary Key** | Khóa chính, dùng để xác định duy nhất một Item. Có hai loại: |
| | **Simple Primary Key:** Chỉ sử dụng một **Partition Key** (Hash Key). |
| | **Composite Primary Key:** Sử dụng **Partition Key** và **Sort Key** (Range Key). |
| **Partition Key** | Quyết định nơi dữ liệu được lưu trữ vật lý (trên phân vùng nào). Truy vấn dùng Partition Key luôn cho hiệu suất cao. |
| **Sort Key** | Xác định thứ tự các Item trong cùng một Partition Key. Cho phép các truy vấn phạm vi (Range Queries) như lấy dữ liệu "từ X đến Y". |
| **Secondary Indexes** | Các cấu trúc truy vấn thay thế: |
| | **Global Secondary Index (GSI):** Có Partition Key và Sort Key **khác** Khóa chính. Tốt cho các truy vấn linh hoạt, nhưng có thể bị trễ đồng bộ. |
| | **Local Secondary Index (LSI):** Có cùng Partition Key, nhưng Sort Key khác Khóa chính. Đảm bảo tính nhất quán mạnh mẽ. |

## 3. Chế độ Dung lượng (Capacity Modes)

DynamoDB có hai cách chính để quản lý thông lượng (throughput) đọc và ghi:

| Chế độ | Mô tả | Thanh toán |
| :--- | :--- | :--- |
| **Provisioned** | Bạn **cung cấp trước** số lượng đơn vị đọc (RCU) và ghi (WCU) mà bạn dự kiến cần. Phải trả tiền cho dung lượng đã cấp phép, ngay cả khi không sử dụng hết. | **Predictable Costs** (Chi phí dự đoán được). Tốt cho khối lượng công việc ổn định. |
| **On-Demand** | Bạn **không cần chỉ định** RCU/WCU. DynamoDB tự động điều chỉnh quy mô tức thì để đáp ứng tải. Bạn chỉ trả tiền cho số lượng đọc/ghi thực tế. | **Pay-per-Request** (Trả theo yêu cầu). Tốt cho khối lượng công việc không ổn định (spiky) hoặc không xác định. |

---

# USE CASES (Ứng dụng Thực tế)

DynamoDB là lựa chọn tối ưu cho các ứng dụng có đặc điểm:

1.  **Serverless Web/Mobile Backends:**
    * Lưu trữ hồ sơ người dùng, dữ liệu phiên (session data), giỏ hàng điện tử, và dữ liệu cấu hình.
    * **Tại sao:** Tích hợp liền mạch với **API Gateway** và **AWS Lambda** để xây dựng kiến trúc Serverless hoàn chỉnh, chịu được tải cao.

2.  **Streaming Data & IoT:**
    * Lưu trữ dữ liệu cảm biến (sensor data) theo thời gian, dữ liệu log, và dữ liệu sự kiện từ thiết bị IoT.
    * **Tại sao:** Khả năng ghi (write) tốc độ cao và khả năng mở rộng theo chiều ngang vô hạn là hoàn hảo cho khối lượng dữ liệu phát sinh liên tục.

3.  **Hàng đợi Công việc (Job Queues) Lớn:**
    * Lưu trữ và theo dõi trạng thái của hàng triệu tác vụ cần xử lý.
    * **Tại sao:** Hiệu suất thấp, ổn định giúp các Worker (ví dụ: EC2/Fargate) truy cập nhanh chóng và cập nhật trạng thái tác vụ.

4.  **Tạo Cache/Meta-data cho Dữ liệu lớn:**
    * Lưu trữ siêu dữ liệu (metadata) của các đối tượng lớn trong **S3** hoặc làm lớp cache cho các truy vấn thường xuyên.

---

# CÁC CÂU HỎI HAY GẶP KHI ĐI THI/PHỎNG VẤN

1.  **Phân biệt DynamoDB Provisioned Mode và On-Demand Mode.**
    * **Provisioned:** Bạn cấp phát trước RCU/WCU. **Ưu điểm:** Chi phí rẻ hơn khi tải ổn định. **Nhược điểm:** Cần dự đoán tải, có thể bị **throttling** (bóp băng thông) nếu tải tăng đột ngột.
    * **On-Demand:** Tự động điều chỉnh. **Ưu điểm:** Không bao giờ bị throttling, lý tưởng cho tải không xác định (spiky). **Nhược điểm:** Chi phí cao hơn Provisioned nếu sử dụng liên tục ở mức ổn định.

2.  **Làm thế nào để thực hiện các truy vấn không phải là Khóa chính (Non-Key Attribute Queries)?**
    * Sử dụng **Global Secondary Index (GSI)**. GSI cho phép bạn định nghĩa một cặp Partition Key/Sort Key mới, cho phép truy vấn linh hoạt mà vẫn giữ hiệu suất cao.

3.  **Bạn gặp lỗi "ProvisionedThroughputExceededException" khi đang dùng Provisioned Mode. Bạn nên làm gì?**
    * Tăng số lượng **RCU** (nếu là lỗi đọc) hoặc **WCU** (nếu là lỗi ghi) đã cấp phép cho bảng/index đó. Nếu tải thường xuyên vượt quá dự đoán, hãy cân nhắc chuyển sang **On-Demand Mode**.

4.  **Tại sao DynamoDB không phải là lựa chọn tốt cho các truy vấn JOIN phức tạp hoặc các báo cáo tổng hợp (Aggregate Reports)?**
    * DynamoDB là cơ sở dữ liệu phi quan hệ, được tối ưu hóa cho **truy cập Key-Value** tốc độ cao. Nó không có cơ chế JOIN như SQL, và các truy vấn phức tạp yêu cầu phải quét toàn bộ bảng (Scan), việc này tốn kém và không hiệu quả. (Nên dùng Aurora/RDS hoặc chuyển dữ liệu sang Redshift/Athena để phân tích).

5.  **Trong DynamoDB, dữ liệu được sắp xếp như thế nào trong một Partition Key?**
    * Dữ liệu được sắp xếp dựa trên **Sort Key** (Range Key). Điều này cho phép bạn dễ dàng truy vấn một phạm vi (range) Item trong cùng một Partition.