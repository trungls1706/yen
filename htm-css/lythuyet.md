# Vòng đời (Life Cycle) của một trang HTML trong trình duyệt 🌐

HTML bản thân là ngôn ngữ đánh dấu tĩnh, không có "life cycle" như các framework component. Tuy nhiên, một **trang HTML** khi được trình duyệt tải và hiển thị sẽ trải qua một chuỗi các giai đoạn xử lý chính.

---

## 🌀 Các Giai đoạn chính

### 1. Loading (Tải về)
* **Request:** Trình duyệt gửi **HTTP request** đến máy chủ (server).
* **Response:** Máy chủ phản hồi, gửi về file **HTML**.
* Trình duyệt bắt đầu tải các tài nguyên liên quan như **CSS, JS, hình ảnh, fonts**, v.v.

---

### 2. Parsing (Phân tích cú pháp)
* **Đọc HTML:** Trình duyệt đọc file HTML từ trên xuống dưới.
* **Xây dựng DOM:** Tạo **DOM Tree** (**D**ocument **O**bject **M**odel) từ các thẻ HTML.
* **Xây dựng CSSOM:** Tải và xử lý CSS để tạo **CSSOM Tree** (**C**SS **O**bject **M**odel).
* **Render Tree:** Kết hợp **DOM** và **CSSOM** để tạo ra **Render Tree** (cây chỉ chứa các phần tử sẽ được hiển thị).

---

### 3. Scripting (Chạy JavaScript)
* Khi trình duyệt gặp thẻ `<script>`:
    * **Mặc định:** Trình duyệt sẽ **dừng parsing** HTML, tải và thực thi JS, sau đó mới tiếp tục parse HTML. (Điều này có thể gây chặn hiển thị).
    * **`defer`:** Script được tải song song nhưng sẽ chỉ chạy **sau khi HTML đã parse xong** (trước sự kiện `DOMContentLoaded`).
    * **`async`:** Script được tải song song và có thể thực thi **ngay khi sẵn sàng**, không cần chờ parsing HTML hoàn tất.

---

### 4. Rendering (Vẽ ra màn hình)
* **Layout/Reflow:** Trình duyệt tính toán **vị trí và kích thước** chính xác của từng phần tử dựa trên Render Tree.
* **Painting:** Vẽ các **pixel** nội dung, màu sắc, viền, v.v., ra màn hình.
* **Compositing:** Ghép các layer lại với nhau để tạo thành giao diện hoàn chỉnh cuối cùng.

---

### 5. Interactivity (Tương tác)
* Sau khi DOM sẵn sàng, **JavaScript** bắt đầu can thiệp (ví dụ: thêm **event listener**, thay đổi style, thao tác DOM).
* **Cập nhật:** Khi người dùng click, nhập dữ liệu, hoặc JS thay đổi trạng thái, trình duyệt sẽ cập nhật giao diện (thực hiện lại **repaint** hoặc **reflow**).

---

## 🔑 Các Sự kiện Vòng đời (Lifecycle Events) quan trọng

| Sự kiện | Mô tả |
| :--- | :--- |
| `DOMContentLoaded` | Kích hoạt khi **DOM Tree được xây dựng xong**. CSS và hình ảnh có thể chưa tải xong. |
| `load` | Kích hoạt khi **toàn bộ trang** (HTML, CSS, JS, hình ảnh, v.v.) đã **tải và xử lý xong** hoàn toàn. |
| `beforeunload` | Kích hoạt ngay **trước khi user rời khỏi trang** (đóng tab/chuyển trang). |
| `unload` | Kích hoạt khi user **đóng hoặc chuyển trang**. |

---

## 👉 Tóm gọn Chu trình
**Request** $\rightarrow$ **Parse HTML** $\rightarrow$ **Build DOM & CSSOM** $\rightarrow$ **Render** $\rightarrow$ **Execute JS** $\rightarrow$ **Interact** $\rightarrow$ **Unload**