Đây là các câu hỏi ôn tập thêm về React, Web Development và Best Practices, giúp bạn củng cố kiến thức cho các vòng phỏng vấn kỹ năng.

-----

## 1\. Các câu hỏi chuyên sâu về React và Hook

### React Internals & Life Cycle

  * **Sự khác biệt giữa Component State và Redux/Global State là gì?** Khi nào nên dùng loại nào?
  * **"State Batching"** trong React là gì? Nó hoạt động như thế nào?
  * **React Fiber** là gì? Mục đích chính của nó là gì?
  * **Khái niệm "Memoization"** trong React (dùng `React.memo`, `useMemo`, `useCallback`) được sử dụng để tối ưu hóa những vấn đề gì?
  * Giải thích cơ chế **"Cleanup function"** trong `useEffect`.

### Performance & Tối ưu hóa

  * Liệt kê ít nhất ba cách để **Lazy Load** (tải không đồng bộ) các thành phần trong ứng dụng React.
  * Điều gì xảy ra khi bạn truyền một **Object** hoặc **Array** vào dependency array của `useEffect`?
  * Khi nào nên dùng **`useLayoutEffect`** thay vì `useEffect`?
  * Bạn làm gì để **tối ưu hóa việc render** của một list lớn (`1000+ items`)?

-----

## 2\. Kiến trúc & Công nghệ Web hiện đại

### Micro-frontends (MFEs)

  * Ngoài Module Federation, còn có cách nào để **nhúng (host)** một MFE vào ứng dụng chính (Shell) không?
  * Thách thức lớn nhất khi làm việc với **CSS/Styling** trong kiến trúc Micro-frontends là gì?
  * Giải thích cách bạn xử lý việc **Auth Token/Session** khi người dùng chuyển đổi giữa các MFE khác nhau.

### Web Performance (Hiệu suất Web)

  * **First Contentful Paint (FCP)** và **Largest Contentful Paint (LCP)** là gì? Làm thế nào để cải thiện chúng?
  * Giải thích khái niệm **"Tree Shaking"** và tầm quan trọng của nó trong các bundler (ví dụ: Webpack/Vite).
  * **Code Splitting** là gì? Khi nào nên áp dụng nó?

### JavaScript & TypeScript

  * Khác biệt giữa `type` và `interface` trong TypeScript?
  * **Generics** trong TypeScript được sử dụng để giải quyết vấn đề gì?
  * **Event Loop** trong JavaScript hoạt động như thế nào? (Giải thích vai trò của Call Stack, Web APIs, Callback Queue).

-----

## 3\. Best Practices (Thực tiễn tốt nhất)

