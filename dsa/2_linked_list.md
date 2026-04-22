# 📚 Ôn Tập Cấu Trúc Dữ Liệu: Danh Sách Liên Kết (Linked List)

## 1. Định nghĩa & Thành phần
**Linked List** là một cấu trúc dữ liệu tuyến tính, trong đó các phần tử (Node) không nằm kế tiếp nhau trong bộ nhớ mà kết nối với nhau thông qua **con trỏ (pointer)**.

Mỗi **Node** gồm 2 phần chính:
* **Data**: Lưu trữ giá trị (int, string, object...).
* **Next**: Lưu địa chỉ của Node kế tiếp. Nếu là Node cuối, Next sẽ trỏ vào `NULL`.

---

## 2. Phân loại Linked List
1.  **Singly Linked List (Đơn):** Duyệt một chiều từ đầu đến cuối.
2.  **Doubly Linked List (Đôi):** Mỗi Node có thêm con trỏ `prev` trỏ về Node phía trước. Duyệt được 2 chiều.
3.  **Circular Linked List (Vòng):** Node cuối trỏ về Node đầu, tạo thành một vòng khép kín.

---

## 3. Độ phức tạp thời gian (Time Complexity)

| Thao tác | Mảng (Array) | Danh sách liên kết |
| :--- | :--- | :--- |
| **Truy cập (Access)** | $O(1)$ | $O(n)$ |
| **Tìm kiếm (Search)** | $O(n)$ | $O(n)$ |
| **Chèn/Xóa ở đầu** | $O(n)$ | $O(1)$ |
| **Chèn/Xóa ở cuối** | $O(1)$ | $O(n)$ (hoặc $O(1)$ nếu có Tail) |
| **Chèn/Xóa ở giữa** | $O(n)$ | $O(n)$ |

---

## 4. Các thao tác cơ bản (C++ Example)

### Định nghĩa Node
```cpp
struct Node {
    int data;
    Node* next;
    
    Node(int val) {
        data = val;
        next = NULL;
    }
};