# React Senior Quick Review


- 👉 **Đây là 3 nhóm chính thường bị hỏi khi vào vòng React senior:**
  - Tối ưu bundle.
  - Hiểu reconciliation (cách React hoạt động).
  - Biết dùng tool đo performance.

## 1. OPTIMIZED (Tối ưu hiệu năng)
- **Rendering**
  - Tránh re-render không cần thiết: `React.memo`, `useMemo`, `useCallback`.
  - List lớn → virtualization (`react-window`, `react-virtualized`).
  - Code splitting + Lazy load (`React.lazy`, `Suspense`).
- **Bundle**
  - Tree-shaking, dynamic import.
  - Giảm dependency không cần thiết.
- **Reconciliation**
  - Hiểu key trong list.
  - Batching updates (React 18: concurrent rendering).
- **Performance Tools**
  - React Profiler, Lighthouse.

---

## 2. DEBUG (Gỡ lỗi)
- **Tools**
  - Chrome DevTools (breakpoint, network, performance).
  - React DevTools (component tree, props, state).
  - Redux DevTools (time travel, action trace).
- **Techniques**
  - Console.log thông minh (group, table).
  - Error boundaries → bắt UI crash.
  - Debug async: `async/await` + try/catch.
- **Monitoring**
  - Log server (Winston, ELK).
  - Client monitoring (Sentry, Datadog).

---

## 3. NETWORK (Mạng & API)
- **REST API**
  - CRUD, query params, headers, status codes.
  - Retry logic (exponential backoff).
  - Timeout & abort controller.
- **State Management**
  - `React Query`, `RTK Query`, `SWR` (cache, stale-while-revalidate).
  - Global state vs server state.
- **Realtime**
  - WebSocket, SSE (Server-Sent Events), SignalR.
- **HTTP Concepts**
  - CORS, Cookies, Token (JWT, OAuth2).
  - HTTP/1.1 vs HTTP/2 vs HTTP/3.
  - Cache-Control, ETag.

---

## 4. WEB (Kiến thức nền tảng Web)
- **JavaScript Core**
  - Event loop, async/await, closures, hoisting.
  - ES6+: destructuring, spread/rest, promises.
- **DOM & Browser**
  - DOM API, Event bubbling/capturing.
  - LocalStorage, SessionStorage, IndexedDB.
- **Security**
  - XSS, CSRF, CORS, HTTPS.
  - Same-origin policy.
- **Accessibility (A11y)**
  - WCAG basics, semantic HTML.
  - ARIA attributes.
- **Responsive**
  - CSS Flex/Grid, media queries.
  - Mobile-first design.
- **Build Tools**
  - Webpack, Vite, Babel.
  - CI/CD basics.

---


### Tree Shaking là gì?

**Tree Shaking** là một kỹ thuật tối ưu hóa mã nguồn (Code Optimization) được sử dụng trong quá trình build JavaScript (thường là bởi các module bundler như Webpack, Rollup, hoặc Vite).

Mục tiêu của Tree Shaking là **loại bỏ mã chết (Dead Code)** khỏi bundle cuối cùng, giúp giảm kích thước file JavaScript gửi đến trình duyệt, từ đó cải thiện tốc độ tải trang và hiệu suất ứng dụng.

-----

### 1\. Cách thức hoạt động

Thuật ngữ "Tree Shaking" (rung cây) đến từ hình ảnh một cây cấu trúc module:

  * **Tree:** Biểu diễn các module và dependency của ứng dụng.
  * **Shaking:** Quá trình "rung" cây để loại bỏ các nhánh cây (các đoạn code) không được sử dụng.

Quá trình này chỉ hoạt động hiệu quả với các module được viết bằng cú pháp **ES Modules (`import` và `export`)**.

1.  **Phân tích tĩnh (Static Analysis):** Bundler sử dụng cú pháp `import`/`export` để xác định chính xác những hàm hoặc biến nào được module khác sử dụng. Vì cú pháp ES Modules là tĩnh (không thay đổi khi runtime), bundler có thể biết được những gì được import và export mà không cần chạy code.
2.  **Đánh dấu (Marking):** Các đoạn code không bao giờ được import, gọi, hoặc sử dụng trong ứng dụng sẽ được đánh dấu là "dead code".
3.  **Loại bỏ (Elimination):** Ở bước cuối cùng của quá trình minification (nén code), dead code sẽ bị xóa hoàn toàn khỏi file JavaScript đầu ra.

-----

### 2\. Ví dụ minh họa

Giả sử bạn có một thư viện utility:

```javascript
// utils.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) { // Hàm này không được sử dụng
  return a - b;
}
```

Và bạn chỉ sử dụng hàm `add` trong ứng dụng chính:

```javascript
// main.js
import { add } from './utils';

console.log(add(1, 2));
```