### Viết Code và Testing

  * **Nguyên tắc KISS** (Keep It Simple, Stupid) và **DRY** (Don't Repeat Yourself) được áp dụng như thế nào trong React?
  * **Tầm quan trọng của Key** trong các list của React là gì? Nếu không dùng key hoặc dùng `index` làm key thì sẽ xảy ra vấn đề gì?
  * Khi viết unit test với RTL, tại sao nên ưu tiên **`getByRole`** hơn **`getByTestId`**?
  * Giải thích khái niệm **"Testing Library's Guiding Principle"** (kiểm thử theo hành vi người dùng).

### Xử lý Lỗi và Logging

  * Làm thế nào để bạn xử lý lỗi trong các component React (ví dụ: lỗi trong quá trình render)? (Gợi ý: **Error Boundaries**).
  * Bạn sử dụng công cụ nào để **giám sát hiệu suất** (Performance Monitoring) và **logging lỗi** (Error Logging) trong môi trường production?

### Design Patterns

  * Giải thích **Component Composition** (Thành phần hóa) và tại sao nó tốt hơn **Component Inheritance** (Kế thừa component) trong React.
  * Pattern **Inversion of Control** (IoC) và cách nó được áp dụng trong React (ví dụ: **Render Props** hoặc **HOCs**).

-----

## 4\. Best Practices Tổng hợp: Tóm tắt Ứng dụng React ổn định

| Khu vực | Best Practice | Mục tiêu |
| :--- | :--- | :--- |
| **State Management** | **Sử dụng Server State Manager** (React Query/SWR) cho dữ liệu server-side. Dùng Context/Zustand cho trạng thái client-side. | Giảm `useEffect` spaghetti, quản lý caching hiệu quả. |
| **Performance** | Áp dụng **Code Splitting** và **Lazy Loading** cho các route và component lớn. | Giảm kích thước bundle, cải thiện LCP. |
| **Rendering** | Sử dụng **`React.memo`**, **`useMemo`**, **`useCallback`** một cách có chọn lọc. | Ngăn chặn re-render không cần thiết. |
| **Component Design** | Ưu tiên **Composition** (sử dụng prop `children`) và **Custom Hooks** để tái sử dụng logic. | Tạo ra các component linh hoạt, dễ bảo trì. |
| **Error Handling** | Triển khai **Error Boundaries** (dùng Class Components) để bắt lỗi và hiển thị UI dự phòng. | Ngăn lỗi cục bộ làm sập toàn bộ ứng dụng. |
| **Testing** | Viết **Unit Tests** với RTL, ưu tiên kiểm tra **Hành vi** người dùng (user behavior). | Đảm bảo component hoạt động đúng như mong đợi của người dùng. |\<ctrl63\>

-----

Đây là giải thích chi tiết cho các câu hỏi của bạn về tối ưu hóa và hiệu suất trong React.

-----

## 1\. Các Cách Lazy Load (Tải không đồng bộ) trong React

**Lazy Loading** (tải không đồng bộ) là kỹ thuật chia nhỏ mã nguồn (Code Splitting) và chỉ tải các đoạn code cần thiết khi chúng được yêu cầu, giúp giảm thời gian tải ban đầu của ứng dụng.

Bạn có thể Lazy Load các thành phần (Components) hoặc các Route (trang) bằng những cách sau:

1.  **`React.lazy` và `Suspense` (Cách tiêu chuẩn cho Components):**

      * **Mục đích:** Chỉ tải code của một component khi nó chuẩn bị được render.
      * **Cách làm:** Sử dụng `React.lazy()` để bọc hàm import component. Sau đó, đặt component này bên trong `<Suspense fallback={...}>` để hiển thị UI dự phòng (ví dụ: spinner) trong khi component đang được tải.
        ```jsx
        // Tải không đồng bộ component AdminDashboard
        const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

        function App() {
          return (
            <React.Suspense fallback={<div>Đang tải...</div>}>
              <AdminDashboard />
            </React.Suspense>
          );
        }
        ```

2.  **Sử dụng Dynamic Import trong Route (Thường dùng với Router như React Router):**

      * **Mục đích:** Tải toàn bộ module (trang) chỉ khi người dùng điều hướng đến route đó.
      * **Cách làm:** Kết hợp `React.lazy` với cấu hình route để đảm bảo mỗi trang là một chunk code riêng biệt.

3.  **Tải không đồng bộ tại cấp độ Hook/Thư viện:**

      * **Mục đích:** Chỉ tải các thư viện hoặc khối code chức năng nặng khi chúng được yêu cầu lần đầu (ví dụ: khi click vào nút "Open Editor").
      * **Cách làm:** Tương tự như trên, sử dụng `import()` động trong một hàm được gọi bởi một sự kiện, sau đó lưu component đã tải vào state.

-----

## 2\. Truyền `Object` hoặc `Array` vào dependency array của `useEffect`

Khi bạn truyền một `Object` hoặc `Array` vào dependency array của `useEffect`, điều này thường dẫn đến **vòng lặp vô hạn (infinite loop)** hoặc **chạy lại không cần thiết (unnecessary re-runs)**.

### Vấn đề: So sánh tham chiếu (Reference Equality)

  * Trong JavaScript, các đối tượng và mảng là các **kiểu dữ liệu tham chiếu (reference types)**.
  * Khi component re-render, JavaScript tạo ra một **đối tượng mới** hoặc **mảng mới** cho các dependency đó (ngay cả khi nội dung bên trong không thay đổi).
  * `useEffect` chỉ so sánh tham chiếu. Vì tham chiếu mới (`{a: 1}` mới) khác tham chiếu cũ (`{a: 1}` cũ), `useEffect` kết luận dependency đã thay đổi và chạy lại callback.
  * Callback này có thể tạo ra một đối tượng/mảng mới khác, kích hoạt re-render tiếp theo, và cứ thế lặp lại.

### Cách xử lý (Best Practice)

1.  **Sử dụng `useMemo`:** Nếu đối tượng/mảng không cần thay đổi giữa các lần render, hãy bọc nó trong `useMemo` để đảm bảo nó chỉ được tạo lại khi các dependency của chính nó thay đổi.
    ```jsx
    const memoizedParams = useMemo(() => ({ userId, status: 'active' }), [userId]);
    useEffect(() => { /* fetch data */ }, [memoizedParams]); // Tham chiếu không đổi
    ```
2.  **Sử dụng `JSON.stringify()` (Chỉ khi cần thiết):** So sánh giá trị bên trong bằng cách chuyển đổi sang chuỗi (ít hiệu quả hơn vì phải thực hiện so sánh chuỗi).
3.  **Chia nhỏ dependencies:** Chỉ truyền các giá trị nguyên thủy (primitive values) cần thiết (ví dụ: `userId`, `status`) thay vì truyền toàn bộ đối tượng.

-----

## 3\. Khi nào nên dùng `useLayoutEffect` thay vì `useEffect`?

Cả hai hook đều dùng để xử lý side effects, nhưng chúng khác nhau về thời điểm thực thi trong chu trình render của trình duyệt.

| Hook | Thời điểm thực thi | Mục đích sử dụng |
| :--- | :--- | :--- |
| **`useEffect`** | Chạy **bất đồng bộ**, sau khi trình duyệt đã **vẽ (painted)** xong UI. | Xử lý các tác vụ không chặn UI: fetch data, subscriptions, cập nhật tiêu đề trang. |
| **`useLayoutEffect`** | Chạy **đồng bộ**, sau khi DOM đã được cập nhật nhưng **trước** khi trình duyệt vẽ UI lên màn hình. | Xử lý các tác vụ yêu cầu **đọc hoặc ghi layout DOM**, nơi bạn cần thay đổi DOM trước khi người dùng nhìn thấy nó. |

### Trường hợp sử dụng `useLayoutEffect` (Bắt buộc)

  * **Đo lường layout:** Khi bạn cần đo kích thước hoặc vị trí của một phần tử DOM sau khi nó được render để tính toán một giá trị mới (ví dụ: chiều cao của một modal).
  * **Tránh "Flickering" (nhấp nháy):** Nếu side effect của bạn thay đổi DOM một cách trực quan (ví dụ: đặt lại vị trí cuộn trang, thay đổi style ngay lập tức), việc sử dụng `useLayoutEffect` sẽ đảm bảo rằng sự thay đổi này được áp dụng trước khi trình duyệt vẽ, tránh hiện tượng nhấp nháy thấy được.

**Lưu ý:** Vì `useLayoutEffect` là đồng bộ và chặn quá trình vẽ UI, nó có thể làm chậm hiệu suất nếu lạm dụng. Chỉ sử dụng khi cần thiết.

-----

## 4\. Tối ưu hóa việc render của một List lớn (1000+ items)

Việc render một lượng lớn phần tử cùng một lúc sẽ làm chậm hiệu suất nghiêm trọng (gây ra tình trạng lag và drop frame). Hai kỹ thuật chính để giải quyết vấn đề này là **Virtualization** và **Memoization**.

### a) Virtualization (Windowing) - Kỹ thuật quan trọng nhất

  * **Mục đích:** Chỉ render các item **đang hiển thị** trong khung nhìn (viewport) của người dùng, thay vì render toàn bộ 1000+ item.
  * **Cách làm:**
      * Tính toán kích thước của viewport và vị trí cuộn.
      * Xác định chính xác những item nào đang hiển thị trên màn hình (ví dụ: item 50 đến 70).
      * Chỉ render những item đó. Các item còn lại được thay thế bằng các phần tử "khoảng trắng" có cùng chiều cao để duy trì vị trí cuộn chính xác.
  * **Thư viện đề xuất:** **`react-window`** hoặc **`react-virtualized`**.

### b) Memoization

  * **Mục đích:** Đảm bảo các item component riêng lẻ không bị re-render nếu props của chúng không thay đổi.
  * **Cách làm:** Bọc các component item trong **`React.memo`**.
    ```jsx
    const ListItem = React.memo(({ itemData }) => {
      // Component này chỉ render lại khi itemData thay đổi
      return <li>{itemData.name}</li>;
    });

    function LargeList({ items }) {
      return (
        <ul>
          {items.map((item) => (
            // Dùng key chính xác
            <ListItem key={item.id} itemData={item} /> 
          ))}
        </ul>
      );
    }
    ```
  * **Key:** Luôn đảm bảo bạn sử dụng một **`key`** duy nhất và ổn định cho mỗi item trong list.