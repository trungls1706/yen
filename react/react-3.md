### How many states do you manage while uploading/downloading a file?

Khi tải lên hoặc tải xuống một file, bạn cần quản lý ít nhất ba trạng thái chính:

1.  **Loading/Pending:** Trạng thái đang diễn ra, file đang được xử lý. Bạn cần hiển thị một thanh tiến trình hoặc một biểu tượng xoay (spinner) để thông báo cho người dùng.
2.  **Success:** Trạng thái thành công, file đã được tải lên hoặc tải xuống hoàn tất.
3.  **Error:** Trạng thái lỗi, có vấn đề xảy ra trong quá trình tải. Bạn cần hiển thị thông báo lỗi rõ ràng và cung cấp tùy chọn thử lại.

Bạn cũng có thể quản lý thêm trạng thái tiến trình (**Progress**) để hiển thị phần trăm hoàn thành, giúp người dùng có trải nghiệm tốt hơn.

-----

### How can you manually handle an upload/download file without using 3rd library?

#### Tải lên (Upload)

Bạn có thể dùng đối tượng **`FormData`** và API **`Fetch`** hoặc **`XMLHttpRequest`**.

1.  **`FormData`**: Tạo một đối tượng `FormData` và thêm file từ input vào.
2.  **`Fetch`**: Gửi yêu cầu `POST` tới server, đặt `body` của yêu cầu là đối tượng `FormData`.
      * Sử dụng sự kiện `onprogress` của `XMLHttpRequest` hoặc thư viện bên thứ ba để theo dõi tiến trình.

#### Tải xuống (Download)

1.  **Sử dụng thẻ `<a>`:** Cách đơn giản nhất là tạo một thẻ `<a>` với thuộc tính `href` trỏ đến URL của file và thuộc tính `download` để trình duyệt tự động tải xuống.
2.  **Sử dụng Blob:** Fetch file dưới dạng Blob, sau đó tạo một URL tạm thời cho Blob và dùng nó để tạo link tải xuống. Cách này hữu ích khi bạn muốn tải xuống một file được tạo ra ở phía client.

-----

### Các khía cạnh quan trọng và khó khăn khi xử lý tải lên/tải xuống

  * **Các khía cạnh quan trọng:**

      * **Hiển thị tiến trình:** Người dùng cần biết quá trình tải đang ở đâu.
      * **Xử lý lỗi:** Bạn phải xử lý mọi lỗi có thể xảy ra: lỗi mạng, lỗi server, lỗi hết dung lượng.
      * **Bảo mật:** Kiểm tra loại file (file type), kích thước file và quét virus ở phía server để ngăn chặn các cuộc tấn công.

  * **Khó khăn nhất:**

      * **Khả năng chịu lỗi và phục hồi:** Khi kết nối mạng bị gián đoạn, việc tiếp tục quá trình tải từ điểm dừng (resumable downloads) mà không cần bắt đầu lại là một thách thức lớn. Việc này thường yêu cầu cơ chế phức tạp ở cả client và server.

-----

### How to prevent a user from calling duplicated APIs to the server (client side + server side)

  * **Phía Client:**

      * **Debouncing/Throttling:** Chỉ cho phép hàm được gọi một lần trong một khoảng thời gian nhất định (throttling) hoặc sau khi người dùng ngừng thao tác trong một khoảng thời gian (debouncing).
      * **Trạng thái cờ (Flag State):** Sử dụng một biến cờ (ví dụ: `isLoading`) để ngăn các yêu cầu API mới trong khi yêu cầu hiện tại đang được xử lý.

  * **Phía Server:**

      * **Rate Limiting:** Hạn chế số lượng yêu cầu mà một IP hoặc người dùng có thể thực hiện trong một khoảng thời gian cụ thể.
      * **Cache:** Server có thể lưu trữ kết quả của các yêu cầu gần đây và trả về dữ liệu đã cache thay vì xử lý lại yêu cầu trùng lặp.

-----

