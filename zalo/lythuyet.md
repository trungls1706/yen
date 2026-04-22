HTML/CSS
Critical Rendering Path ?
Là chuỗi bước browser làm để render UI:
Parse HTML → DOM
Parse CSS → CSSOM
DOM + CSSOM → Render Tree
Layout (calculate size/position)
Paint → Composite

👉 CSS blocking render, JS blocking parser
👉 Tối ưu: inline critical CSS, defer JS, preload font



Bao nhiêu cách center 1 block ? Liệt kê theo cách của mình.

Tailwind CSS sử dụng định nghĩa gì để handle class ? VD: px-2, mr-5 thì gọi là gì ?
- map từ Design System Scale

Em có biết sử dụng token trong Tailwind CSS hay không ?


BEM là gì ?
Block – Element – Modifier <-> button__icon--active

Javascript
Closure là gì ?
Cách Javascript handle single thread như thế nào ? - Focus Event loop, Callstack, microtask, macrotask
Promise vs Async Await ? Phân biệt khác nhau và cách sử dụng của chúng khi nào ? Thực tế dự án đã sử dụng use case ?
Cho 1 ví dụ console.log, vừa xem vừa mô tả lại cái nào log trước cái nào log sau ?
setTimeout chạy như thế nào?
Phân biệt var, let, const ? khác nhau như thế nào ?
|          | var             | let       | const     |
| -------- | --------------- | --------- | --------- |
| scope    | function        | block     | block     |
| hoist    | yes (undefined) | yes (TDZ) | yes (TDZ) |
| reassign | yes             | yes       | ❌         |


Rendering/Browser
Phân biệt CSR và SSR, Static Rendering ?

- CSR: render bằng JS → chậm SEO
- SSR: render HTML ở server
- Static: build sẵn HTML (SSG)

Cách mà client và server giao tiếp được với nhau khi sử dụng Nextjs hoặc Server component ? - Focus vào appData, nextData

Hydration là gì ? - Focus vào server side component
1️⃣ Server render React → HTML
2️⃣ Browser nhận HTML → vẽ UI ngay (nhanh)
3️⃣ JS bundle tải xong
4️⃣ React hydrate → UI có click, onChange, state

| Thành phần       | Render ở đâu    | Có Hydration không |
| ---------------- | --------------- | ------------------ |
| Server Component | Server          | ❌ Không            |
| Client Component | Server → Client | ✅ Có               |
| SSR truyền thống | Server          | ✅ Có               |

Lợi ích cực lớn 🚀
1️⃣ Ít JS hơn

Không gửi JS cho Server Component

Page load nhẹ hơn

2️⃣ Nhanh hơn

Browser không cần parse JS

Không hydrate vô ích

3️⃣ An toàn hơn

Logic server, token, DB không leak

Vite vs Webpack ? 
| Vite          | Webpack      |
| ------------- | ------------ |
| ESM native    | bundle trước |
| dev cực nhanh | dev chậm     |
| HMR nhanh     | HMR chậm     |



Tại sao hmr (hot reload) của vite lại nhanh hơn webpack ?
- Không bundle
- Chỉ reload module bị thay đổi
- Dùng browser ESM
1️⃣ Vite không bundle khi dev (điểm ăn tiền nhất)
Webpack (dev mode)
Khi bạn sửa 1 file:
Webpack rebuild lại cả dependency graph
Bundle lại thành 1 hoặc vài file lớn
Sau đó mới push update cho browser
👉 Dù chỉ sửa 1 dòng:
Webpack vẫn phải “nghĩ lại cả thế giới” 🐢

| Tiêu chí      | Webpack (dev) | Vite (dev)   |
| ------------- | ------------- | ------------ |
| Bundling      | Có            | ❌ Không      |
| Module reload | Khó, lan rộng | 🎯 Chính xác |
| Dùng ESM      | ❌ Giả lập     | ✅ Native     |
| HMR speed     | Giây          | ⚡ ms         |
| Cảm giác dev  | “đợi chút…”   | “wow 😲”     |




