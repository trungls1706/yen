Khi thêm thuộc tính (attribute) `defer` hoặc `async` vào thẻ `<script>` trong HTML, chúng ta thay đổi cách trình duyệt (browser) tải và thực thi tập lệnh (script) JavaScript, từ đó ảnh hưởng đến hiệu suất tải trang (page load performance).

Dưới đây là giải thích chi tiết về `defer` và `async`.

## 1. Tải Script Mặc Định (Default Script Loading)

Trước hết, hãy xem cách trình duyệt xử lý thẻ `<script>` **không có** `defer` hoặc `async`:

1.  Trình duyệt bắt đầu phân tích cú pháp (parse) tài liệu HTML.
2.  Khi gặp thẻ `<script>` (ví dụ: `<script src="app.js"></script>`), việc phân tích cú pháp HTML **bị tạm dừng**.
3.  Tập lệnh được **tải xuống** (download).
4.  Tập lệnh được **thực thi** (execute).
5.  Sau khi thực thi xong, trình duyệt mới **tiếp tục** phân tích cú pháp phần còn lại của HTML.

Quá trình này có thể gây ra hiện tượng **chặn hiển thị** (render blocking), làm chậm thời gian người dùng thấy nội dung trang web.

---

## 2. Thuộc tính `async`

Thuộc tính `async` (viết tắt của *asynchronous* - bất đồng bộ) cho phép tập lệnh được tải xuống mà **không chặn** việc phân tích cú pháp HTML.

* **Tải xuống:** Bất đồng bộ với phân tích cú pháp HTML.
* **Thực thi:** Đồng bộ với phân tích cú pháp HTML, **nghĩa là nó chặn** phân tích cú pháp HTML ngay khi nó **tải xong**.
* **Thứ tự:** Không đảm bảo. Tập lệnh nào tải xong trước sẽ được thực thi trước, bất kể thứ tự của chúng trong tài liệu HTML.

### Tác dụng:
* Tốt cho các tập lệnh **độc lập**, không phụ thuộc vào các tập lệnh khác hoặc DOM (cây cấu trúc tài liệu HTML) đã được xây dựng.
* Ví dụ: Các tập lệnh bên ngoài như Google Analytics, quảng cáo.



---

## 3. Thuộc tính `defer`

Thuộc tính `defer` (trì hoãn) cũng cho phép tập lệnh được tải xuống mà **không chặn** việc phân tích cú pháp HTML.

* **Tải xuống:** Bất đồng bộ với phân tích cú pháp HTML.
* **Thực thi:** **Chỉ sau khi** toàn bộ tài liệu HTML đã được phân tích cú pháp (DOM đã sẵn sàng) và **trước** sự kiện `DOMContentLoaded`.
* **Thứ tự:** Được **đảm bảo**. Các tập lệnh có `defer` sẽ được thực thi theo đúng thứ tự xuất hiện của chúng trong HTML.

### Tác dụng:
* Tốt cho các tập lệnh **phụ thuộc** vào DOM đã sẵn sàng (ví dụ: tập lệnh thao tác với các phần tử HTML).
* Là lựa chọn ưu tiên cho các tập lệnh chính của ứng dụng.



---

## 4. Bảng So Sánh Tóm Tắt

| Thuộc tính | Tải xuống (Download) | Thực thi (Execution) | Thứ tự (Order) | Chặn Phân tích cú pháp HTML? |
| :---: | :---: | :---: | :---: | :---: |
| **Mặc định** | Đồng bộ (Chặn) | Đồng bộ (Chặn) | Đảm bảo | Có |
| **`async`** | Bất đồng bộ | Chặn khi tải xong | **Không** đảm bảo | Có (chặn tại thời điểm thực thi) |
| **`defer`** | Bất đồng bộ | Sau khi HTML được phân tích cú pháp | **Đảm bảo** | Không |