### Quản lý API fetch quá nhiều

  * **Debouncing và Throttling:** Đây là hai kỹ thuật chính để hạn chế tần suất gọi API từ phía client.

      * **Debounce:** Hữu ích cho các trường hợp như tìm kiếm. Bạn sẽ trì hoãn việc gọi API cho đến khi người dùng ngừng gõ trong một khoảng thời gian nhất định.
      * **Throttle:** Hữu ích cho các sự kiện xảy ra liên tục như cuộn trang. Bạn sẽ giới hạn việc gọi API chỉ một lần trong một khoảng thời gian cố định.

  * **Caching:** Sử dụng thư viện như **React Query** hoặc **SWR** để cache dữ liệu. Khi một API được gọi nhiều lần với cùng tham số, thư viện sẽ trả về dữ liệu đã cache thay vì fetch lại, sau đó tự động cập nhật dữ liệu ở chế độ nền.

-----

### Critical Rendering Path là gì?

**Critical Rendering Path (CRP)** là chuỗi các bước mà trình duyệt phải thực hiện để chuyển đổi HTML, CSS và JavaScript thành các pixel trên màn hình. Mục tiêu của việc tối ưu CRP là hiển thị nội dung trang web cho người dùng nhanh nhất có thể.

Các bước chính:

1.  **DOM Tree:** Trình duyệt phân tích cú pháp HTML và xây dựng cây DOM (Document Object Model).
2.  **CSSOM Tree:** Trình duyệt phân tích cú pháp CSS và xây dựng cây CSSOM (CSS Object Model).
3.  **Render Tree:** Kết hợp DOM và CSSOM để tạo ra một cây Render Tree, chỉ bao gồm các node hiển thị.
4.  **Layout:** Tính toán vị trí và kích thước của từng phần tử trong Render Tree.
5.  **Paint:** Vẽ các pixel lên màn hình.

-----

### Tìm phần tử lớn thứ k trong mảng

Để tìm phần tử lớn thứ k trong một mảng số, bạn có thể sử dụng thuật toán **Quickselect**.

  * **Thuật toán Quickselect:**

    1.  Chọn một phần tử ngẫu nhiên làm pivot.
    2.  Phân chia mảng thành ba phần: các số nhỏ hơn pivot, các số bằng pivot, và các số lớn hơn pivot.
    3.  Kiểm tra vị trí của k:
          * Nếu k nhỏ hơn hoặc bằng số lượng các số lớn hơn pivot, tiếp tục tìm kiếm trong phần lớn hơn.
          * Nếu k nằm trong số các số bằng pivot, đó chính là kết quả.
          * Nếu không, tiếp tục tìm kiếm trong phần nhỏ hơn.

    <!-- end list -->

      * Thuật toán này có độ phức tạp trung bình là **O(n)**, nhanh hơn việc sắp xếp toàn bộ mảng (O(n log n)).

  * **Mã giả:**

    ```
    function quickselect(array, k) {
      if (array.length < k) return "Không tìm thấy"

      pivot = chọn một phần tử ngẫu nhiên
      lớn_hơn = []
      nhỏ_hơn = []

      for each element in array:
        if element > pivot:
          lớn_hơn.append(element)
        else:
          nhỏ_hơn.append(element)

      if k <= lớn_hơn.length:
        return quickselect(lớn_hơn, k)
      else if k > array.length - nhỏ_hơn.length:
        return quickselect(nhỏ_hơn, k - (array.length - nhỏ_hơn.length))
      else:
        return pivot
    ```

-----

### Vẽ hình vuông và hình tròn đồng tâm

  * **Trong HTML và CSS:**

    1.  Tạo một thẻ `div` cha để làm container.
    2.  Tạo hai thẻ `div` con cho hình vuông và hình tròn.
    3.  Đặt thuộc tính `position: relative` cho container và `position: absolute` cho hai hình con.
    4.  Sử dụng `top: 50%`, `left: 50%` và `transform: translate(-50%, -50%)` cho cả hai hình con. Điều này sẽ căn giữa chúng theo cả chiều ngang và chiều dọc trong container.
    5.  Sử dụng `border-radius: 50%` cho hình tròn.

  * **Mã ví dụ:**

    ```html
    <div class="container">
      <div class="square"></div>
      <div class="circle"></div>
    </div>

    <style>
      .container {
        width: 300px;
        height: 300px;
        position: relative;
      }
      .square {
        width: 150px;
        height: 150px;
        background-color: blue;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .circle {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
    ```