**Kết quả sau Tree Shaking:**
Hàm `subtract` sẽ bị xóa hoàn toàn khỏi bundle cuối cùng, vì công cụ build đã xác định rằng không có bất kỳ đoạn code nào gọi hoặc import hàm này.

-----

### 3\. Tầm quan trọng (Tại sao Tree Shaking lại cần thiết?)

  * **Giảm kích thước bundle:** Đây là lợi ích lớn nhất. Giảm kích thước file JavaScript làm giảm thời gian tải xuống và thời gian xử lý script.
  * **Cải thiện LCP (Largest Contentful Paint):** Tải script nhanh hơn giúp trình duyệt hiển thị nội dung chính nhanh hơn.
  * **Giảm chi phí băng thông:** Đặc biệt quan trọng đối với người dùng có kết nối mạng chậm hoặc sử dụng dữ liệu di động.
  * **Code sạch hơn:** Giúp các thư viện lớn như Lodash, Three.js trở nên hữu ích hơn mà không làm phồng kích thước bundle của bạn, vì bạn chỉ trả giá cho những gì bạn thực sự sử dụng.

### 4\. Best Practice để đảm bảo Tree Shaking hoạt động

1.  **Sử dụng cú pháp ES Modules:** Luôn dùng `import` và `export` thay vì `require()`/`module.exports` (cú pháp CommonJS).
2.  **Import chính xác:** Thay vì import toàn bộ thư viện, hãy chỉ import những gì bạn cần (Named Imports):
      * **Nên dùng:** `import { someFunction } from 'mylib';`
      * **Không nên dùng:** `import * as mylib from 'mylib';` (Điều này có thể làm khó khăn cho Tree Shaking).
3.  **Side-Effect Free Modules:** Đảm bảo các file thư viện của bạn được đánh dấu là "side-effect free" trong file `package.json` bằng cách thêm thuộc tính `"sideEffects": false`. Điều này cho phép bundler tự tin xóa các file không được sử dụng mà không lo làm hỏng ứng dụng.

----

### Batching Updates (React 18: Concurrent Rendering)

**Batching Updates** là cơ chế của React dùng để gộp nhiều lần cập nhật trạng thái (`setState`, `useReducer`) lại thành **một lần re-render duy nhất** để tối ưu hóa hiệu suất.

Mục tiêu chính là tránh các lần tính toán và cập nhật DOM không cần thiết, làm giảm tải cho trình duyệt và giúp ứng dụng phản hồi nhanh hơn.

-----

### 1\. Sự khác biệt giữa React 17 và React 18

React 18 đã mở rộng tính năng Batching sang chế độ **tự động (Automatic Batching)** nhờ vào kiến trúc **Concurrent Rendering**.

| Tiêu chí | React 17 (Legacy) | React 18 (Concurrent) |
| :--- | :--- | :--- |
| **Phạm vi Batching** | **Batching thủ công.** Chỉ xảy ra bên trong các **trình xử lý sự kiện DOM** của React (ví dụ: `onClick`, `onChange`). | **Automatic Batching.** Xảy ra ở **mọi nơi** theo mặc định. |
| **Bất đồng bộ** | **Không batch** các tác vụ bất đồng bộ (ví dụ: `setTimeout`, Promises, native event handlers). | **Tự động batch** các tác vụ bất đồng bộ. |
| **Ví dụ** | Phải gọi `ReactDOM.unstable_batchedUpdates()` thủ công để batch bên ngoài event handler. | Tự động batch tất cả `setState` mà không cần code bổ sung. |

-----

### 2\. Automatic Batching trong React 18

Trong React 18, nếu bạn có nhiều lần gọi `setState` xảy ra trong cùng một sự kiện, React sẽ đảm bảo tất cả chúng được xử lý **trong cùng một lần re-render**.

#### Ví dụ Code (So sánh)

**Mã nguồn chung:**

```jsx
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);

function handleClick() {
  setCount(c => c + 1); // Lần setState 1
  setFlag(f => !f);    // Lần setState 2
  // ... có thể có nhiều lần gọi setState nữa
}
// VÀ LÚC NÀY, CẢ HAI SẼ ĐƯỢC BATCH VÀO 1 LẦN RENDER.
```

| Tình huống | React 17 | React 18 |
| :--- | :--- | :--- |
| **Trong `onClick` (Sự kiện React)** | 1 lần render | 1 lần render |
| **Trong `setTimeout` (Bất đồng bộ)** | 2 lần render (Mỗi lần gọi `setState` kích hoạt 1 render) | **1 lần render** (Automatic Batching) |
| **Trong Fetch/Promise** | 2 lần render | **1 lần render** (Automatic Batching) |

