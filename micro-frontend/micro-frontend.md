MFEs, hay **micro-frontends**, là một kiến trúc trong phát triển web, trong đó một ứng dụng front-end lớn được chia thành nhiều ứng dụng nhỏ hơn, độc lập. Mỗi MFE có thể được phát triển, thử nghiệm và triển khai riêng biệt bởi các nhóm khác nhau, cho phép các nhóm này làm việc tự chủ và tăng tốc độ phát triển.

Việc chia sẻ trạng thái (state) giữa các MFE là một thách thức lớn, vì mục tiêu của kiến trúc này là sự độc lập. Dưới đây là một số cách tiếp cận phổ biến để giải quyết vấn đề này.

### Các phương pháp chia sẻ trạng thái

1.  **Sử dụng Global Event Bus**
    Đây là một trong những cách tiếp cận phổ biến nhất và ít phụ thuộc nhất. Một event bus là một cơ chế cho phép các MFE giao tiếp thông qua việc phát và lắng nghe các sự kiện tùy chỉnh (custom events) trên DOM hoặc thông qua một thư viện bên ngoài.
    * **Ưu điểm:** Các MFE không cần biết về nhau, chúng chỉ cần biết về các sự kiện mà chúng quan tâm. Điều này duy trì tính độc lập.
    * **Nhược điểm:** Khó theo dõi và debug khi có quá nhiều sự kiện.

2.  **Sử dụng Local Storage hoặc Session Storage**
    Đây là một phương pháp đơn giản để chia sẻ dữ liệu. Một MFE có thể lưu trạng thái vào `localStorage`, và các MFE khác có thể lắng nghe các thay đổi trên `localStorage` bằng sự kiện `storage`.
    * **Ưu điểm:** Đơn giản, dễ thực hiện, và hoạt động trên nhiều MFE khác nhau.
    * **Nhược điểm:** Chỉ lưu được dữ liệu dạng chuỗi, có thể chậm nếu dữ liệu lớn và không phù hợp với dữ liệu nhạy cảm.

3.  **Sử dụng Global State Container (Singleton Store)**
    Trong một số trường hợp, bạn có thể chia sẻ một thư viện quản lý trạng thái (như Redux, Zustand, hoặc MobX) dưới dạng một "singleton". Tức là, tất cả các MFE đều tham chiếu đến cùng một instance của store.
    * **Ưu điểm:** Cung cấp một nguồn trạng thái duy nhất, dễ dàng theo dõi và debug với các công cụ như Redux DevTools.
    * **Nhược điểm:** Gây ra sự phụ thuộc chặt chẽ giữa các MFE, làm mất đi tính độc lập. Nếu một MFE thay đổi cấu trúc của store, nó có thể ảnh hưởng đến tất cả các MFE khác.

4.  **Sử dụng URL Parameters**
    Đây là một phương pháp đơn giản nhưng hiệu quả cho các trạng thái không thường xuyên thay đổi. Bạn có thể truyền dữ liệu qua tham số URL khi chuyển từ MFE này sang MFE khác.
    * **Ưu điểm:** Rất đơn giản, không yêu cầu thêm thư viện.
    * **Nhược điểm:** Chỉ hoạt động khi điều hướng, không phù hợp cho các tương tác thời gian thực.

Lựa chọn phương pháp nào phụ thuộc vào mức độ phụ thuộc bạn muốn chấp nhận. Nếu mục tiêu là giữ các MFE hoàn toàn độc lập, các sự kiện tùy chỉnh là lựa chọn tốt nhất. 

