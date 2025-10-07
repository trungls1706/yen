# 🔐 JWT và Session — Khi nào nên dùng JWT thay cho Session?

## 1. 🧩 Session truyền thống hoạt động thế nào?

- Khi người dùng đăng nhập thành công → server tạo **session** (lưu trong RAM, Redis hoặc database).  
- Server gửi **session ID** về client (qua cookie).  
- Mỗi request sau đó → client gửi lại session ID → server tìm session tương ứng để xác thực người dùng.

### Ưu điểm:
- Dễ dùng, dễ xoá khi logout.  
- Phù hợp cho ứng dụng nhỏ, đơn server.

### Nhược điểm:
- **Server phải lưu trạng thái người dùng (stateful)**.  
- Khi có nhiều server (load balancing hoặc microservices), việc đồng bộ session trở nên khó khăn.

---

## 2. 🔑 JWT ra đời trong tình huống nào?

JWT (**JSON Web Token**) sinh ra để giải quyết hạn chế của session, đặc biệt trong **hệ thống phân tán (distributed systems)**.

### JWT được dùng thay Session trong các tình huống sau:

| Tình huống | Lý do dùng JWT |
|------------|----------------|
| 🧠 **Nhiều server hoặc microservices** | Session khó đồng bộ, trong khi JWT **stateless**, chỉ cần xác thực bằng khóa bí mật. |
| 📱 **Ứng dụng mobile hoặc SPA (React, Vue, Angular)** | JWT có thể lưu ở `localStorage` hoặc `AsyncStorage`, gửi qua header `Authorization`, phù hợp với API RESTful. |
| 🌍 **Server muốn stateless (không lưu trạng thái)** | Server không cần lưu session, dễ scale, tiết kiệm tài nguyên. |
| 🔗 **API dùng chung giữa nhiều client (web, app, IoT, v.v.)** | JWT chứa sẵn thông tin user và quyền hạn (role, exp, ...), dễ xác thực ở mọi client. |

---

## 3. ⚙️ So sánh Session-based vs JWT-based

| Tiêu chí | Session-based | JWT-based |
|-----------|----------------|------------|
| Lưu trữ trên server | ✅ Có (session store) | ❌ Không cần |
| Lưu trữ trên client | Cookie (session ID) | LocalStorage / Cookie (token) |
| Xác thực request | Kiểm tra session ID trong server | Kiểm tra chữ ký JWT |
| Mở rộng nhiều server | ❌ Khó | ✅ Dễ |
| Thu hồi ngay khi logout | ✅ Có thể | ⚠️ Khó hơn (cần blacklist/refresh token) |

---

## 4. 🚀 Tóm tắt ngắn gọn

> ✅ **JWT sinh ra để thay thế Session trong các hệ thống stateless hoặc phân tán**, đặc biệt khi **server không muốn hoặc không thể lưu session cho từng người dùng**.

---

## 5. 🧠 Gợi ý thêm

Nếu muốn bảo mật và quản lý session tốt hơn:
- Dùng **Access Token (JWT)** + **Refresh Token** để có thể làm mới khi hết hạn.  
- Dùng **token blacklist** để xử lý logout an toàn.  
- Không lưu JWT trong `localStorage` nếu lo ngại XSS → có thể dùng `httpOnly cookie`.