### 3\. Tầm quan trọng của Batching

  * **Hiệu suất (Performance):** Đây là lợi ích lớn nhất. Giảm số lần React phải tính toán lại Virtual DOM và cập nhật DOM thực.
  * **Độ nhất quán (Consistency):** Đảm bảo rằng UI không hiển thị các trạng thái "trung gian" không nhất quán, nơi một phần của trạng thái đã được cập nhật nhưng phần khác thì chưa.
  * **Trải nghiệm người dùng:** Giảm thiểu lag và giật hình, đặc biệt trong các ứng dụng có nhiều tương tác phức tạp.

### 4\. Cách Opt-out (Tắt Batching)

Mặc dù Automatic Batching là tính năng mặc định và được khuyến nghị, nếu bạn cần ép buộc React render lại sau một lần cập nhật trạng thái (ví dụ: để đọc một giá trị DOM vừa được cập nhật), bạn có thể sử dụng **`flushSync`**:

```jsx
import { flushSync } from 'react-dom';

function forceRender() {
  // Trạng thái này sẽ được cập nhật và kích hoạt render ngay lập tức
  flushSync(() => {
    setCount(c => c + 1);
  });
  
  // Trạng thái này sẽ được batch lại như bình thường
  setFlag(f => !f);
}
```

**Lưu ý:** `flushSync` nên được sử dụng rất hạn chế vì nó làm mất đi lợi ích hiệu suất của Concurrent Rendering.


---

Để nắm vững việc tối ưu hóa hiệu suất ứng dụng React, bạn cần hiểu rõ cách sử dụng **React Profiler** (để debug component) và **Lighthouse** (để đánh giá trải nghiệm người dùng tổng thể).

---

## 1. React Profiler

**React Profiler** là một công cụ có sẵn trong React DevTools (extension trình duyệt), cho phép bạn đo lường tần suất và chi phí render của các component trong cây React. Nó là công cụ lý tưởng để tìm ra các điểm nghẽn hiệu suất ở cấp độ component.

### Cách thức hoạt động
1.  **Ghi lại (Record):** Bạn bắt đầu ghi lại phiên tương tác của người dùng (ví dụ: click chuột, nhập liệu).
2.  **Đo lường:** Profiler ghi lại dữ liệu mỗi khi một component render, bao gồm thời gian render và lý do render.
3.  **Phân tích:** Nó hiển thị dữ liệu dưới dạng biểu đồ cây hoặc biểu đồ flame chart.

### Các Metric chính cần quan tâm
* **Time (Thời gian):** Tổng thời gian (miliseconds) mà component đã dành để render trong phiên ghi hình.
* **Ranked Chart:** Sắp xếp các component theo thời gian render, giúp bạn nhanh chóng xác định "kẻ gây chậm" chính.
* **Why did this render?** (Lý do render): Profiler cho biết component render lại vì **state** thay đổi, **props** thay đổi, hoặc component cha render lại. Đây là thông tin quan trọng để xác định xem bạn có thể áp dụng `React.memo` hoặc `useCallback` được không.

### Best Practice với Profiler
* **Kiểm tra Lý do Render:** Nếu một component đắt tiền (render lâu) và render lại thường xuyên dù props không thay đổi, đó là lúc bạn nên áp dụng **`React.memo`** (cho component) hoặc **`useCallback`/`useMemo`** (cho props/giá trị).
* **Chạy trong chế độ Production (giả lập):** Đảm bảo bạn đang kiểm tra mã đã được tối ưu hóa (minified) để có kết quả chính xác nhất.
* **Cô lập vấn đề:** Khi phát hiện một component đắt, hãy tập trung vào các component con của nó để tìm ra nguyên nhân gốc rễ.

---

## 2. Lighthouse

**Lighthouse** là một công cụ mã nguồn mở của Google (có sẵn trong Chrome DevTools) dùng để đánh giá chất lượng của các trang web dựa trên 5 khía cạnh chính. Nó cung cấp một cái nhìn toàn diện về **trải nghiệm người dùng thực tế** (User Experience).

### 5 Khía cạnh đánh giá chính
1.  **Performance (Hiệu suất):** Đánh giá tốc độ tải và khả năng tương tác của trang. Đây là phần quan trọng nhất cho ứng dụng React.
2.  **Accessibility (Khả năng tiếp cận):** Kiểm tra xem trang có tuân thủ các quy tắc a11y cơ bản không (ví dụ: thẻ `alt` cho hình ảnh, nhãn cho form).
3.  **Best Practices (Thực tiễn tốt nhất):** Kiểm tra các vấn đề về bảo mật, hình ảnh và code (ví dụ: sử dụng HTTPS, không có lỗi console).
4.  **SEO (Tối ưu hóa công cụ tìm kiếm):** Đảm bảo trang được cấu hình đúng để công cụ tìm kiếm có thể thu thập dữ liệu (crawl) và lập chỉ mục (index).
5.  **PWA (Progressive Web App):** Đánh giá xem trang có thể hoạt động như một ứng dụng gốc (native app) trên di động không.

