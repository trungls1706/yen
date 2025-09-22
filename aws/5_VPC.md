# 🛠️ AWS Developer Associate (DVA-C02) – Câu hỏi hay gặp về VPC/Networking

## 🔥 Subnet / Gateway / NAT / Bastion
- **Một EC2 trong private subnet cần tải patch/update từ Internet. Làm thế nào?**  
  ✅ Tạo **NAT Gateway** trong public subnet, update **Route Table** của private subnet.

- **EC2 trong public subnet muốn có IP public để SSH từ bên ngoài?**  
  ✅ Gán **Elastic IP** và attach **Internet Gateway** vào VPC.

- **Có một DB trong private subnet. Làm sao Dev có thể SSH vào để debug?**  
  ✅ Tạo **Bastion Host** trong public subnet → SSH vào private EC2.

---

## 🔥 NACL vs Security Group
- **Khác biệt chính giữa SG và NACL là gì?**  
  - SG: **Stateful**, chỉ ALLOW rule.  
  - NACL: **Stateless**, có cả ALLOW + DENY rule.  

- **Nếu muốn block 1 IP cụ thể truy cập VPC?**  
  ✅ Dùng **NACL** (SG không có deny).

---

## 🔥 VPC Endpoints
- **EC2 trong private subnet cần truy cập S3 nhưng không muốn đi qua Internet hay NAT. Làm sao?**  
  ✅ Tạo **S3 Gateway Endpoint**.

- **EC2 private subnet muốn gọi DynamoDB API mà không tốn chi phí NAT GW?**  
  ✅ Dùng **DynamoDB Gateway Endpoint**.

---

## 🔥 VPC Peering / Transit
- **Kết nối 2 VPC với nhau trong cùng region, private traffic, không qua Internet?**  
  ✅ **VPC Peering**.

- **Có nhiều VPC (10+) cần kết nối qua lại → tránh nhiều peering phức tạp?**  
  ✅ **Transit Gateway (TGW)**.

⚠️ Trap: **VPC Peering không hỗ trợ transitive routing**  
(A ↔ B, B ↔ C → A không truy cập được C).

---

## 🔥 Developer liên quan VPC
- **Lambda trong VPC cần gọi API Internet → không kết nối được. Vì sao?**  
  ❌ Vì Lambda gắn vào private subnet mà không có **NAT GW/IGW**.  
  ✅ Giải pháp: Thêm **NAT GW** hoặc **VPC Endpoint** nếu gọi AWS service.

- **Ứng dụng cần giao tiếp với DynamoDB từ Lambda trong private subnet**  
  ✅ Dùng **DynamoDB VPC Endpoint** thay vì NAT (tiết kiệm chi phí).

- **Ứng dụng serverless cần private communication giữa các VPC khác account. Giải pháp?**  
  ✅ **VPC Peering** hoặc **Transit Gateway** (nếu nhiều VPC).

---

## 🔥 Tips & Bẫy trong đề thi
- NAT Gateway = **chỉ outbound**, inbound thì fail.
- **Bastion Host** luôn ở public subnet.
- **DB luôn ở private subnet** (exam hay lừa: cho DB public subnet).
- **Lambda trong VPC** = mất quyền truy cập Internet trừ khi có NAT/Endpoint.
- **S3 access từ private subnet → Endpoint**, không cần NAT.
- **VPC Peering không transitive** (đề thi thích hỏi).
