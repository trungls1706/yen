# 🔐 IAM (Identity and Access Management)

## 1. Khái niệm
- Dịch vụ quản lý truy cập, phân quyền và xác thực người dùng, dịch vụ trong AWS.  
- Miễn phí sử dụng.

## 2. Các thành phần chính
| Thành phần | Mô tả |
|------------|-------|
| **User**   | Tài khoản người dùng cá nhân (developer, admin…). |
| **Group**  | Tập hợp user, gán policies chung. |
| **Role**   | Đối tượng dùng để cấp quyền tạm thời cho service AWS, user hoặc account khác (STS). Khuyến khích sử dụng thay vì Access Key. |
| **Policy** | Tệp JSON định nghĩa quyền (Allow/Deny) cho user/role. Có thể là Managed Policy (AWS tạo sẵn) hoặc Inline Policy (tự tạo). |

## 3. Best Practices
- Không dùng root để daily work.  
- Kích hoạt MFA cho root.  
- Sử dụng IAM Roles cho EC2, Lambda thay vì access key.  
- Principle of Least Privilege – cấp đúng quyền cần dùng.  
- Luân phiên rotate Access Key, tránh hard-code vào code (dùng AWS Secrets Manager hoặc Parameter Store).  

---

# 💻 EC2 (Elastic Compute Cloud)

## 1. Khái niệm
- Dịch vụ cung cấp máy chủ ảo (VM) linh hoạt trong đám mây.

## 2. Các tính năng quan trọng
| Hạng mục | Tóm tắt |
|----------|---------|
| **Instance Type** | t3, m6, c6… (General Purpose, Memory Optimize, Compute Optimize…) |
| **AMI** | Ảnh OS mẫu để launch instance. |
| **EBS** | Block storage gắn vào EC2 (gp3, io1…). |
| **Instance Store** | Ổ đĩa tạm thời, mất dữ liệu khi stop / terminate. |
| **Security Groups** | Virtual firewall – cho phép/deny inbound & outbound (stateful). |
| **Key Pair** | SSH key để login vào instance Linux/Windows. |
| **Elastic IP** | IPv4 static – EIP chỉ bị tính phí khi không attached. |
| **User Data** | Shell script chạy 1 lần tại boot đầu (bootstrap). |
| **Placement Group** | Cluster, Spread, Partition để điều khiển placement vật lý. |
| **Auto Scaling Group (ASG)** | Tự động tăng/giảm EC2 theo load. |
| **Load Balancer** | ALB (7), NLB (4), CLB (Legacy). |

## 3. Lifecycle của EC2
`pending ➝ running ➝ stopping ➝ stopped ➝ terminated`

## 4. Pricing Options
| Loại | Tính năng |
|------|-----------|
| **On-Demand** | Trả theo giờ/giây – linh hoạt. |
| **Reserved Instance** | Cam kết 1~3 năm – rẻ hơn ~75%. |
| **Spot Instance** | Bỏ thầu phần dư – tiết kiệm đến 90% nhưng có thể bị reclaim. |
| **Savings Plan** | Cam kết sử dụng compute theo $/h – linh hoạt hơn Reserved. |

---

# ✅ Summary Tips nhớ khi thi DVA

| Chủ đề | Ghi nhớ |
|--------|---------|
| **IAM** | Roles dùng cho EC2 / Lambda để truy cập S3, DynamoDB, … |
| **IAM** | Policies là JSON (Effect – Action – Resource – Condition) |
| **EC2** | EBS giữ dữ liệu khi Stop, Instance Store thì không |
| **EC2** | User Data chỉ chạy lần đầu |
| **EC2** | Security Group là stateful, NACL stateless |
| **EC2** | ALB layer 7 – support path-based, host-based routing |
| **EC2** | Target group gắn vào EC2 hoặc Lambda hoặc IP |

---

# 💰 AWS Pricing Options (Chi tiết)

| Loại | Description | Cost | Use case |
|------|-------------|------|----------|
| **On-Demand** | Trả theo giờ / giây | Cao | workload không dự đoán được |
| **Reserved Instance (RI)** | Commit 1–3 năm | Giảm đến 75% | workload ổn định |
| **Savings Plan** | Commit tiền theo $/h | Linh hoạt hơn RI | workload chuyển đổi service |
| **Spot Instance** | Dùng phần dư của AWS | Tiết kiệm 90% | job interruptible (batch, CI/CD) |
| **Scheduled Reserved** | EC2 chạy theo lịch fixed | Giảm chi phí | workload cố định giờ |
| **Capacity Reservation** | Đặt trước chỗ | Thường đắt | mission-critical cần capacity |
| **Dedicated Hosts** | Thuê nguyên server vật lý | Rất đắt | license BYOL, compliance cao |
| **Dedicated Instances** | Instance isolate | Đắt hơn On-Demand | cần isolate khỏi khách hàng khác |

