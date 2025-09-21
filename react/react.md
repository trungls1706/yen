### React Hooks: Câu hỏi và trả lời

---

### What is `useEffect`? When to use it?

`useEffect` là một React Hook cho phép bạn thực hiện các **side effects** (tác dụng phụ) trong các function component. Side effects là những hoạt động tương tác với thế giới bên ngoài component của bạn, như fetching data, đăng ký sự kiện, hoặc cập nhật DOM.

Bạn nên sử dụng `useEffect` khi cần đồng bộ hóa component của mình với một hệ thống bên ngoài. Ví dụ:
-   **Tải dữ liệu:** Fetch data từ một API.
-   **Subscriptions:** Đăng ký nhận tin nhắn từ một WebSocket.
-   **Cập nhật DOM thủ công:** Thay đổi title của trang.

---

### When does `useEffect` get triggered?

`useEffect` được gọi **sau khi render** và sau khi DOM đã được cập nhật. Thời điểm kích hoạt của nó được kiểm soát bởi **dependency array** (mảng phụ thuộc):
-   **Không có mảng phụ thuộc:** Chạy sau **mỗi lần render**. (Không khuyến khích vì có thể gây ra vòng lặp vô hạn).
-   **Mảng phụ thuộc rỗng (`[]`):** Chạy **một lần** duy nhất khi component được mount (lần đầu tiên component xuất hiện trên màn hình).
-   **Mảng phụ thuộc có giá trị (`[prop1, state2]`):** Chạy sau render **chỉ khi** một trong các giá trị trong mảng này thay đổi.

---

### What is the difference between `useMemo` and `useCallback`?

Cả hai hook này đều dùng để tối ưu hiệu suất bằng cách lưu trữ kết quả của một phép tính hoặc một hàm, ngăn chúng bị tạo lại trên mỗi lần render.
-   **`useMemo`:** Dùng để **lưu trữ giá trị**. Nó chỉ tính toán lại giá trị đó khi các dependency thay đổi.
-   **`useCallback`:** Dùng để **lưu trữ hàm**. Nó trả về một hàm đã được ghi nhớ và chỉ tạo lại hàm đó khi các dependency thay đổi.

Nói một cách đơn giản, `useMemo` trả về một **giá trị**, còn `useCallback` trả về một **hàm**.

---

### What is `forwardRef`? And why was it created?

`forwardRef` là một hàm cho phép bạn **truyền một ref** từ component cha đến một DOM element hoặc component con.
-   **Tại sao nó được tạo ra?** Theo mặc định, ref không thể được truyền qua một component. `forwardRef` phá vỡ quy tắc này một cách an toàn, cho phép bạn truy cập DOM node của component con từ bên ngoài. Điều này đặc biệt hữu ích cho các component thư viện hoặc các component tái sử dụng.

---

### How to Prevent UI Flicker in ReactJS?

UI flicker (nháy giao diện) thường xảy ra khi dữ liệu được tải không đồng bộ. Để ngăn chặn điều này, bạn có thể:
1.  **Sử dụng trạng thái loading:** Hiển thị một **skeleton screen** hoặc một **loading indicator** trong khi dữ liệu đang được fetch.
2.  **Sử dụng Conditional Rendering:** Chỉ render component sau khi dữ liệu đã được tải.
3.  **Hạn chế các request không cần thiết:** Tận dụng `useEffect` với dependency array để ngăn việc fetch lại dữ liệu sau mỗi lần render.

---

### How to manage states in ReactJS / Why and when to use the context api?

-   **Quản lý trạng thái:**
    -   **`useState`:** Sử dụng cho các trạng thái đơn giản, cục bộ.
    -   **Lifting State Up:** Di chuyển trạng thái lên component cha gần nhất để chia sẻ giữa các component con.
    -   **`useReducer`:** Quản lý các trạng thái phức tạp với nhiều logic chuyển đổi.

-   **`Context API`:**
    -   **Tại sao sử dụng?** `Context API` giúp bạn truyền dữ liệu qua cây component mà không cần phải truyền props xuống từng cấp (prop drilling).
    -   **Khi nào sử dụng?** Dùng cho các trạng thái mang tính **global** như thông tin người dùng, cài đặt theme, hoặc ngôn ngữ.

---

### Why and when to use a state management library?

-   **Tại sao?** Các thư viện như Redux, Zustand, hoặc MobX được sử dụng để quản lý các trạng thái **phức tạp và global** trong các ứng dụng lớn. Chúng cung cấp các công cụ để theo dõi, debug và đồng bộ hóa trạng thái một cách có tổ chức hơn.

-   **Khi nào?**
    -   Khi ứng dụng của bạn có nhiều component cần truy cập cùng một trạng thái.
    -   Khi logic thay đổi trạng thái trở nên quá phức tạp.
    -   Khi bạn cần các công cụ mạnh mẽ để debug các thay đổi trạng thái (như Redux DevTools).

---

### What are the best practices for using React hooks?

