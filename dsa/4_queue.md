# 📚 Ôn Tập Lý Thuyết: Hàng Đợi (Queue) - Full Overview

## 1. Định nghĩa (Definition)
**Hàng đợi (Queue)** là một cấu trúc dữ liệu trừu tượng (ADT) hoạt động theo nguyên lý **FIFO (First In, First Out)** — *Vào trước, Ra trước*. 

Tưởng tượng như một dòng người xếp hàng mua vé: Người nào đến trước sẽ được phục vụ và rời hàng trước.



---

## 2. Các thành phần & Chỉ số quan trọng
Để quản lý một hàng đợi, chúng ta thường quan tâm đến:
* **Front:** Vị trí của phần tử đầu tiên (sẽ bị lấy ra tiếp theo).
* **Rear (hoặc Back):** Vị trí của phần tử cuối cùng (vừa mới được thêm vào).
* **Size:** Số lượng phần tử hiện có trong hàng đợi.

---

## 3. Các thao tác cơ bản & Độ phức tạp

| Thao tác | Tên gọi | Mô tả | Độ phức tạp |
| :--- | :--- | :--- | :--- |
| **Enqueue** | Thêm | Thêm phần tử vào cuối hàng đợi. | $O(1)$ |
| **Dequeue** | Xóa | Loại bỏ và trả về phần tử ở đầu hàng đợi. | $O(1)$ |
| **Peek/Front** | Xem | Xem giá trị phần tử ở đầu mà không xóa. | $O(1)$ |
| **isEmpty** | Kiểm tra | Trả về `true` nếu hàng đợi rỗng. | $O(1)$ |

---

## 4. Cài đặt Queue với JavaScript

Trong thực tế với JS, bạn có thể dùng mảng (`Array`) với các phương thức `push()` và `shift()`. Tuy nhiên, `shift()` trong JS có độ phức tạp $O(n)$. Để tối ưu $O(1)$, ta nên dùng Object hoặc Linked List.

## 5. Các biến thể của Queue
Circular Queue (Hàng đợi vòng): Tối ưu bộ nhớ bằng cách nối đuôi về đầu.

Priority Queue (Hàng đợi ưu tiên): Mỗi phần tử có độ ưu tiên, phần tử ưu tiên cao thoát hàng trước (Ví dụ: Cấp cứu trong bệnh viện).

Deque (Double-ended Queue): Cho phép thêm/xóa ở cả hai đầu.

## 6. Ứng dụng thực tế
BFS (Breadth-First Search): Thuật toán tìm kiếm theo chiều rộng trong đồ thị.

Task Scheduling: Quản lý các tiến trình đợi CPU xử lý.

Message Queues: Trong hệ thống phân tán (RabbitMQ, Kafka) để xử lý dữ liệu bất đồng bộ.

Print Spooler: Quản lý lệnh in theo thứ tự gửi đến.

Lưu ý: Trong JavaScript, nếu dùng mảng shift() cho danh sách cực lớn, hiệu năng sẽ bị giảm đáng kể. Hãy cân nhắc dùng cấu trúc Linked List hoặc Object như ví dụ trên.

### Cách 1: Sử dụng Array (Đơn giản)
```javascript
const queue = [];

// Enqueue
queue.push("User A");
queue.push("User B");

// Dequeue
const firstIn = queue.shift(); 
console.log(firstIn); // "User A"

------

class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    // Thêm phần tử vào cuối
    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
    }

    // Xóa phần tử ở đầu
    dequeue() {
        if (this.isEmpty()) return null;
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }

    peek() {
        return this.items[this.frontIndex];
    }

    isEmpty() {
        return this.backIndex - this.frontIndex === 0;
    }
}

const myQueue = new Queue();
myQueue.enqueue(1);
myQueue.enqueue(2);
console.log(myQueue.dequeue()); // 1