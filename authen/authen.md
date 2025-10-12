Để tóm tắt và tổng hợp kiến thức từ ba phần về **Authentication** và **Authorization** mà bạn đã đề cập, đây là bản tổng hợp dưới định dạng Markdown (.md) cho các khái niệm và cơ chế chính:

# 📜 Tóm Tắt & Tổng Hợp Kiến Thức: Authentication và Authorization

Tài liệu này tổng hợp các kiến thức cơ bản về **Authentication (Xác thực)** và **Authorization (Ủy quyền)**, tập trung vào các cơ chế phổ biến như Cookie/Session, Token-based, và các giao thức hiện đại như OAuth2/OpenID Connect.

---

## 1️⃣ Phần 1: Cookie, Session và Token-based Authentication

### 🍪 Cookie & Session

| Khái Niệm | Mô Tả | Cơ chế hoạt động | Ưu/Nhược điểm (So với Token) |
| :--- | :--- | :--- | :--- |
| **Authentication (Xác thực)** | Quá trình xác minh danh tính của người dùng (Ai là bạn?). | | |
| **Authorization (Ủy quyền)** | Quá trình xác định quyền truy cập của người dùng đã được xác thực (Bạn được làm gì?). | | |
| **Cookie** | Là một phần dữ liệu nhỏ được server gửi đến trình duyệt, trình duyệt sẽ lưu trữ và gửi lại cho server trong các request tiếp theo. | | |
| **Session** | Trạng thái người dùng được lưu trữ trên **Server**. Server sử dụng một **Session ID** (thường được lưu trong Cookie) để nhận dạng người dùng và truy xuất trạng thái session tương ứng. | 1. User đăng nhập. 2. Server tạo Session, lưu trữ session ID trong DB/Cache. 3. Server gửi Session ID đến client (trong Cookie). 4. Client gửi Cookie chứa Session ID trong mỗi request. 5. Server tra cứu Session ID để xác thực/ủy quyền. | **Ưu:** Dễ quản lý revocation, session state được lưu tập trung. **Nhược:** Không dễ scale (cần shared session store), dễ bị CSRF (nếu không bảo vệ), tốn tài nguyên server. |

### 🔑 Token-based Authentication

| Khái Niệm | Mô Tả | Cơ chế hoạt động | Ưu/Nhược điểm (So với Session) |
| :--- | :--- | :--- | :--- |
| **Token-based Auth** | Trạng thái người dùng được mã hóa và lưu trữ **Client-side** (trong Token), không cần lưu trữ session state trên Server. Thường dùng **JSON Web Token (JWT)**. | 1. User đăng nhập. 2. Server tạo Token (có chữ ký), chứa thông tin người dùng (payload). 3. Server gửi Token đến client. 4. Client lưu Token (localStorage, Cookie) và gửi nó trong **Authorization Header** của mỗi request. 5. Server xác minh chữ ký của Token (không cần DB lookup) để xác thực. | **Ưu:** Dễ scale (stateless), di động (dùng cho mobile, API), bảo mật hơn CSRF. **Nhược:** Khó revocation (phải chờ hết hạn), Token lớn có thể tăng overhead, cần bảo mật key/secret. |

---

## 2️⃣ Phần 2: Authentication Header và Các Loại Token

### 🏷️ Authentication Header

* **Vị trí:** Token thường được đặt trong Header của HTTP Request.
* **Định dạng phổ biến:** `Authorization: <Scheme> <credentials>`
    * **Scheme (Lược đồ):** Loại xác thực đang được sử dụng (ví dụ: `Basic`, `Bearer`).
    * **Credentials:** Thông tin xác thực (ví dụ: username:password cho Basic, Token cho Bearer).
* **Ví dụ phổ biến:**
    * `Authorization: **Basic** YWxhZGRpbjpvcGVuc2VzYW1l` (Base64-encoded username:password)
    * `Authorization: **Bearer** eyJhbGciOiJIUzI1NiI...` (Token JWT)

### ⛓️ Các Loại Token