### Các Metric Hiệu suất quan trọng (Core Web Vitals)
Lighthouse sử dụng các chỉ số Core Web Vitals để đánh giá hiệu suất, giúp bạn tối ưu hóa theo cách mà người dùng trải nghiệm:
* **LCP (Largest Contentful Paint):** Đo thời gian cần để phần tử nội dung lớn nhất hiển thị trên màn hình. (Tối ưu hóa: **Lazy Loading**, **Code Splitting**).
* **FID (First Input Delay):** Đo thời gian từ khi người dùng tương tác (click/gõ phím) đến khi trình duyệt có thể xử lý sự kiện đó. (Tối ưu hóa: **Giảm JavaScript execution time**, **Batching updates**).
* **CLS (Cumulative Layout Shift):** Đo sự ổn định thị giác. Đảm bảo các thành phần không bị nhảy loạn xạ trong quá trình tải. (Tối ưu hóa: **Đặt kích thước rõ ràng** cho hình ảnh/quảng cáo).

### Best Practice với Lighthouse
* **Chạy thường xuyên:** Chạy Lighthouse sau mỗi lần triển khai lớn để theo dõi điểm số.
* **Tập trung vào LCP:** Luôn cố gắng hiển thị nội dung chính càng nhanh càng tốt. Điều này thường liên quan đến việc tối ưu hóa CSS và tải JavaScript.
* **Phân tích Chi phí JavaScript:** Lighthouse sẽ chỉ ra file JS nào tốn nhiều thời gian nhất để tải và thực thi. Đây là nơi bạn nên áp dụng **Code Splitting** để giảm thiểu khối lượng công việc cho luồng chính (main thread). 

----

Đây là bản tóm tắt kiến thức cốt lõi về Mạng (Network) và API, bao gồm các khái niệm REST, Quản lý State, Realtime, và các giao thức HTTP hiện đại.

---

## 3. NETWORK (Mạng & API)

### 🟢 REST API (Representational State Transfer)

| Khái niệm | Giải thích | Ví dụ |
| :--- | :--- | :--- |
| **CRUD** | Bốn hành động cơ bản của API: **C**reate (POST), **R**ead (GET), **U**pdate (PUT/PATCH), **D**elete (DELETE). | `POST /users` (Tạo user), `GET /users/1` (Đọc user). |
| **Query Params** | Tham số được gắn vào URL để lọc, sắp xếp hoặc phân trang dữ liệu. | `GET /products?category=shoes&sort=price` |
| **Headers** | Metadata của request hoặc response, truyền thông tin về Authentication, Content-Type, Caching. | `Authorization: Bearer <token>`, `Content-Type: application/json` |
| **Status Codes** | Mã 3 chữ số do server trả về để báo cáo trạng thái của request. | **200 OK** (Thành công), **401 Unauthorized** (Không xác thực), **404 Not Found**, **500 Internal Server Error**. |
| **Retry Logic (Exponential Backoff)** | Kỹ thuật tự động thử lại request thất bại. **Exponential Backoff** là chiến lược chờ đợi lâu hơn sau mỗi lần thử lại thất bại ($1s, 2s, 4s, 8s, ...$) để tránh làm quá tải server. | Giúp hệ thống tự phục hồi sau lỗi tạm thời. |
| **Timeout & Abort Controller** | **Timeout** giới hạn thời gian tối đa chờ response. **AbortController** cho phép hủy một request đang chạy (ví dụ: khi người dùng chuyển trang). | Tăng tốc độ phản hồi và tiết kiệm băng thông. |

---

### 🟢 State Management (Quản lý Trạng thái)

| Khái niệm | Giải thích | Lựa chọn Công cụ |
| :--- | :--- | :--- |
| **Global State vs Server State** | **Global State** (Client State): Dữ liệu cục bộ, tĩnh (ví dụ: trạng thái Dark Mode, mở/đóng Modal). **Server State**: Dữ liệu không đồng bộ, thay đổi liên tục, cần caching (ví dụ: danh sách sản phẩm, hồ sơ người dùng). | **Global State:** Context API, Redux Toolkit, Zustand. **Server State:** **React Query, RTK Query, SWR**. |
| **Cache, Stale-While-Revalidate** | **Caching** lưu trữ dữ liệu đã fetch. **Stale-While-Revalidate (SWR)** là chiến lược: Trả về dữ liệu **cũ (stale)** ngay lập tức, sau đó **xác thực lại (revalidate)** ở chế độ nền. | Mang lại tốc độ tải gần như tức thời cho người dùng. |

---

### 🟢 Realtime Communication (Giao tiếp thời gian thực)

