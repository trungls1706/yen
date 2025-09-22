# 📦 Amazon Storage & Scaling Services

## 1. EBS (Elastic Block Store) – “ổ cứng gắn ngoài”
- **Block storage** – giống ổ cứng gắn vào máy  
- **Persistant**: giữ dữ liệu khi stop / terminate EC2 (nếu không chọn delete)  
- Có thể tách ra – gắn sang EC2 khác  
- Dùng như ổ `/dev/xvda`, `C:\...`  
- Các loại:
  - `gp3` (SSD thường)  
  - `io1/io2` (SSD IOPS cao)  
  - `st1/sc1` (HDD throughput)  
- Hỗ trợ **snapshot → S3** để backup  

✅ **Use case**: chạy app, database, server cần lưu dữ liệu  

---

## 2. EC2 Instance Store – “ổ tạm thời bên trong máy vật lý”
- Lưu trực tiếp trên host vật lý EC2  
- **Rất nhanh**, nhưng bị xoá khi Stop hoặc Terminate  
- Không thể snapshot hay attach sang instance khác  
- Không có khả năng dự phòng  
- ⚠️ **Mất dữ liệu khi instance bị Stop** (khác với EBS)  

✅ **Use case**: cache, buffer, temporary data, scratch disk  

---

## 3. EFS (Elastic File System) – “ổ file network dùng chung”
- **NFS (Network File System)** – lưu trữ dạng file  
- **Shared**: nhiều EC2 có thể mount & truy cập cùng lúc  
- **Serverless**, auto-scale dung lượng  
- Tính phí theo dung lượng thực dùng (GB-month)  
- Hỗ trợ **Multi-AZ** (khả dụng cao)  

✅ **Use case**: ứng dụng cần nhiều EC2 share chung thư mục (microservice, folder upload, CMS, container tasks)  

---

## 📌 Summary so sánh nhanh

| Tiêu chí            | EBS   | Instance Store | EFS   |
|----------------------|-------|----------------|-------|
| Loại                | Block | Ephemeral      | File (Network) |
| Giữ dữ liệu sau Stop | ✅     | ❌              | ✅     |
| Share nhiều EC2      | ❌     | ❌              | ✅     |
| Performance          | Tốt   | Rất nhanh      | Tốt   |
| Use case             | OS, DB, app | Cache, temp | Share folder, multi-instance |

---

# ⚙️ Auto Scaling Group (ASG)
- Nhóm các EC2 được quản lý **tự động** theo rule.  
- Tự động tăng/giảm số lượng EC2 dựa trên nhu cầu.  

### Thông số chính
- **Min Capacity** – tối thiểu bao nhiêu instance luôn có  
- **Max Capacity** – tối đa cho phép mở rộng  
- **Desired Capacity** – số lượng mong muốn (có thể thay đổi bởi scaling policy)  

### Scaling Policy
- **Scale-out**: khi CPU > 70%  
- **Scale-in**: khi CPU < 20%  
- Hoặc theo metric khác (ví dụ số lượng hàng đợi SQS)  

✅ **Lợi ích**: tiết kiệm chi phí, tăng độ chịu tải, tự động hoá  

---

# 🧯 Elastic Load Balancing (ELB)

Phân phối lưu lượng traffic đến nhiều EC2 (hoặc container, lambda...) để đảm bảo **High Availability**.  

### Các loại Load Balancer

| Loại | Layer | Use Case | Hỗ trợ |
|------|-------|----------|--------|
| **ALB (Application LB)** | L7 – HTTP/HTTPS | Web app | Routing nâng cao |
| **NLB (Network LB)**     | L4 – TCP/UDP | Latency thấp, hiệu năng cao | Millions TPS |
| **CLB (Classic LB)**     | L4/L7 | Legacy app | Cũ – ít dùng |

✅ Có thể dùng kèm **ASG**: lưu lượng vào LB → LB phân về EC2 trong ASG  

---

# 🌐 ALB – Application Load Balancer (Layer 7)
- Tầng 7 (HTTP/HTTPS) – hiểu URL, header, host  
- **Advanced routing**:
  - Path-based routing → `/api` → service A  
  - Host-based routing → `api.example.com` → target group A  
- Forward đến:
  - EC2
  - ECS/EKS
  - IP addresses
  - Lambda  
- Hỗ trợ: **WebSocket, HTTP/2, AWS WAF**  
- Target Group health check  

✅ **Use case**: microservices, web app phức tạp, nhiều đường dẫn  

---

# 📊 Cách hoạt động ASG + CloudWatch

1. **CloudWatch Metrics** theo dõi:
   - CPUUtilization
   - NetworkIn / NetworkOut
   - SQS queue size
   - Custom metrics  

2. **CloudWatch Alarm**:  
   - CPU > 70% trong 5 phút → báo động tăng  
   - CPU < 20% → báo động giảm  

3. **Scaling Policy trong ASG**:  
   - **Scale Out Policy**: tăng EC2  
   - **Scale In Policy**: giảm EC2  

---

# 🔥 PHẦN CÂU HỎI

**Câu 1**: Tại sao Auto Scaling Group có thể tự động tăng số lượng EC2?  
✅ C. CloudWatch Alarm kích hoạt Scaling Policy  

**Câu 2**: Muốn scale EC2 khi số message trong SQS queue tăng?  
✅ B. CloudWatch monitor SQS Metric + Alarm + Scaling Policy  

**Câu 3**: Scaling Policy giảm số lượng instance khi tải thấp gọi là gì?  
✅ B. Scale-in  

**Câu 4**: Desired Capacity trong ASG là gì?  
✅ B. Số instance mong muốn ở thời điểm hiện tại  

**Câu 5**: Load Balancer nào hỗ trợ routing theo URL?  
✅ C. ALB  

**Câu 6**: NLB hoạt động ở tầng nào?  
✅ B. Layer 4  

**Câu 7**: ELB đời cũ (legacy)?  
✅ A. Classic Load Balancer  

**Câu 8**: Muốn LB routing đến Lambda?  
✅ C. ALB  

**Câu 9**: Muốn scale khi CPU > 80% trong 5 phút, cần gì?  
✅ B. CloudWatch Alarm  

**Câu 10**: Scaling policy cố định số lượng instance theo lịch gọi là?  
✅ A. Scheduled Scaling Policy  

**Câu 11**: Muốn scale theo giờ cao điểm?  
✅ A. Scheduled  

**Câu 12**: LB chia traffic HTTP tới nhiều EC2?  
✅ A. ALB  

**Câu 13**: Target Group dùng để làm gì?  
✅ B. Nhóm các EC2 dùng để nhận traffic từ LB  

**Câu 14**: Health Check fail → hậu quả?  
✅ B. Instance unhealthy bị loại khỏi nhận traffic  

**Câu 15**: CloudWatch metric mặc định không có?  
✅ B. Memory Utilization  

**Câu 16**: ASG có thể kết hợp với LB nào?  
✅ C. ALB hoặc NLB  

**Câu 17**: Muốn scale theo số request/second → dùng?  
✅ B. Target Tracking Scaling  

**Câu 18**: Predictive scaling dựa vào?  
✅ B. Machine Learning dự đoán tải tương lai  

**Câu 19**: Phân biệt Public vs Private LB dựa vào?  
✅ B. Có gắn Internet Gateway hay không  

**Câu 20**: AWS khuyến cáo dùng LB nào cho app web mới?  
✅ B. ALB  