| Loại Token | Mục đích sử dụng | Đặc điểm |
| :--- | :--- | :--- |
| **Access Token** | Cấp quyền truy cập vào tài nguyên (API) trong một khoảng thời gian giới hạn. | Được sử dụng cho mỗi request API, có thời gian sống ngắn, cần được bảo vệ nghiêm ngặt. |
| **Refresh Token** | Được dùng để lấy một **Access Token** mới khi Access Token hiện tại hết hạn. | Thời gian sống dài hơn Access Token, chỉ được gửi đến Authorization Server (IdP), không dùng để truy cập tài nguyên. |
| **ID Token** | (Đặc trưng của OpenID Connect) Là một JWT chứa thông tin về người dùng đã được xác thực (`sub`, `iss`, `aud`, v.v.). | Dùng để xác minh danh tính người dùng; không dùng để ủy quyền truy cập API. |

---

## 3️⃣ Phần 3: OAuth2 và OpenId Connect (OIDC)

### 🤝 OAuth 2.0 (Open Authorization)

* **Mục đích:** Là một **Giao thức Ủy quyền** (Authorization Protocol).
* **Vai trò:** Cho phép **Client (Ứng dụng)** truy cập tài nguyên của **Resource Server (API)** thay mặt cho **Resource Owner (Người dùng)**, mà không cần Client biết mật khẩu của Người dùng.
* **Không phải Authentication:** OAuth 2.0 **chỉ cung cấp ủy quyền** (lấy **Access Token**), không trực tiếp xác thực danh tính người dùng.

| Vai Trò | Mô Tả |
| :--- | :--- |
| **Resource Owner (RO)** | Người dùng sở hữu tài nguyên. |
| **Client** | Ứng dụng muốn truy cập tài nguyên. |
| **Authorization Server (AS)** | Server xác thực RO và cấp Token cho Client. |
| **Resource Server (RS)** | Server chứa tài nguyên cần truy cập (API). |

### 🆔 OpenID Connect (OIDC)

* **Mục đích:** Là một **Lớp Xác thực** (Authentication Layer) được xây dựng trên nền **OAuth 2.0**.
* **Vai trò:** Thêm chức năng **Xác thực** vào OAuth 2.0, cho phép Client không chỉ lấy **Access Token** mà còn lấy **ID Token** để xác minh danh tính người dùng.
* **Sự khác biệt cốt lõi:**
    * **OAuth 2.0:** **Authorization** (Ủy quyền) $\rightarrow$ Cấp **Access Token** (Được làm gì).
    * **OIDC:** **Authentication** (Xác thực) + **Authorization** $\rightarrow$ Cấp **ID Token** (Bạn là ai) và **Access Token** (Bạn được làm gì).
* **Scope quan trọng:** OIDC yêu cầu scope `openid` trong yêu cầu cấp Token.

---

## 💡 Tổng Kết & Khác Biệt Cơ Bản

| Tính năng | Session-based (Cookie) | Token-based (JWT) | OAuth2 | OIDC |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication** | ✅ | ✅ | ❌ (Chỉ ủy quyền) | ✅ (Xây dựng trên OAuth2) |
| **Authorization** | ✅ | ✅ | ✅ | ✅ |
| **Stateful (Trạng thái)** | ✅ (Server lưu Session) | ❌ (Stateless) | N/A (Giao thức ủy quyền) | N/A |
| **Dễ Scale** | ❌ (Cần Session Store chung) | ✅ | ✅ | ✅ |
| **Dùng cho Mobile/API** | ❌ (Phụ thuộc Cookie) | ✅ | ✅ | ✅ |
| **Mục đích chính** | Xác thực người dùng và duy trì trạng thái ứng dụng web truyền thống. | Xác thực và ủy quyền hiện đại, stateless, đa nền tảng. | Ủy quyền truy cập tài nguyên của bên thứ ba. | Xác thực người dùng *thông qua* bên thứ ba và lấy thông tin cơ bản. |

---

**Lưu ý:** Sự lựa chọn giữa các cơ chế phụ thuộc vào yêu cầu cụ thể của ứng dụng (ví dụ: ứng dụng web truyền thống có thể dùng Session; ứng dụng SPA/Mobile/Microservices nên dùng Token-based hoặc OIDC).