| Khái niệm | Mô tả | Ứng dụng |
| :--- | :--- | :--- |
| **WebSocket** | Giao thức cung cấp kênh giao tiếp **hai chiều (bi-directional)** và **toàn phần (full-duplex)** trên một kết nối TCP duy nhất, sau một HTTP handshake. | Chat, Game nhiều người chơi, Live Tickers. |
| **SSE (Server-Sent Events)** | Cho phép server **đẩy dữ liệu một chiều** đến client qua một kết nối HTTP mở. Không cho phép client gửi dữ liệu trở lại. | Thông báo (Notifications), Live Scores. |
| **SignalR** | Một thư viện của Microsoft giúp đơn giản hóa việc thêm tính năng realtime vào ứng dụng, tự động chọn phương thức truyền tải tốt nhất (WebSocket, SSE, Long Polling). | Ứng dụng .NET. |

---

### 🟢 HTTP Concepts & Tối ưu hóa

| Khái niệm | Giải thích | Mục đích |
| :--- | :--- | :--- |
| **CORS (Cross-Origin Resource Sharing)** | Cơ chế an toàn của trình duyệt để cho phép hoặc từ chối các request API từ một domain khác. | Ngăn chặn các request cross-origin không mong muốn. |
| **Cookie, Token (JWT, OAuth2)** | Các phương thức xác thực. **Cookie** (Session-based) lưu Session ID. **JWT** (Token-based) chứa thông tin người dùng, được ký để đảm bảo tính toàn vẹn. | Quản lý phiên làm việc và xác thực người dùng. |
| **HTTP/1.1 vs HTTP/2 vs HTTP/3** | **HTTP/1.1** (Nối tiếp). **HTTP/2** (Song song qua một kết nối: Multiplexing, Server Push). **HTTP/3** (Sử dụng QUIC, dựa trên UDP thay vì TCP, giảm độ trễ). | Cải thiện hiệu suất, giảm độ trễ, tăng tốc độ tải trang. |
| **Cache-Control, ETag** | **Cache-Control** header chỉ định cách thức và thời gian trình duyệt/proxy nên cache tài nguyên. **ETag** là một định danh duy nhất của tài nguyên; trình duyệt gửi nó để hỏi server xem tài nguyên đã thay đổi chưa. | Tối ưu hóa hiệu suất bằng cách tránh tải lại tài nguyên không thay đổi. |

----

Đây là bản tóm tắt kiến thức nền tảng Web cốt lõi, bao gồm JavaScript, DOM, Bảo mật, Khả năng tiếp cận, Responsive Design, và Build Tools.

---

## 4. WEB (Kiến thức nền tảng Web)

### 🟢 JavaScript Core

| Khái niệm | Giải thích | Tầm quan trọng |
| :--- | :--- | :--- |
| **Event Loop** | Cơ chế cốt lõi của JavaScript giúp xử lý các tác vụ bất đồng bộ (**asynchronous**) dù JS là đơn luồng (**single-threaded**). Nó liên tục kiểm tra Call Stack và Callback Queue (hoặc Microtask Queue) để quyết định tác vụ nào sẽ được chạy tiếp theo. | Đảm bảo UI không bị chặn ("đơ") khi xử lý các tác vụ nặng hoặc I/O. |
| **`async/await`** | Cú pháp syntactic sugar được xây dựng trên **Promises** để làm cho code bất đồng bộ trông giống như code đồng bộ. | Giúp quản lý chuỗi Promises dễ đọc và dễ bảo trì hơn. |
| **Closures** | Một hàm "ghi nhớ" và truy cập các biến từ phạm vi (scope) bên ngoài nó (lexical environment) ngay cả sau khi hàm bên ngoài đã thực thi xong. | Cần thiết cho data privacy (ẩn dữ liệu) và tạo ra các hàm factory. |
| **Hoisting** | Hành vi của JavaScript, nơi khai báo biến (`var`) và hàm được đưa lên đầu phạm vi chứa chúng trước khi mã được thực thi. | Giúp hiểu tại sao biến `var` có thể được sử dụng trước khi khai báo. |
| **Destructuring** | Cho phép trích xuất dữ liệu từ **Arrays** hoặc **Objects** thành các biến riêng biệt một cách ngắn gọn. | Giúp code gọn gàng, đặc biệt khi làm việc với `props` trong React. |
| **Spread/Rest** | **Spread (`...`)** dùng để mở rộng các phần tử của một iterable (array, object). **Rest (`...`)** dùng để gộp các tham số còn lại thành một array. | Dùng trong function arguments, tạo bản sao (shallow copy) của array/object. |
| **Promises** | Một đối tượng đại diện cho việc hoàn thành (hoặc thất bại) của một thao tác bất đồng bộ. Có 3 trạng thái: `pending`, `fulfilled`, `rejected`. | Nền tảng cho các thao tác bất đồng bộ hiện đại (như `fetch`). |

---

