# 📚 Ôn Tập Lý Thuyết: Mảng (Array)

## 1. Định nghĩa (Definition)
**Mảng (Array)** là một tập hợp các phần tử có **cùng kiểu dữ liệu**, được lưu trữ liên tiếp nhau trong bộ nhớ (ô nhớ kề nhau). 

* **Chỉ số (Index):** Vị trí của phần tử trong mảng, thường bắt đầu từ `0`.
* **Phần tử (Element):** Giá trị được lưu trữ tại một chỉ số cụ thể.
* **Kích thước (Size/Length):** Tổng số phần tử mà mảng có thể chứa.



---

## 2. Đặc điểm chính
1.  **Truy cập ngẫu nhiên (Random Access):** Có thể truy cập bất kỳ phần tử nào thông qua chỉ số với độ phức tạp $O(1)$.
2.  **Kích thước cố định (Static Array):** Trong các ngôn ngữ như C/C++, kích thước mảng phải được xác định khi khai báo và không thể thay đổi khi chương trình đang chạy.
3.  **Kiểu dữ liệu đồng nhất:** Tất cả phần tử trong mảng phải cùng kiểu (ví dụ: cùng là `int`, `float`, hoặc `string`).

---

## 3. Độ phức tạp thời gian (Time Complexity)

| Thao tác | Độ phức tạp | Giải thích |
| :--- | :--- | :--- |
| **Truy cập (Access)** | $O(1)$ | Dựa vào công thức: `Địa chỉ = Địa chỉ gốc + (Chỉ số * Kích thước kiểu dữ liệu)`. |
| **Tìm kiếm (Search)** | $O(n)$ | Phải duyệt qua từng phần tử (Linear Search). |
| **Chèn (Insertion)** | $O(n)$ | Phải dịch chuyển các phần tử phía sau sang phải. |
| **Xóa (Deletion)** | $O(n)$ | Phải dịch chuyển các phần tử phía sau sang trái để lấp đầy khoảng trống. |

---

## 4. Các loại mảng phổ biến
* **Mảng một chiều:** Danh sách tuyến tính các phần tử.
* **Mảng đa chiều (ví dụ: Mảng 2 chiều):** Thường dùng để biểu diễn ma trận hoặc bảng dữ liệu (hàng và cột).
* **Mảng động (Dynamic Array):** Có thể thay đổi kích thước linh hoạt (ví dụ: `std::vector` trong C++, `ArrayList` trong Java, `list` trong Python).

---

## 5. Cú pháp cơ bản (Ví dụ C++)

### Khai báo và khởi tạo
```cpp
int arr[5] = {10, 20, 30, 40, 50}; // Mảng số nguyên 5 phần tử