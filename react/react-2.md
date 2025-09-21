### So sánh các Phương pháp Render

#### 1. Client-Side Rendering (CSR)
* **Cách hoạt động:** Trình duyệt tải một file HTML rỗng hoặc tối thiểu. Toàn bộ logic hiển thị và fetch dữ liệu được xử lý bởi JavaScript trên trình duyệt của người dùng. Giao diện được xây dựng và hiển thị sau khi JavaScript đã tải và chạy.
* **Ưu điểm:**
    * **Tương tác nhanh sau lần tải đầu:** Một khi ứng dụng đã tải, việc chuyển trang rất nhanh vì chỉ cần tải thêm dữ liệu, không phải toàn bộ trang.
    * **Giảm tải cho server:** Server chỉ cần gửi các file tĩnh (HTML, CSS, JS), không cần xử lý logic render.
* **Nhược điểm:**
    * **Thời gian tải ban đầu chậm:** Người dùng phải chờ tải tất cả các file JavaScript cần thiết trước khi thấy nội dung.
    * **SEO kém:** Google có thể gặp khó khăn trong việc crawl và index nội dung vì nội dung chưa có sẵn trong HTML ban đầu.
    * **Yêu cầu thiết bị mạnh:** Phụ thuộc vào hiệu năng của thiết bị người dùng.

---

#### 2. Server-Side Rendering (SSR)
* **Cách hoạt động:** Server xử lý logic render và tạo ra một file HTML đã có sẵn nội dung (đã có dữ liệu) cho mỗi request. Trình duyệt nhận được file HTML hoàn chỉnh và hiển thị ngay lập tức. Sau đó, JavaScript được tải và "hydrates" (kích hoạt) các thành phần React để chúng có thể tương tác.
* **Ưu điểm:**
    * **Hiệu năng ban đầu tốt:** Người dùng thấy nội dung ngay lập tức, không cần chờ JavaScript tải.
    * **SEO tốt:** Nội dung đã có sẵn trong HTML, giúp các công cụ tìm kiếm dễ dàng crawl và index.
* **Nhược điểm:**
    * **Tải trọng lớn cho server:** Server phải xử lý logic render cho mỗi request, có thể tốn tài nguyên.
    * **Độ phức tạp cao:** Việc triển khai SSR phức tạp hơn CSR.

---

#### 3. Static Site Generation (SSG)
* **Cách hoạt động:** Toàn bộ ứng dụng được render thành các file HTML, CSS và JavaScript tĩnh **tại thời điểm build**. Các file này được lưu trữ trên một CDN (Content Delivery Network). Khi người dùng yêu cầu, CDN sẽ phân phát file tĩnh đã được render sẵn.
* **Ưu điểm:**
    * **Tốc độ cực nhanh:** Vì các trang đã được render sẵn, người dùng nhận được nội dung gần như ngay lập tức.
    * **Bảo mật:** Không có logic phía server tại thời điểm runtime, giảm thiểu các lỗ hổng bảo mật.
    * **SEO tuyệt vời:** Nội dung có sẵn, rất thân thiện với các công cụ tìm kiếm.
* **Nhược điểm:**
    * **Không phù hợp với dữ liệu thay đổi thường xuyên:** Mọi thay đổi về dữ liệu đều yêu cầu phải build lại toàn bộ trang web.
    * **Cần một quá trình build:** Phải có một bước build để tạo ra các file tĩnh.

| **Phương pháp** | **Tốc độ ban đầu** | **Trải nghiệm người dùng** | **SEO** |
| :--- | :--- | :--- | :--- |
| **CSR** | Chậm (Phải tải JS) | Nhanh (sau khi tải) | Kém |
| **SSR** | Nhanh (Nội dung có sẵn) | Khá nhanh | Tốt |
| **SSG** | Cực nhanh | Nhanh nhất | Tuyệt vời |

---

### Kiến thức về Node.js

Node.js là một môi trường runtime JavaScript mã nguồn mở và đa nền tảng, cho phép bạn chạy mã JavaScript ở phía server. Nó sử dụng V8 JavaScript engine của Google Chrome.

* **Lý do phổ biến:**
    * **Non-blocking, Asynchronous I/O (Bất đồng bộ không chặn):** Node.js xử lý các tác vụ I/O (như đọc/ghi file, request mạng) một cách bất đồng bộ, giúp nó xử lý hàng ngàn kết nối đồng thời một cách hiệu quả mà không bị chặn.
    * **Single-threaded:** Node.js chạy trên một luồng duy nhất, nhưng nó sử dụng một kiến trúc event loop để quản lý các hoạt động bất đồng bộ, giúp nó vẫn rất hiệu quả.
    * **Hệ sinh thái NPM:** Node Package Manager (NPM) là kho lưu trữ các thư viện lớn nhất thế giới, giúp bạn dễ dàng sử dụng và chia sẻ code.

* **Ứng dụng:** Node.js thường được sử dụng để xây dựng các ứng dụng web theo thời gian thực (real-time), API RESTful, và các microservices.

---

### Server Components

**Server Components** là một tính năng mới của React, cho phép bạn viết các component được render hoàn toàn ở phía server, không cần JavaScript ở phía client.

* **Cách hoạt động:**
    * **Không có JS ở phía client:** Các Server Components không có `useState`, `useEffect` hay bất kỳ state và logic tương tác nào.
    * **Phân phối trên Server:** Chúng được render thành HTML ở phía server và gửi đến trình duyệt.
    * **Tích hợp với Client Components:** Bạn có thể kết hợp Server Components với Client Components để tạo ra các trang web mạnh mẽ. Client Components sẽ được "hydrates" và xử lý các tương tác. 
* **Ưu điểm:**
    * **Hiệu năng tốt:** Giảm đáng kể lượng JavaScript cần tải xuống, cải thiện tốc độ tải trang ban đầu.
    * **SEO và Social Sharing tốt:** Vì nội dung được render trên server, nó luôn có sẵn cho các công cụ tìm kiếm và trình duyệt.
    * **Bảo mật:** Dữ liệu nhạy cảm có thể được truy cập và xử lý trên server mà không bị lộ ra phía client.
    * **Cải thiện trải nghiệm người dùng:** Các trang web cảm thấy nhanh hơn và mượt mà hơn.