### 🟢 DOM & Browser

| Khái niệm | Giải thích | Ứng dụng |
| :--- | :--- | :--- |
| **DOM API** | Tập hợp các hàm và thuộc tính cho phép JavaScript truy cập và thao tác với cấu trúc của tài liệu HTML/XML. | Thay đổi nội dung, kiểu dáng, và thêm/xóa các phần tử UI. |
| **Event Bubbling/Capturing** | Hai giai đoạn xử lý sự kiện: **Capturing** (đi từ trên xuống dưới, từ `window` đến phần tử đích); **Bubbling** (đi từ dưới lên trên, từ phần tử đích đến `window`). | Cho phép ủy quyền sự kiện (Event Delegation) bằng cách lắng nghe sự kiện ở phần tử cha. |
| **LocalStorage** | Lưu trữ dữ liệu **không có giới hạn thời gian** (không tự xóa khi đóng trình duyệt), dung lượng lớn hơn (khoảng 5-10MB). | Lưu chủ đề (theme), cài đặt người dùng, Auth token (không nên). |
| **SessionStorage** | Lưu trữ dữ liệu **cho đến khi tab/window hiện tại bị đóng**. | Lưu dữ liệu phiên làm việc tạm thời (ví dụ: giỏ hàng). |
| **IndexedDB** | API lưu trữ dữ liệu lớn, có cấu trúc trên trình duyệt (NoSQL-like). | Lưu trữ dữ liệu ứng dụng offline (ví dụ: PWA). |

---

### 🟢 Security (Bảo mật Web)

| Khái niệm | Giải thích | Phòng chống |
| :--- | :--- | :--- |
| **XSS (Cross-Site Scripting)** | Kẻ tấn công chèn script độc hại vào trang web để chạy trong trình duyệt của người dùng khác. | **Sanitization** (lọc) input, **Content Security Policy (CSP)**. |
| **CSRF (Cross-Site Request Forgery)** | Kẻ tấn công lừa người dùng gửi request trái ý muốn. | **CSRF Tokens**, Header **SameSite** cho Cookie. |
| **CORS (Cross-Origin Resource Sharing)** | Cơ chế trình duyệt cho phép hoặc từ chối request API từ một domain khác. | Cấu hình **Access-Control-Allow-Origin** chính xác trên server. |
| **HTTPS** | Giao thức truyền tải dữ liệu được bảo mật bằng **TLS/SSL** (mã hóa). | Ngăn chặn tấn công **Man-in-the-Middle (MITM)**. |
| **Same-origin Policy** | Cơ chế bảo mật quan trọng nhất: Một tài liệu hoặc script được tải từ một nguồn (origin) không thể truy cập tài nguyên từ một nguồn khác (protocol + domain + port phải giống nhau). | Ngăn chặn các script độc hại đọc dữ liệu nhạy cảm trên các trang web khác. |

---

### 🟢 Accessibility (A11y) & Responsive

| Khái niệm | Giải thích | Mục đích |
| :--- | :--- | :--- |
| **WCAG Basics** | **Web Content Accessibility Guidelines** - Các nguyên tắc được chấp nhận rộng rãi để tạo ra nội dung web dễ tiếp cận hơn cho người khuyết tật. | Đảm bảo trang web **Perceivable, Operable, Understandable, Robust** (POUR). |
| **Semantic HTML** | Sử dụng các thẻ HTML có ý nghĩa rõ ràng (ví dụ: `<h1>`, `<nav>`, `<button>`, `<article>`) thay vì chỉ dùng `<div>`. | Cải thiện SEO và giúp công cụ đọc màn hình (screen readers) hiểu cấu trúc trang. |
| **ARIA Attributes** | **Accessible Rich Internet Applications** - Các thuộc tính được thêm vào HTML để cải thiện thông tin cho công cụ hỗ trợ (ví dụ: `aria-label`, `role`). | Cần thiết cho các thành phần UI phức tạp (ví dụ: dropdown, tab) được xây dựng bằng `<div>`. |
| **CSS Flex/Grid** | Các module layout hiện đại: **Flexbox** (cho layout 1 chiều), **Grid** (cho layout 2 chiều). | Dễ dàng tạo bố cục phức tạp và responsive. |
| **Media Queries** | Các quy tắc CSS cho phép áp dụng style dựa trên đặc điểm của thiết bị (ví dụ: chiều rộng màn hình, loại màn hình). | Nền tảng của **Responsive Web Design**. |
| **Mobile-first Design** | Triết lý thiết kế bắt đầu bằng việc thiết kế và phát triển cho màn hình **nhỏ nhất** trước, sau đó mở rộng bằng media queries cho màn hình lớn hơn. | Ưu tiên hiệu suất và trải nghiệm trên thiết bị di động. |

---

### 🟢 Build Tools

