Chào bạn\! Đây là thông tin chi tiết về **Indexing (Đánh Index)** trong **MongoDB** bằng tiếng Việt.

-----

## 🎯 Index trong MongoDB dùng để làm gì?

**Index** trong MongoDB (cũng như trong các hệ quản trị cơ sở dữ liệu khác) là các **cấu trúc dữ liệu đặc biệt** dùng để lưu trữ một phần dữ liệu của tập tài liệu (document) theo một thứ tự dễ duyệt (tra cứu) hơn.

  * **Tăng tốc độ truy vấn (Queries):** Mục đích chính là giúp MongoDB tìm kiếm tài liệu trong một collection một cách nhanh chóng mà không cần phải quét toàn bộ collection (tương tự như mục lục của một cuốn sách).
  * **Hỗ trợ sắp xếp (Sorting):** Index giúp các thao tác sắp xếp (sort) trở nên hiệu quả hơn.
  * **Áp đặt tính duy nhất (Uniqueness):** Có thể sử dụng index để đảm bảo rằng các giá trị trong một trường (hoặc một tổ hợp các trường) là duy nhất trên toàn collection.

-----

-----

## 📚 Các loại Index phổ biến và Ví dụ

### 1\. Index trường đơn (Single Field Index)

Đây là loại index cơ bản nhất, được tạo trên một trường duy nhất.

  * **Cú pháp:**
    ```javascript
    db.collectionName.createIndex({ "field": 1 }) // 1 cho thứ tự tăng dần, -1 cho thứ tự giảm dần
    ```
  * **Ví dụ:**
    ```javascript
    db.users.createIndex({ "email": 1 })
    ```
    Index này giúp các truy vấn tìm kiếm theo email như `db.users.find({ email: "abc@example.com" })` nhanh hơn.

### 2\. Index Hợp chất (Compound Index)

Index được tạo trên **nhiều trường** trong một tài liệu. Thứ tự của các trường trong index là **rất quan trọng**.

  * **Cú pháp:**
    ```javascript
    db.collectionName.createIndex({ "fieldA": 1, "fieldB": -1, ... })
    ```
  * **Ví dụ:** Tìm kiếm và sắp xếp các đơn hàng theo **trạng thái** (status) và sau đó theo **ngày tạo** (createdAt) giảm dần.
    ```javascript
    db.orders.createIndex({ "status": 1, "createdAt": -1 })
    ```
    Index này sẽ hỗ trợ tối ưu cho các truy vấn như:
      * `db.orders.find({ status: "Pending" }).sort({ createdAt: -1 })` (Sử dụng toàn bộ index)
      * `db.orders.find({ status: "Pending" })` (Sử dụng phần tiền tố `status`)

### 3\. Index Duy nhất (Unique Index)

Index này đảm bảo rằng không có hai tài liệu nào trong collection có **cùng giá trị** cho trường hoặc tổ hợp trường được index.

  * **Cú pháp:**

    ```javascript
    db.collectionName.createIndex({ "field": 1 }, { unique: true })
    ```

  * **Ví dụ (trường đơn):**

    ```javascript
    db.users.createIndex({ "username": 1 }, { unique: true })
    ```

    Index này đảm bảo rằng mỗi người dùng chỉ có một `username` duy nhất.

  * **Ví dụ (hợp chất duy nhất):**

    ```javascript
    db.course_registrations.createIndex({ "studentId": 1, "courseId": 1 }, { unique: true })
    ```

    Index này đảm bảo rằng một sinh viên (`studentId`) chỉ có thể đăng ký một khóa học (`courseId`) **một lần duy nhất**.

-----

## 🚀 Tối ưu Index

Việc tạo quá nhiều index sẽ làm chậm các thao tác ghi (insert, update, delete), vì MongoDB phải cập nhật tất cả các index liên quan. Cần tối ưu bằng cách:

1.  **Phân tích truy vấn (Query Analysis):**
      * Sử dụng **`db.collection.explain("executionStats")`** để xem cách MongoDB thực thi truy vấn. Tìm kiếm các truy vấn có **"COLLSCAN"** (quét toàn bộ collection) và thêm index cho các trường được dùng trong `query`, `sort`, và `projection`.
2.  **Nguyên tắc tiền tố (Prefix Rule) cho Compound Index:**
      * Một index hợp chất có thể hỗ trợ các truy vấn sử dụng bất kỳ **tiền tố** nào của index đó. Ví dụ, index `{ A: 1, B: 1, C: 1 }` hỗ trợ truy vấn trên:
          * `{ A: ... }`
          * `{ A: ..., B: ... }`
          * `{ A: ..., B: ..., C: ... }`
          * `sort({ A: ... })`
3.  **Thứ tự các trường (Order of Fields):**
      * Đặt các trường được dùng trong các **điều kiện lọc chính xác** (`equality matches`) lên đầu index.
      * Sau đó là các trường dùng trong các **điều kiện phạm vi** (`range matches`) hoặc **sắp xếp** (`sort`).
4.  **Index bao phủ (Covered Queries):**
      * Nếu index chứa **tất cả** các trường được dùng trong **truy vấn (query)** và **phép chiếu (projection)**, MongoDB có thể trả về kết quả chỉ bằng cách quét index mà không cần tìm nạp tài liệu. Điều này rất nhanh.
5.  **Index thưa (Sparse Index):**
      * Chỉ index các tài liệu có trường đó. Hữu ích cho các trường tùy chọn và giúp giảm kích thước index.

-----

## 🛠️ Use Case (Trường hợp sử dụng)

| Index Type | Use Case (Ứng dụng) |
| :--- | :--- |
| **Single-Field** | Tìm kiếm người dùng bằng `userId` hoặc `email`. |
| **Unique** | Đảm bảo tên người dùng (`username`) hoặc địa chỉ email (`email`) là duy nhất trong hệ thống. |
| **Compound** | Hiển thị danh sách các bài đăng (posts) đã được **xuất bản** (`status: "published"`) và sắp xếp theo **ngày tạo** (`createdAt`) mới nhất. |
| **Multikey** | Tìm kiếm tài liệu có chứa một giá trị cụ thể trong một trường **mảng** (array), ví dụ tìm các bài viết theo `tags`. |
| **Text** | Hỗ trợ tìm kiếm **toàn văn** (full-text search) trên nội dung tài liệu. |

-----

## ✨ Tips (Mẹo)

  * **Đánh index cho trường `_id`:** MongoDB **tự động** tạo một **Unique Index** trên trường `_id` cho mọi collection. Bạn không cần phải tự tạo.
  * **Thử nghiệm:** Luôn kiểm tra hiệu suất truy vấn của bạn với dữ liệu thực tế trên môi trường thử nghiệm (staging) trước khi áp dụng index lên môi trường sản xuất (production).
  * **Xóa index không sử dụng:** Index chiếm không gian lưu trữ và làm chậm thao tác ghi. Định kỳ kiểm tra và xóa bỏ các index không còn được sử dụng.

-----

Bạn muốn tìm hiểu sâu hơn về một loại index cụ thể (ví dụ: Text Index, Multikey Index) hay muốn xem thêm ví dụ về tối ưu hóa truy vấn bằng `explain()` không?