-   **Tuân thủ các quy tắc của Hooks:** Chỉ gọi Hooks ở cấp cao nhất của function component hoặc custom hooks.
-   **Sử dụng dependency array:** Luôn thêm dependency array vào `useEffect`, `useMemo` và `useCallback` để tránh các side effects không mong muốn và cải thiện hiệu suất.
-   **Tạo custom hooks:** Tái sử dụng logic trạng thái bằng cách tạo custom hooks.

---

### Is the React component triggered right away after the `setState` is invoked?

Không. `setState` là một thao tác **bất đồng bộ (asynchronous)**. React sẽ nhóm các lệnh cập nhật trạng thái lại với nhau để tối ưu hóa hiệu suất và chỉ re-render component một lần. Component sẽ được kích hoạt lại sau khi tất cả các cập nhật trạng thái trong một chu kỳ sự kiện đã được xử lý.

---
### `setState` và Re-render

Không, React component **không được kích hoạt (triggered) ngay lập tức** sau khi `setState` được gọi.

`setState` trong React là một thao tác **bất đồng bộ (asynchronous)**. React sẽ nhóm các lệnh cập nhật trạng thái lại với nhau để tối ưu hóa hiệu suất và chỉ re-render component một lần duy nhất. Thay vì cập nhật DOM ngay lập tức, React lên lịch cho việc cập nhật và xử lý chúng trong một chu kỳ sự kiện (event loop).

Việc này giúp tránh các lần re-render không cần thiết và cải thiện hiệu suất, đặc biệt khi có nhiều thay đổi trạng thái xảy ra cùng một lúc.

***

### Scheduled callbacks có phải là bất đồng bộ không?

Có, các scheduled callbacks trong React là **bất đồng bộ**.

Khi bạn gọi một hàm để cập nhật trạng thái (ví dụ: `setState`), React sẽ không thực thi hàm đó ngay lập tức. Nó sẽ đặt hàm này vào một hàng đợi (queue) và chờ cho đến khi tất cả các thay đổi trạng thái khác được xử lý xong. Điều này cho phép React gộp nhiều bản cập nhật lại thành một lần re-render duy nhất.

Tính chất bất đồng bộ này là lý do tại sao bạn không thể dựa vào trạng thái mới ngay sau khi gọi `setState`. Nếu bạn cần thực hiện một hành động sau khi trạng thái đã được cập nhật, bạn nên sử dụng `useEffect` hoặc một callback được cung cấp bởi `setState` (nếu có).
---


### What is shallow comparison?

Shallow comparison là một kỹ thuật so sánh hai đối tượng chỉ kiểm tra các thuộc tính ở cấp độ đầu tiên.
-   Nó so sánh **giá trị** của các thuộc tính nguyên thủy (số, chuỗi, boolean).
-   Nó chỉ so sánh **tham chiếu** của các đối tượng hoặc mảng, không so sánh nội dung bên trong.
-   Kỹ thuật này được sử dụng trong `React.memo` để quyết định xem có nên re-render một component hay không.

---

### How do you configure linters and when to run them in your project?

-   **Cấu hình Linters:** Bạn cấu hình ESLint bằng cách tạo một file `.eslintrc.json` trong thư mục gốc của dự án.
-   **Thời điểm chạy:**
    -   **Trong quá trình phát triển:** Chạy tự động trong trình chỉnh sửa code (editor) của bạn.
    -   **Trước khi commit code:** Tích hợp vào Git hooks để tự động kiểm tra code trước khi bạn commit.
    -   **Trong quá trình CI/CD:** Chạy linter như một phần của pipeline CI/CD để đảm bảo mọi code được đẩy lên đều tuân thủ các quy tắc.

### So sánh `useState` và `useRef`

| Tiêu chí | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Mục đích** | Quản lý **state** của component. Khi state thay đổi, component sẽ re-render. | Lưu trữ một **giá trị** có thể thay đổi nhưng **không gây re-render** component khi giá trị đó thay đổi. |
| **Re-render** | **Có.** Khi bạn gọi hàm `setState`, React sẽ lên lịch re-render component. | **Không.** Thay đổi giá trị `.current` của `useRef` không kích hoạt re-render. |
| **Sử dụng** | Quản lý dữ liệu thay đổi trên UI (đếm số lần click, dữ liệu form). | - Truy cập trực tiếp DOM element. <br> - Lưu trữ các giá trị không cần cập nhật UI (ví dụ: ID của timer, giá trị trước đó của state). |

-----

### Các Hooks của React

React cung cấp một bộ các Hooks cơ bản và nâng cao để giúp bạn quản lý state và side effects trong function components.

#### Hooks cơ bản

  - `useState`: Thêm state vào function component.
  - `useEffect`: Thực hiện các side effects sau khi component render.
  - `useContext`: Truy cập giá trị từ Context.

#### Hooks bổ sung

  - `useReducer`: Một lựa chọn thay thế cho `useState` để quản lý state phức tạp.
  - `useCallback`: Lưu trữ (memoize) một hàm để tránh tạo lại hàm đó trong mỗi lần render.
  - `useMemo`: Lưu trữ (memoize) một giá trị để tránh tính toán lại không cần thiết.
  - `useRef`: Truy cập DOM element hoặc lưu trữ một giá trị không thay đổi giữa các lần render mà không gây re-render.
  - `useLayoutEffect`: Chạy đồng bộ sau khi tất cả các thay đổi DOM đã được tính toán.
  - `useImperativeHandle`: Tùy chỉnh các hàm có thể truy cập từ `ref` của component con.
  - `useDebugValue`: Hiển thị một nhãn trong React DevTools cho custom hooks.