| Khái niệm | Giải thích | Chức năng cốt lõi |
| :--- | :--- | :--- |
| **Webpack** | Module bundler phổ biến nhất, gộp tất cả các asset (JS, CSS, hình ảnh) thành các bundle tối ưu. | **Code Splitting, Tree Shaking, Asset Management.** |
| **Vite** | Build tool hiện đại, sử dụng native **ES Modules** trong phát triển để cung cấp thời gian khởi động và cập nhật nóng (**HMR**) cực nhanh. | **Nhanh hơn Webpack** trong quá trình phát triển (Dev Server). |
| **Babel** | Trình biên dịch (Transpiler) JavaScript, chuyển đổi code JS hiện đại (ES6+) thành code JS tương thích với các trình duyệt cũ hơn. | Đảm bảo khả năng tương thích ngược của ứng dụng. |
| **CI/CD Basics** | **CI (Continuous Integration):** Tự động tích hợp code của các lập trình viên. **CD (Continuous Delivery/Deployment):** Tự động đưa code qua các môi trường (Test, Staging, Production). | Tăng tốc độ release, giảm lỗi bằng cách tự động hóa quy trình. |

-----

Đây là bản tóm tắt kiến thức nền tảng Web cốt lõi, bao gồm JavaScript, DOM, Bảo mật, Khả năng tiếp cận, Responsive Design, và Build Tools.

---

## 4. WEB (Kiến thức nền tảng Web)

### 🟢 JavaScript Core

| Khái niệm | Giải thích | Tầm quan trọng |
| :--- | :--- | :--- |
| **Event Loop** | Cơ chế cốt lõi của JavaScript giúp xử lý các tác vụ bất đồng bộ (**asynchronous**) dù JS là đơn luồng (**single-threaded**). Nó liên tục kiểm tra Call Stack và Callback Queue (hoặc Microtask Queue) để quyết định tác vụ nào sẽ được chạy tiếp theo. | Đảm bảo UI không bị chặn ("đơ") khi xử lý các tác vụ nặng hoặc I/O. |
| **`async/await`** | Cú pháp syntactic sugar được xây dựng trên **Promises** để làm cho code bất đồng bộ trông giống như code đồng bộ. | Giúp quản lý chuỗi Promises dễ đọc và dễ bảo trì hơn. |
| **Closures** | Một hàm "ghi nhớ" và truy cập các biến từ phạm vi (scope) bên ngoài nó (lexical environment) ngay cả sau khi hàm bên ngoài đã thực thi xong. | Cần thiết cho data privacy (ẩn dữ liệu) và tạo ra các hàm factory. |
| **Hoisting** | Hành vi của JavaScript, nơi khai báo biến (`var`) và hàm được đưa lên đầu phạm vi chứa chúng trước khi mã được thực thi. | Giúp hiểu tại sao biến `var` có thể được sử dụng trước khi khai báo. |
| **Destructuring** | Cho phép trích xuất dữ liệu từ **Arrays** hoặc **Objects** thành các biến riêng biệt một cách ngắn gọn. | Giúp code gọn gàng, đặc biệt khi làm việc với `props` trong React. |
| **Spread/Rest** | **Spread (`...`)** dùng để mở rộng các phần tử của một iterable (array, object). **Rest (`...`)** dùng để gộp các tham số còn lại thành một array. | Dùng trong function arguments, tạo bản sao (shallow copy) của array/object. |
| **Promises** | Một đối tượng đại diện cho việc hoàn thành (hoặc thất bại) của một thao tác bất đồng bộ. Có 3 trạng thái: `pending`, `fulfilled`, `rejected`. | Nền tảng cho các thao tác bất đồng bộ hiện đại (như `fetch`). |

---

### 🟢 DOM & Browser

| Khái niệm | Giải thích | Ứng dụng |
| :--- | :--- | :--- |
| **DOM API** | Tập hợp các hàm và thuộc tính cho phép JavaScript truy cập và thao tác với cấu trúc của tài liệu HTML/XML. | Thay đổi nội dung, kiểu dáng, và thêm/xóa các phần tử UI. |
| **Event Bubbling/Capturing** | Hai giai đoạn xử lý sự kiện: **Capturing** (đi từ trên xuống dưới, từ `window` đến phần tử đích); **Bubbling** (đi từ dưới lên trên, từ phần tử đích đến `window`). | Cho phép ủy quyền sự kiện (Event Delegation) bằng cách lắng nghe sự kiện ở phần tử cha. |
| **LocalStorage** | Lưu trữ dữ liệu **không có giới hạn thời gian** (không tự xóa khi đóng trình duyệt), dung lượng lớn hơn (khoảng 5-10MB). | Lưu chủ đề (theme), cài đặt người dùng, Auth token (không nên). |
| **SessionStorage** | Lưu trữ dữ liệu **cho đến khi tab/window hiện tại bị đóng**. | Lưu dữ liệu phiên làm việc tạm thời (ví dụ: giỏ hàng). |
| **IndexedDB** | API lưu trữ dữ liệu lớn, có cấu trúc trên trình duyệt (NoSQL-like). | Lưu trữ dữ liệu ứng dụng offline (ví dụ: PWA). |

