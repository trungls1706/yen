# 🗄️ Amazon RDS, Aurora, ElastiCache, Route 53

## 🗄️ Amazon RDS (Relational Database Service)
- Dịch vụ quản lý database có cấu trúc (SQL): **MySQL, PostgreSQL, MariaDB, Oracle, SQL Server**.  
- **Managed**: AWS lo backup, patch, high availability.  
- **Multi-AZ Deployment (HA)**: có bản replica standby trong AZ khác → tự động failover.  
- **Read Replica**: tăng khả năng đọc, cũng có thể promote thành DB độc lập.  
- Là **PaaS cho database** → không cần quản lý OS, patch thủ công.  

---

## ⚡ Amazon Aurora
- Database do AWS phát triển, tương thích **MySQL / PostgreSQL** nhưng **nhanh gấp 3–5 lần**.  
- **Cluster storage** tự mở rộng (10GB → 128TB).  
- **HA tự động Multi-AZ**, có **6 copies dữ liệu ở 3 AZs**.  
- **Aurora Serverless v2**: auto scale theo demand → tính tiền theo usage, phù hợp workload biến động.  
- **Global Database**: replicate cross-region <1s.  
👉 **Thi chọn Aurora** khi cần hiệu năng cao, HA mạnh, phí rẻ hơn RDS enterprise.  

---

## 🚀 Amazon ElastiCache
- Dịch vụ **Managed in-memory cache**, giảm tải & tăng tốc độ truy vấn.  
- **2 engine chính**:  
  - **Redis**: hỗ trợ pub/sub, sorted set, streams – đa mục đích.  
  - **Memcached**: đơn giản, scale-out dạng cluster ngang.  
- **Use-case**: Cache kết quả DB, session store, leaderboard, rate-limit, queue nhỏ.  
👉 **ElastiCache giúp giảm latency và tiết kiệm chi phí database bằng cách cache dữ liệu.**  

---

## 🌍 Amazon Route 53
- Dịch vụ **DNS toàn cầu của AWS**.  
- Khả năng **uptime rất cao (100% SLA)**.  
- **Record types**: A, AAAA, CNAME, Alias, MX, TXT...  
- **Các kiểu routing**:  

| Kiểu Routing   | Ý nghĩa |
|----------------|---------|
| Simple         | Trả về 1 IP cố định |
| Weighted       | Chia load theo % |
| Latency-based  | Đi server user ít độ trễ nhất |
| Failover       | Primary – Secondary, dùng health check |
| Geolocation    | User ở đâu → trả IP khác |
| Geoproximity   | Tuỳ chỉnh bán kính region (phải dùng Route53 Traffic Flow) |

- **Health Check**: kiểm tra endpoint khỏe → tự failover.  

---

## ✨ Tóm tắt ghi nhớ khi thi

| Câu hỏi/Use-case                  | Chọn dịch vụ |
|----------------------------------|--------------|
| SQL + fully managed              | RDS |
| SQL hiệu năng cao, HA mạnh       | Aurora |
| Auto scale database theo nhu cầu | Aurora Serverless |
| Cache session, giảm tải DB       | ElastiCache Redis |
| DNS + global routing + failover  | Route 53 |

---

## 🔥 Câu hỏi luyện thi

**Câu 1:**  
Bạn muốn dùng MySQL nhưng không cần lo quản lý hệ điều hành, backup hay patch tay. Bạn nên chọn dịch vụ nào của AWS?  
- A. EC2 self-hosted  
- B. DynamoDB  
- C. S3  
- ✅ D. RDS  

---

**Câu 2:**  
Chức năng chính của Read Replica trong Amazon RDS là gì?  
- A. Backup dữ liệu ra S3  
- B. Scale việc ghi  
- ✅ C. Scale việc đọc  
- D. Mã hóa data  

---

**Câu 3:**  
Điểm khác biệt nổi bật của Amazon Aurora so với RDS MySQL thông thường là gì?  
- A. Tương thích MySQL  
- ✅ B. Có 6 bản sao dữ liệu ở 3 AZ  
- C. Có backup  
- D. Hỗ trợ IAM  

---

**Câu 4:**  
Bạn cần database tự động scale theo demand và tính tiền theo usage. Dịch vụ nào phù hợp nhất?  
- A. RDS Multi-AZ  
- B. Aurora Standard  
- ✅ C. Aurora Serverless  
- D. EC2 DB  

---

**Câu 5:**  
Bạn cần lưu session store tốc độ rất cao trong RAM để giảm tải database. Nên chọn?  
- A. RDS  
- B. Aurora  
- ✅ C. ElastiCache Redis  
- D. Redshift  

---

**Câu 6:**  
Engine ElastiCache nào hỗ trợ các cấu trúc như Sorted set, Pub/Sub, Streams?  
- A. Memcached  
- ✅ B. Redis  
- C. DynamoDB  
- D. Elasticsearch  

---

**Câu 7:**  
Bạn muốn người dùng được định tuyến tới server có độ trễ thấp nhất – dùng kiểu routing nào của Route53?  
- A. Simple  
- B. Failover  
- ✅ C. Latency-based  
- D. Weighted  

---

**Câu 8:**  
Chia 70% traffic tới server A & 30% tới server B trong Route53 ⇒ dùng kiểu?  
- A. Failover  
- B. Geolocation  
- ✅ C. Weighted  
- D. Latency  

---

**Câu 9:**  
Bạn muốn Route53 tự động chuyển sang DNS phụ khi DNS chính “down”, cần bật tính năng nào?  
- A. DNSSEC  
- ✅ B. Health Check + Failover Routing  
- C. Alias  
- D. TTL thấp  

---

**Câu 10:**  
Giải pháp đơn giản nhất để giảm số lượng truy vấn tới RDS & cải thiện tốc độ phản hồi?  
- A. Tăng cấu hình instance  
- B. Dùng DynamoDB  
- ✅ C. Thêm cache ElastiCache  
- D. Chia sharding  