-----

### `useEffect` không có dependencies hoặc không có `[]`

Khi bạn sử dụng `useEffect` **mà không cung cấp dependency array**, nó sẽ chạy **sau mỗi lần render** của component.

Ví dụ:

```javascript
useEffect(() => {
  // Đoạn code này sẽ chạy sau mỗi lần component re-render.
});
```

Điều này có thể rất nguy hiểm và thường gây ra **vòng lặp vô hạn (infinite loop)**. Nếu side effect bên trong `useEffect` thay đổi state, nó sẽ kích hoạt một lần re-render, và lại chạy `useEffect`, lại thay đổi state, và cứ thế lặp đi lặp lại.

Ngược lại, khi bạn sử dụng `[]` (mảng rỗng) làm dependency array, `useEffect` sẽ **chỉ chạy một lần** duy nhất khi component được mount.

```javascript
useEffect(() => {
  // Đoạn code này chỉ chạy MỘT LẦN khi component được mount.
}, []);
```

Đây là cách phổ biến để thực hiện các thao tác chỉ cần chạy một lần, như fetching data ban đầu.

React Query là một thư viện mạnh mẽ để xử lý các tác vụ liên quan đến fetching, caching, đồng bộ hóa và cập nhật dữ liệu server-side trong ứng dụng React.

### Cách xử lý Data và Networking với React Query

React Query quản lý các tác vụ xử lý dữ liệu (networking) và trạng thái của server (server state) bằng cách cung cấp các hook mạnh mẽ.

#### 1\. Caching

React Query tự động cache dữ liệu đã fetch, giúp giảm số lượng network request. Khi bạn truy vấn một dữ liệu đã được cache, React Query sẽ trả về dữ liệu đó ngay lập tức, sau đó, ở chế độ nền, nó sẽ re-fetch dữ liệu mới để đảm bảo tính đồng bộ (stale-while-revalidate).

  * **Tùy chỉnh cache:** Bạn có thể cấu hình thời gian dữ liệu được coi là "cũ" (staleTime) và thời gian dữ liệu bị xóa khỏi cache (cacheTime) để phù hợp với nhu cầu của ứng dụng.

#### 2\. Xử lý Data

React Query cung cấp một loạt các hook để xử lý các tác vụ dữ liệu.

  * **`useQuery`**: Đây là hook chính để **fetching data**. Nó trả về một đối tượng chứa trạng thái của request (`isLoading`, `isError`, `data`), cho phép bạn dễ dàng xử lý các trạng thái loading và error.
  * **`useMutation`**: Dùng để thực hiện các tác vụ thay đổi dữ liệu trên server, như **thêm, xóa, hoặc cập nhật** (POST, PUT, DELETE). `useMutation` cho phép bạn quản lý các trạng thái của request và thực hiện các tác vụ phụ sau khi request thành công hoặc thất bại.
  * **Invalidation**: React Query tự động cập nhật dữ liệu đã fetch sau khi `useMutation` thành công.

### Ví dụ về `useQuery` và `useMutation`

**1. Fetching Data với `useQuery`**

```javascript
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

function ProductsList() {
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

-----

**2. Updating Data với `useMutation`**

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addProduct = async (newProduct) => {
  const { data } = await axios.post('/api/products', newProduct);
  return data;
};

function AddProductForm() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // Vô hiệu hóa cache của 'products' để kích hoạt re-fetch
      queryClient.invalidateQueries({ queryKey: ['products'] }); 
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ name: 'New Product' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}
```

### Cách Optimize React

Bên cạnh React Query, có nhiều cách để tối ưu hóa hiệu suất của một ứng dụng React.

#### 1\. Sử dụng Memoization

Sử dụng **`React.memo`**, **`useMemo`** và **`useCallback`** để ngăn chặn việc re-render không cần thiết của component và các hàm.

  * **`React.memo`**: Bọc một component xung quanh `React.memo` để chỉ re-render khi props của nó thay đổi.
  * **`useCallback`**: Đảm bảo các hàm callback không bị tạo lại trên mỗi lần render, hữu ích khi truyền hàm xuống component con được bọc bởi `React.memo`.
  * **`useMemo`**: Tránh tính toán lại các giá trị phức tạp không cần thiết.

#### 2\. Lazy Loading (Tải không đồng bộ)

Sử dụng **`React.lazy`** và **`Suspense`** để chia nhỏ code base của bạn thành các đoạn nhỏ hơn. Điều này giúp giảm thời gian tải ban đầu bằng cách chỉ tải các thành phần cần thiết khi chúng được render.

#### 3\. Phân tích hiệu suất

Sử dụng công cụ **React Developer Tools Profiler** để xác định các thành phần đang re-render quá nhiều hoặc chậm, giúp bạn dễ dàng tìm ra điểm nghẽn.