---

# 🏨 AWS Option ví dụ khách sạn

| AWS Option | Ví dụ khách sạn | Ý nghĩa thực tế |
|------------|----------------|----------------|
| **On-Demand** | Ở resort vài hôm, trả giá đầy đủ từng ngày | EC2 linh hoạt, workload không ổn định |
| **Reserved Instances** | Đặt phòng dài hạn 1–3 năm, giá rẻ | Workload ổn định dài hạn |
| **Savings Plans** | Mua thẻ giờ ở resort, đổi được phòng | Commit $/h, đổi instance type, vùng, Fargate, Lambda |
| **Spot Instances** | Đấu giá phòng dư, rẻ nhưng bị đuổi bất kỳ lúc nào | Batch job, CI/CD, big data, ML training |
| **Dedicated Hosts** | Thuê nguyên tòa nhà, không ai dùng chung | Thuê trọn server vật lý, BYOL, compliance |
| **Capacity Reservations** | Đặt phòng trước và phải trả tiền giữ chỗ | Đảm bảo luôn có máy trong AZ |

---

# ❓ Câu hỏi ôn tập

## 🔐 PHẦN IAM
1. Muốn một EC2 instance truy cập S3 an toàn & tự động, nên dùng gì?  
 A. IAM User B. Access Key hard-code  
 ✅ C. IAM Role D. Root Account  

2. MFA nên được bật cho đối tượng nào đầu tiên?  
 A. IAM Role B. IAM User  
 ✅ C. Root User D. Service Account  

3. Chính sách IAM được viết dưới dạng gì?  
 A. XML B. YAML ✅ C. JSON D. CSV  

4. Nguyên tắc cấp quyền tốt nhất là gì?  
 A. Cấp càng nhiều càng tốt B. Khi bị từ chối mới cấp  
 ✅ C. Least Privilege D. Admin cho tất cả  

5. Inline Policy là gì?  
 A. Policy AWS tạo ✅ B. Gắn riêng vào User/Role  
 C. Policy tái sử dụng D. Chỉ dùng cho S3  

6. Muốn Lambda truy cập DynamoDB thì nên tạo gì?  
 ✅ A. IAM Role B. IAM Group C. Inline Policy D. MFA  

7. Dịch vụ dùng để cấp quyền tạm thời cross-account?  
 A. IAM User ✅ B. AWS STS C. S3 D. EC2  

8. Nếu 1 policy có “Deny”, 1 policy khác “Allow” — kết quả?  
 A. Allow ✅ B. Deny C. Không xác định D. Error  

9. Vai trò của IAM Group?  
 A. Gắn Roles B. Chứa policies  
 ✅ C. Nhóm Users để gán policies D. Chứa EC2  

10. Programmatic Access thường dùng phương thức nào?  
 A. Password B. SSH Key ✅ C. Access Key & Secret D. MFA  

---

## 💻 PHẦN EC2
11. Dữ liệu Instance Store sẽ mất khi nào?  
 ✅ A. Stop Instance B. Start C. Reboot D. Attach EBS  

12. Security Group là kiểu tường lửa gì?  
 A. Stateless ✅ B. Stateful C. Static D. Private  

13. Muốn tiết kiệm 90% cho batch job nên dùng?  
 A. On-Demand B. Reserved ✅ C. Spot D. Dedicated Host  

14. User Data script sẽ chạy khi nào?  
 A. Mỗi lần reboot B. Mỗi lần stop/start  
 ✅ C. Lần đầu launch D. Mỗi ngày  

15. Elastic IP bị tính phí khi nào?  
 A. Instance running ✅ C. Không gán vào đâu  
 B. Gán vào instance D. Không bao giờ  

16. Trong các tài nguyên sau, cái nào tính phí?  
 A. Subnet B. Security Group ✅ C. NAT Gateway D. Route Table  

17. Để isolate physical server riêng, chọn?  
 A. Reserved Instance ✅ B. Dedicated Host  
 C. Spot D. Compute Savings Plan  

18. Muốn auto-scale EC2 theo CPU dùng gì?  
 A. Lambda B. SNS ✅ C. Auto Scaling Group D. EC2 Fleet  

19. ALB ở tầng nào của OSI?  
 A. Layer 4 B. Layer 3 ✅ C. Layer 7 D. Layer 2  

20. Cách isolate EC2 rẻ nhất trong cùng VPC?  
 A. Dedicated Instance B. Tạo VPC mới  
 C. IAM Role ✅ D. Separate Subnet & Security Group  