---

### 🟢 Security (Bảo mật Web)

| Khái niệm | Giải thích | Phòng chống |
| :--- | :--- | :--- |
| **XSS (Cross-Site Scripting)** | Kẻ tấn công chèn script độc hại vào trang web để chạy trong trình duyệt của người dùng khác. | **Sanitization** (lọc) input, **Content Security Policy (CSP)**. |
| **CSRF (Cross-Site Request Forgery)** | Kẻ tấn công lừa người dùng gửi request trái ý muốn. | **CSRF Tokens**, Header **SameSite** cho Cookie. |
| **CORS (Cross-Origin Resource Sharing)** | Cơ chế trình duyệt cho phép hoặc từ chối request API từ một domain khác. | Cấu hình **Access-Control-Allow-Origin** chính xác trên server. |
| **HTTPS** | Giao thức truyền tải dữ liệu được bảo mật bằng **TLS/SSL** (mã hóa). | Ngăn chặn tấn công **Man-in-the-Middle (MITM)**. |
| **Same-origin Policy** | Cơ chế bảo mật quan trọng nhất: Một tài liệu hoặc script được tải từ một nguồn (origin) không thể truy cập tài nguyên từ một nguồn khác (protocol + domain + port phải giống nhau). | Ngăn chặn các script độc hại đọc dữ liệu nhạy cảm trên các trang web khác. |

---

### 🟢 Accessibility (A11y) & Responsive

| Khái niệm | Giải thích | Mục đích |
| :--- | :--- | :--- |
| **WCAG Basics** | **Web Content Accessibility Guidelines** - Các nguyên tắc được chấp nhận rộng rãi để tạo ra nội dung web dễ tiếp cận hơn cho người khuyết tật. | Đảm bảo trang web **Perceivable, Operable, Understandable, Robust** (POUR). |
| **Semantic HTML** | Sử dụng các thẻ HTML có ý nghĩa rõ ràng (ví dụ: `<h1>`, `<nav>`, `<button>`, `<article>`) thay vì chỉ dùng `<div>`. | Cải thiện SEO và giúp công cụ đọc màn hình (screen readers) hiểu cấu trúc trang. |
| **ARIA Attributes** | **Accessible Rich Internet Applications** - Các thuộc tính được thêm vào HTML để cải thiện thông tin cho công cụ hỗ trợ (ví dụ: `aria-label`, `role`). | Cần thiết cho các thành phần UI phức tạp (ví dụ: dropdown, tab) được xây dựng bằng `<div>`. |
| **CSS Flex/Grid** | Các module layout hiện đại: **Flexbox** (cho layout 1 chiều), **Grid** (cho layout 2 chiều). | Dễ dàng tạo bố cục phức tạp và responsive. |
| **Media Queries** | Các quy tắc CSS cho phép áp dụng style dựa trên đặc điểm của thiết bị (ví dụ: chiều rộng màn hình, loại màn hình). | Nền tảng của **Responsive Web Design**. |
| **Mobile-first Design** | Triết lý thiết kế bắt đầu bằng việc thiết kế và phát triển cho màn hình **nhỏ nhất** trước, sau đó mở rộng bằng media queries cho màn hình lớn hơn. | Ưu tiên hiệu suất và trải nghiệm trên thiết bị di động. |

---

### 🟢 Build Tools

| Khái niệm | Giải thích | Chức năng cốt lõi |
| :--- | :--- | :--- |
| **Webpack** | Module bundler phổ biến nhất, gộp tất cả các asset (JS, CSS, hình ảnh) thành các bundle tối ưu. | **Code Splitting, Tree Shaking, Asset Management.** |
| **Vite** | Build tool hiện đại, sử dụng native **ES Modules** trong phát triển để cung cấp thời gian khởi động và cập nhật nóng (**HMR**) cực nhanh. | **Nhanh hơn Webpack** trong quá trình phát triển (Dev Server). |
| **Babel** | Trình biên dịch (Transpiler) JavaScript, chuyển đổi code JS hiện đại (ES6+) thành code JS tương thích với các trình duyệt cũ hơn. | Đảm bảo khả năng tương thích ngược của ứng dụng. |
| **CI/CD Basics** | **CI (Continuous Integration):** Tự động tích hợp code của các lập trình viên. **CD (Continuous Delivery/Deployment):** Tự động đưa code qua các môi trường (Test, Staging, Production). | Tăng tốc độ release, giảm lỗi bằng cách tự động hóa quy trình. |