Đây là một video cung cấp cái nhìn chi tiết hơn về cách chia sẻ dữ liệu giữa các micro front-ends bằng cách sử dụng các event.
* [Share data between Your's Micro Frontends](https://www.youtube.com/watch?v=PlvTveHGe8M)

http://googleusercontent.com/youtube_content/0

### 1. Micro-frontends (MFEs) là gì?

Micro-frontends (MFEs) là một kiến trúc trong phát triển web, trong đó một ứng dụng front-end lớn (monolith) được chia thành nhiều ứng dụng nhỏ hơn, độc lập. Mỗi MFE có thể được phát triển, thử nghiệm và triển khai riêng biệt bởi các nhóm khác nhau. Điều này cho phép các nhóm làm việc tự chủ, tăng tốc độ phát triển và giảm thiểu rủi ro khi thay đổi code.

---

### 2. Các câu hỏi thường gặp khi phỏng vấn về MFEs

1.  **Mục tiêu chính của việc áp dụng Micro-frontends là gì?**
    * **Tăng tốc độ triển khai:** Các nhóm độc lập có thể triển khai code của mình bất cứ lúc nào mà không cần chờ đợi các nhóm khác.
    * **Giảm sự phức tạp:** Chia nhỏ một ứng dụng lớn thành các phần nhỏ hơn, dễ quản lý hơn.
    * **Khả năng mở rộng:** Cho phép các nhóm làm việc độc lập với các công nghệ khác nhau (polyglot).
    * **Cải thiện khả năng chịu lỗi:** Lỗi trong một MFE ít có khả năng làm sập toàn bộ ứng dụng.

2.  **Làm thế nào để chia sẻ trạng thái (state) giữa các Micro-frontends?**
    * **Global Event Bus:** Sử dụng các sự kiện tùy chỉnh (custom events) trên DOM hoặc các thư viện để các MFE giao tiếp với nhau mà không phụ thuộc trực tiếp.
    * **Local Storage/Session Storage:** Lưu trữ dữ liệu đơn giản, không nhạy cảm. Các MFE có thể lắng nghe sự kiện `storage`.
    * **URL Parameters:** Truyền dữ liệu qua URL khi điều hướng giữa các MFE.
    * **Singleton Store:** Chia sẻ một instance của thư viện quản lý trạng thái (như Redux, Zustand) nhưng điều này làm giảm tính độc lập.

3.  **Làm thế nào để các Micro-frontends giao tiếp với nhau?**
    * **Custom Events:** Đây là cách phổ biến và tốt nhất để các MFE giao tiếp. Một MFE sẽ "phát" một sự kiện và MFE khác sẽ "lắng nghe" sự kiện đó.
    * **Pub/Sub (Publish-Subscribe):** Sử dụng các thư viện bên ngoài để quản lý các sự kiện.
    * **Routing:** Điều hướng giữa các MFE bằng cách sử dụng các framework như Single-SPA.

4.  **Bạn sẽ chọn công nghệ gì để xây dựng một kiến trúc Micro-frontends?**
    * **Single-SPA:** Một framework mạnh mẽ giúp kết hợp nhiều framework front-end (React, Vue, Angular) trên cùng một trang.
    * **Module Federation:** Một tính năng của Webpack cho phép chia sẻ code và assets giữa các ứng dụng một cách dễ dàng.
    * **Iframe:** Cách tiếp cận cũ nhưng đơn giản, mỗi MFE được nhúng vào một iframe riêng.

---

### 3. Best Practices (Thực tiễn tốt nhất) khi làm việc với MFEs

* **Độc lập là chìa khóa:** Mỗi MFE nên có khả năng phát triển, thử nghiệm và triển khai độc lập.
* **Chia sẻ thông qua APIs, không phải qua code:** Thay vì chia sẻ code giữa các MFE, hãy tạo các API hoặc thư viện dùng chung cho các chức năng chung. Điều này đảm bảo mỗi MFE có thể tự do phát triển.
* **Giao tiếp lỏng lẻo:** Sử dụng các cơ chế giao tiếp lỏng lẻo như sự kiện tùy chỉnh để tránh sự phụ thuộc chặt chẽ giữa các MFE.
* **Đảm bảo tính nhất quán của giao diện người dùng:** Mặc dù các MFE độc lập, giao diện người dùng phải nhất quán. Hãy sử dụng một hệ thống thiết kế (Design System) hoặc thư viện UI dùng chung.
* **Xử lý các vấn đề chung (common concerns):**
    * **Performance:** Sử dụng lazy loading để chỉ tải các MFE khi cần thiết.
    * **Routing:** Cần có một cơ chế routing hiệu quả để điều hướng giữa các MFE.
    * **Tùy biến (Customization):** Thiết kế các MFE sao cho có thể tùy chỉnh dễ dàng khi được nhúng vào ứng dụng chính.
* **Sử dụng công cụ phù hợp:** Lựa chọn các công cụ như **Single-SPA** hoặc **Module Federation** để quản lý quá trình kết hợp các MFE một cách hiệu quả.