Rollup là gì ? - Tại sao Vite lại sử dụng rollup ?
1️⃣ Rollup là gì? (bản chất)
Rollup là một JavaScript bundler
👉 Chuyên gộp nhiều module ES (import / export) thành ít file tối ưu cho production

Rollup sinh ra để tối ưu output, không phải để dev nhanh.

2️⃣ “Bundler tối ưu ESM” nghĩa là gì?
ESM có đặc điểm rất quan trọng:

import / export là static
Biết được:
import gì
dùng hay không dùng
dependency graph ngay từ lúc parse
👉 Rollup dựa hoàn toàn vào đặc điểm này

Bundler tối ưu ESM
👉 Vite dùng Rollup cho production build
👉 Tree-shaking tốt

3️⃣ Tree-shaking của Rollup tốt vì sao?
Vì Rollup:
Chỉ hỗ trợ ESM (cốt lõi)
Không cần runtime module phức tạp
Phân tích dependency graph tĩnh

Kết quả:
Code thừa biến mất hoàn toàn
Không phải “bỏ qua lúc runtime”
Output rất gọn

Web Performance ? SEO ? - những chỉ số Web Core Vital  (INF, LCP, CLS) ? Cách tối ưu những chỉ số đó ?
| Chỉ số  | Đo cái gì                  | Tác động                        |
| ------- | -------------------------- | ------------------------------- |
| **LCP** | Tốc độ load nội dung chính | Cảm giác “web có nhanh không”   |
| **CLS** | Mức độ layout bị giật      | Cảm giác “web có ổn định không” |
| **INP** | Độ trễ khi tương tác       | Cảm giác “web có mượt không”    |


👉 Tối ưu:
preload image
avoid layout shift
code splitting

Tree Shaking là gì ? Tại sao Vite có thể biết được rằng phần code nào có thể tree shaking ?

Security
JWT là gì ? Cookies là gì ? Đã từng handle flow authentication chưa ?
Để bảo mật cookies người dùng không thể dùng document.cookie để lấy data thì làm như thế nào ? - Sử dụng httpOnly
SameSite của Cookies là gì ?
Phân biệt Cookies, Localstorage, Sessionstorage, indexedDB ? Đã từng sử dụng cái nào trong dự án thực tế và cách handle nó ?
|           | Cookie | Local | Session | IndexedDB |
| --------- | ------ | ----- | ------- | --------- |
| size      | nhỏ    | lớn   | lớn     | rất lớn   |
| auto send | ✅      | ❌     | ❌       | ❌         |

XSS/CSRF attacks là gì ? cách bảo mật như thế nào ?

ReactJS
React render như thế nào? - Focus 3 phases: Render Phase, Reconciliation Phase, Commit Phase
useEffect chạy phase nào ?
cleanup useEffect chạy như thế nào ?
useRef vs useState ?
Controlled Component vs Uncontrolled Component ?
useImperativeHandle ?
Key trong React đóng vai trò gì ? tại sao sử dụng id thay vì index?
React Batching Update là gì ?
Tại sao lại gọi react là one-way binding ?

Project
Cách em handle Virtual Table List như thế nào ?
SWR workflow ? chạy như thế nào ? caching ra sao ?
fetch → cache

stale → revalidate

key-based cache  

Nếu cache time chưa hết mà ram đã đầy do lưu trữ quá nhiều key trên máy thì phải làm như thế nào ? - force delete


Cách force Call api trong SWR ? - sử dụng mutation


Để debug 1 key trong swr thì em sẽ làm như thế nào để debug ?
So sánh swr và react query ?
| SWR         | React Query  |
| ----------- | ------------ |
| simple      | nhiều config |
| nhẹ         | mạnh         |
| stale-first | cache-first  |


