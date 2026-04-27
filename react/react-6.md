# 50 Câu Hỏi Phỏng Vấn Frontend — Middle/Senior

Tài liệu ôn tập với code ví dụ thực tế, bug thường gặp, và tip phỏng vấn.

## Mục lục

- [Phần 1: JavaScript Core (Q1-12)](#phần-1-javascript-core)
- [Phần 2A: Browser & DOM (Q13-22)](#phần-2a-browser--dom--render)
- [Phần 2B: HTML & CSS (Q23-30)](#phần-2b-html--css)
- [Phần 3A: React Fundamentals (Q31-42)](#phần-3a-react-fundamentals)
- [Phần 3B: State Management & Production (Q43-50)](#phần-3b-state-management--production)

---

## Phần 1: JavaScript Core

### Câu 1: Scope ảnh hưởng gì tới bug UI?

**Trả lời ngắn:** `var` có function scope, dễ bị ghi đè ngoài ý muốn. `let`/`const` có block scope, an toàn hơn.

**Bug kinh điển với var trong vòng lặp:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3 3 3 (không phải 0 1 2!)

// Fix với let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0 1 2
```

**Tip phỏng vấn:** Nếu thấy state luôn là giá trị cuối cùng trong loop, nghi ngờ scope `var` ngay. Trong React/Vue dự án thật, dùng `const`/`let` xuyên suốt.

---

### Câu 2: Closure là gì, dùng trong Frontend ra sao?

**Trả lời ngắn:** Closure là hàm con nhớ được biến từ scope cha dù hàm cha đã return.

**Ví dụ debounce dùng closure:**

```js
function debounce(fn, delay) {
  let timer; // closure giữ timer này
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((value) => {
  fetchResults(value);
}, 300);
```

**Bug stale closure trong React (rất hay gặp):**

```js
useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // count bị "đóng băng" lúc mount!
  }, 1000);
  return () => clearInterval(id);
}, []); // thiếu [count] trong deps
```

**Tip phỏng vấn:** Khi nói về closure, luôn nhắc tới stale closure trong React hooks — đây là dấu hiệu bạn có kinh nghiệm thực tế.

---

### Câu 3: Hoisting gây lỗi khó debug ở tình huống nào?

**Trả lời ngắn:** `var` được hoist và init = `undefined`. `let`/`const` được hoist nhưng rơi vào TDZ (Temporal Dead Zone) — dùng trước khai báo sẽ throw error.

```js
// var: lỗi ngầm, khó phát hiện
console.log(name); // undefined (không báo lỗi!)
var name = "Alice";

// let: lỗi rõ ràng
console.log(age); // ReferenceError
let age = 25;

// Function declaration được hoist hoàn toàn
greet(); // "Hello!" — OK
function greet() { console.log("Hello!"); }

// Function expression KHÔNG được hoist
sayBye(); // TypeError: sayBye is not a function
var sayBye = () => console.log("Bye!");
```

**Tip phỏng vấn:** Nói rõ điểm khác biệt giữa "lỗi ngầm" (var) và "lỗi rõ" (let/const). Lỗi rõ tốt hơn vì fail-fast.

---

### Câu 4: Event loop liên quan gì tới UI bị delay?

**Trả lời ngắn:** Khi main thread bị block, browser không xử lý được click, scroll, render — UI bị đơ.

```js
// Block main thread — UI đơ 3 giây!
function heavyCompute() {
  const start = Date.now();
  while (Date.now() - start < 3000) {} // blocking!
}

// Fix 1: chia nhỏ task
function chunkWork(items, index = 0) {
  if (index >= items.length) return;
  processItem(items[index]);
  requestAnimationFrame(() => chunkWork(items, index + 1));
}

// Fix 2: Web Worker cho task nặng
// myWorker.js
self.onmessage = (e) => {
  const result = heavyCompute(e.data);
  self.postMessage(result);
};
```

**Câu hỏi follow-up — thứ tự thực thi:**

```js
console.log('1');
setTimeout(() => console.log('2'), 0);     // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('4');
// Output: 1 → 4 → 3 → 2
// Microtask LUÔN chạy trước macrotask
```

**Tip phỏng vấn:** Biết phân biệt microtask vs macrotask là dấu hiệu senior. Mở Performance tab DevTools chỉ Long Task (>50ms) cũng là điểm cộng.

---

### Câu 5: Promise vs async/await khác nhau ở xử lý lỗi?

**Trả lời ngắn:** Promise dùng `.catch()`, async/await dùng `try/catch`. Lỗi hay bỏ sót: quên `await` hoặc quên `catch`.

```js
// Promise chain
fetch('/api/user')
  .then(res => res.json())
  .then(data => setUser(data))
  .catch(err => setError(err)); // catch tất cả ở cuối

// async/await — dễ đọc hơn
async function loadUser() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    setUser(data);
  } catch (err) {
    setError(err.message);
  }
}

// LỖI HAY BỎ SÓT: quên await
async function buggy() {
  try {
    const data = fetchData(); // thiếu await!
    // data là Promise, không phải kết quả
  } catch (err) {
    // Không bắt được lỗi!
  }
}

// Chạy song song
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]); // nhanh hơn await tuần tự
```

**Tip phỏng vấn:** Nhắc tới `Promise.all` (fail nhanh) vs `Promise.allSettled` (chờ hết) — cho thấy hiểu sâu.

---

### Câu 6: Race condition trong Frontend xảy ra khi nào?

**Trả lời ngắn:** User gõ nhanh trong search box, request sau về trước request trước → UI hiển thị kết quả sai.

```js
// BUG
const search = async (query) => {
  const data = await fetchSearch(query);
  setResults(data); // race condition!
};
// User gõ "a" rồi "ab"
// Response "ab" về trước "a"
// → UI hiển thị kết quả "a" (sai!)

// FIX 1: AbortController (recommended)
useEffect(() => {
  const controller = new AbortController();

  fetchSearch(query, controller.signal)
    .then(setResults)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort(); // cancel request cũ
}, [query]);

// FIX 2: Đánh dấu request mới nhất
let latestId = 0;
const search = async (query) => {
  const id = ++latestId;
  const data = await fetchSearch(query);
  if (id === latestId) setResults(data); // bỏ qua kết quả cũ
};
```

**Tip phỏng vấn:** Nhắc React Query / SWR handle race condition tự động → cho thấy bạn biết khi nào nên dùng thư viện thay vì tự code.

---

### Câu 7: Tham chiếu và giá trị gây bug state thế nào?

**Trả lời ngắn:** Primitive truyền theo giá trị. Object/Array truyền theo tham chiếu — mutate trực tiếp không trigger re-render trong React.

```js
const [items, setItems] = useState([1, 2, 3]);

// SAI — React không detect thay đổi
const addItem = () => {
  items.push(4); // mutate trực tiếp
  setItems(items); // cùng reference → no re-render
};

// ĐÚNG — tạo array mới
const addItem = () => {
  setItems([...items, 4]); // spread tạo array mới
};

// Với object
const [user, setUser] = useState({ name: 'Alice', age: 25 });

// SAI
user.age++; setUser(user);

// ĐÚNG
setUser({ ...user, age: user.age + 1 });

// Nested object — phải spread từng level
setUser({
  ...user,
  address: { ...user.address, city: 'HN' }
});
```

**Tip phỏng vấn:** Khi component không re-render dù state đổi, đây là suspect số 1. Verify bằng React DevTools Profiler.

---

### Câu 8: Shallow vs deep copy khi update state?

**Trả lời ngắn:** Spread (`...`) chỉ copy 1 level. Nested object vẫn là tham chiếu cũ.

```js
const original = {
  name: 'Alice',
  address: { city: 'HCM' }
};

// Shallow copy
const shallow = { ...original };
shallow.name = 'Bob';        // OK
shallow.address.city = 'HN'; // BUG! Affect original!
console.log(original.address.city); // 'HN' — bị thay đổi!

// Deep copy — 3 cách

// 1. JSON (đơn giản, có hạn chế)
const deep1 = JSON.parse(JSON.stringify(original));
// Mất Date, Function, undefined

// 2. structuredClone (modern, recommended)
const deep2 = structuredClone(original);

// 3. Immer cho complex state
import produce from 'immer';
const newState = produce(state, draft => {
  draft.user.address.city = 'HN'; // mutate draft thoải mái
});
```

**Tip phỏng vấn:** Trade-off rõ ràng — state đơn giản dùng spread, state nhiều level dùng Immer, tránh JSON method với Date.

---

### Câu 9: == và === gây lỗi gì trong Frontend?

**Trả lời ngắn:** `==` ép kiểu ngầm gây bug khó đoán. `===` so sánh chặt chẽ cả giá trị và kiểu.

```js
// == ép kiểu — kết quả bất ngờ
0 == ''        // true!
0 == '0'       // true!
'' == '0'      // false!
null == undefined // true
[] == false    // true
[1] == 1       // true

// === so sánh chặt — luôn predictable
0 === ''       // false
0 === '0'      // false
null === undefined // false

// Bug thực tế — input value luôn là string
const [age, setAge] = useState(0);

<input
  type="number"
  onChange={(e) => setAge(e.target.value)} // string!
/>

// Sau đó:
if (age == 18) { /* true với 18 và "18" */ }
if (age === 18) { /* chỉ true với number 18 */ }

// Fix: parse khi nhận
onChange={(e) => setAge(Number(e.target.value))}
```

**Tip phỏng vấn:** Luôn dùng `===`. ESLint rule `eqeqeq` enforce điều này. Exception duy nhất: `value == null` để check cả null và undefined.

---

### Câu 10: Khi nào tránh mutate object/array trực tiếp?

**Trả lời ngắn:** Trong React, mutate state trực tiếp không trigger re-render. Trong code chung, mutate gây side effect khó debug.

```js
// VẤN ĐỀ trong React
const addTodo = (text) => {
  todos.push({ id: Date.now(), text }); // SAI
  setTodos(todos); // cùng reference!
};

// Đúng
setTodos([...todos, { id: Date.now(), text }]);

// VẤN ĐỀ shared reference
function processOrders(orders) {
  orders.sort((a, b) => a.date - b.date); // mutate input!
  return orders[0];
}

const myOrders = [...]; // bị mutate sau khi gọi processOrders!
processOrders(myOrders);

// Fix — copy trước khi mutate
function processOrders(orders) {
  return [...orders].sort((a, b) => a.date - b.date)[0];
}

// Cập nhật array immutable
const arr = [1, 2, 3];

// Thêm
[...arr, 4]
// Xoá theo index
arr.filter((_, i) => i !== indexToRemove)
// Cập nhật theo index
arr.map((item, i) => i === index ? newValue : item)
// Insert
[...arr.slice(0, index), newItem, ...arr.slice(index)]
```

**Khi nào mutate được chấp nhận?**

```js
// 1. Variable local trong function (chưa expose ra ngoài)
function buildResult(items) {
  const result = []; // local
  for (const item of items) {
    result.push(transform(item)); // OK, local
  }
  return result;
}

// 2. Performance critical với immer (mutate draft)
import produce from 'immer';
const next = produce(state, draft => {
  draft.users[0].name = 'New'; // OK với immer
});
```

**Tip phỏng vấn:** *"Mặc định tôi không mutate. Exception duy nhất là local variable trong function hoặc dùng Immer."*

---

### Câu 11: Debug JS trên browser theo hướng nào?

**Quy trình debug có hệ thống:**

**Bước 1 — Reproduce:**

```
☐ Hành động cụ thể nào trigger lỗi?
☐ Lỗi xuất hiện 100% hay sporadic?
☐ Browser nào, OS nào?
☐ Có data đặc biệt không?
```

**Bước 2 — Quan sát error message:**

```js
// Console error có thông tin quan trọng:
// - Type of error (TypeError, ReferenceError)
// - Message
// - Stack trace — file, line, column

// Source maps phải có để stack trace readable
// production build → check vite.config: sourcemap: true
```

**Bước 3 — Strategic logging:**

```js
// Tệ — log tràn lan
console.log(data);
console.log('here');
console.log(123);

// Tốt — có context
console.log('[CartReducer] Adding item:', { item, currentCart });
console.log('[fetchUser] Response:', response);

// Bonus — console methods khác
console.table(arrayOfObjects); // table format
console.group('Process order');
console.log('Step 1');
console.log('Step 2');
console.groupEnd();
console.trace(); // call stack hiện tại
```

**Bước 4 — Breakpoints (mạnh hơn console):**

```
DevTools → Sources tab:
✓ Click line number → set breakpoint
✓ Conditional breakpoint: chỉ break khi điều kiện đúng
   (vd: user.id === 123)
✓ Logpoint: log mà không cần code, không pause
✓ XHR breakpoint: pause khi có request URL match
✓ DOM breakpoint: pause khi DOM bị modify

Khi pause:
- Watch panel: theo dõi expression
- Scope panel: xem tất cả variable
- Call stack: hành trình tới điểm hiện tại
- Step over (F10), Step into (F11)
```

**Bước 5 — Bisect & isolate:**

```js
// Comment out half code, bug còn không?
// Còn → bug ở phần còn lại
// Không → bug ở phần đã comment
// Tiếp tục bisect cho tới khi tìm ra dòng cụ thể

// Git bisect cho bug do regression
git bisect start
git bisect bad      // commit hiện tại có bug
git bisect good v1.0 // commit trước đó OK
// Git tự checkout commit giữa, bạn test
```

**Tip phỏng vấn:** *"Tôi không guess and check. Reproduce → log có context → breakpoint → bisect. Source maps là bắt buộc, kể cả production."*

---

### Câu 12: Bạn debug bug JS trên browser theo hướng nào?

(Đây là câu lặp với Q11 — interviewer có thể hỏi sâu hơn)

**Bộ tools quan trọng:**

```
1. Chrome DevTools
   - Console: log, errors, warnings
   - Sources: breakpoints, step debugging
   - Network: request/response
   - Application: localStorage, cookies, cache
   - Performance: profiling
   - Memory: heap snapshots

2. React DevTools
   - Components: tree, props, state, hooks
   - Profiler: render performance

3. Redux/Zustand DevTools
   - Time travel debugging
   - Action history

4. Browser-specific
   - Safari Web Inspector
   - Firefox DevTools (CSS Grid debugger tốt nhất)
```

**Pattern debug nâng cao:**

```js
// 1. debugger statement trong code
function complexLogic(input) {
  debugger; // pause khi DevTools mở
  // ...
}

// 2. Conditional breakpoint
// Right-click breakpoint → Edit breakpoint
// Condition: user.role === 'admin' && order.total > 1000

// 3. console.assert
console.assert(value > 0, 'Value should be positive', { value });
// Chỉ log khi assertion fail

// 4. Performance debugging
console.time('expensive');
expensiveOperation();
console.timeEnd('expensive'); // expensive: 234.5ms

// 5. Error boundary để catch React errors
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Boundary caught:', error, errorInfo);
    Sentry.captureException(error, { contexts: { react: errorInfo } });
  }
}
```

**Tip phỏng vấn:** Show kinh nghiệm với cụ thể tool — *"Tôi dùng Sentry breadcrumbs để trace user actions trước crash."*

---

## Phần 2A: Browser, DOM & Render

### Câu 13: Browser render một trang web theo các bước nào?

**Trả lời ngắn:** 5 bước — Parse HTML → CSSOM → Render Tree → Layout → Paint → Composite.

```
HTML  →  DOM tree  ┐
                   ├→ Render Tree → Layout → Paint → Composite
CSS   →  CSSOM    ┘
```

**Chi tiết từng bước:**

1. **Parse HTML** → tạo DOM tree
2. **Parse CSS** → tạo CSSOM tree
3. **Render Tree** = DOM + CSSOM (chỉ chứa visible nodes — bỏ `display: none`, `<head>`, comment)
4. **Layout (Reflow)** — tính toạ độ, kích thước từng element
5. **Paint** — vẽ pixels (text, color, border, shadow)
6. **Composite** — gộp các layer (transform, opacity dùng GPU)

**Vì sao quan trọng cho debug/optimize:**

```html
<!-- CSS blocking render — luôn để ở <head> -->
<link rel="stylesheet" href="styles.css">

<!-- JS blocking parse — dùng defer hoặc đặt cuối body -->
<script defer src="app.js"></script>

<!-- Preload resource quan trọng -->
<link rel="preload" href="hero.jpg" as="image">
```

**Tip phỏng vấn:** Câu hỏi follow-up hay gặp — *"Tại sao đặt script ở cuối body?"* Vì JS block HTML parsing, làm chậm First Contentful Paint. Nói thêm về `defer` (chờ HTML parse xong) vs `async` (load xong là chạy ngay) là điểm cộng.

---

### Câu 14: Reflow và repaint — khi nào làm UI chậm?

**Trả lời ngắn:** Reflow = tính lại layout (tốn kém). Repaint = vẽ lại màu sắc (rẻ hơn). Transform/opacity không trigger cả 2 vì chạy trên GPU.

**Phân loại thao tác:**

```js
// Trigger REFLOW (tốn kém nhất)
element.offsetWidth;              // đọc layout
element.getBoundingClientRect();
element.style.width = '200px';    // đổi kích thước
element.style.display = 'block';

// Chỉ trigger REPAINT
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.visibility = 'hidden';

// KHÔNG trigger reflow/repaint (GPU compositing)
element.style.transform = 'translateX(100px)';
element.style.opacity = '0.5';
```

**Bug "layout thrashing" — đọc/ghi xen kẽ:**

```js
// SAI — reflow nhiều lần trong loop
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
  const width = box.offsetWidth;          // đọc → reflow
  box.style.width = width * 2 + 'px';     // ghi → invalidate
  // Lần sau đọc lại → reflow again!
});

// ĐÚNG — đọc tất cả trước, ghi tất cả sau
const widths = [...boxes].map(b => b.offsetWidth); // đọc batch
boxes.forEach((box, i) => {
  box.style.width = widths[i] * 2 + 'px';          // ghi batch
});
```

**Tip phỏng vấn:** Nhắc tới Chrome DevTools → Performance tab → record interaction. Bar màu **tím là Layout (reflow)**, **xanh là Paint**. Nhiều bar tím liên tiếp = đang thrashing.

---

### Câu 15: DOM vs Virtual DOM — góc nhìn thực dụng?

**Trả lời ngắn:** DOM thật trong browser (chậm khi update nhiều). Virtual DOM là JS object — framework so sánh (diff) rồi chỉ update phần thay đổi vào DOM thật.

**Hiểu sai phổ biến:** Virtual DOM KHÔNG tự động làm mọi thứ nhanh. Nếu re-render quá nhiều, vẫn chậm.

```jsx
// BUG: re-render 1000 items khi 1 item đổi
function List({ items }) {
  return items.map(item =>
    <ItemCard key={item.id} item={item} />
    // Mọi ItemCard re-render khi parent state đổi!
  );
}

// FIX 1: React.memo
const ItemCard = React.memo(({ item }) => {
  return <div>{item.name}</div>;
});
// Chỉ re-render khi item prop đổi

// FIX 2: useMemo cho computed value
const expensiveResult = useMemo(() => {
  return items.filter(i => i.active).sort();
}, [items]);

// FIX 3: Virtualization cho list lớn
import { FixedSizeList } from 'react-window';
<FixedSizeList itemCount={10000} itemSize={50} height={400}>
  {Row}
</FixedSizeList>
// Chỉ render items đang visible trong viewport
```

**Tip phỏng vấn:** Dùng câu này để khoe kinh nghiệm — *"Trong dự án X, list 5000 rows lag. Tôi dùng react-window, FPS từ 15 lên 60."* Cụ thể luôn đắt giá.

---

### Câu 16: Event bubbling & capturing — bug thực tế?

**Trả lời ngắn:** Event đi qua 3 phase: capturing (xuống) → target → bubbling (lên). Listener mặc định gắn ở phase bubbling.

```
       capturing ↓        bubbling ↑
document  →  body  →  div.modal  →  button (target)
```

**Bug kinh điển — modal click outside to close:**

```js
// BUG: click trong modal cũng làm close
document.querySelector('.overlay').addEventListener('click', closeModal);
// Vì click .modal-content bubble lên .overlay!

// FIX 1: stopPropagation (không khuyến khích lạm dụng)
document.querySelector('.modal-content')
  .addEventListener('click', (e) => e.stopPropagation());

// FIX 2: check target (sạch hơn)
overlay.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
  // currentTarget = element gắn listener
  // target = element bị click
});
```

**Event delegation — pattern tốt cho list động:**

```js
// SAI — gắn 1000 listener cho 1000 item
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// ĐÚNG — gắn 1 listener ở parent, dùng bubbling
document.querySelector('.list').addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (item) handleClick(item.dataset.id);
});
// Hoạt động với cả item thêm sau!
```

**Tip phỏng vấn:** Phân biệt rõ — `stopPropagation()` chặn bubble, `preventDefault()` ngăn hành vi mặc định (form submit, link navigate). Hai cái khác nhau, đừng nhầm.

---

### Câu 17: addEventListener nhiều lần — rủi ro?

**Trả lời ngắn:** Handler bị gắn trùng → 1 click chạy 2-3-4 lần → memory leak nếu không cleanup.

```js
// BUG kinh điển trong React
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Không cleanup!
}); // thiếu deps array → effect chạy mỗi render
// → Listener ngày càng nhiều!

// FIX
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []); // chỉ chạy 1 lần khi mount

// removeEventListener phải dùng CÙNG REFERENCE!
// SAI
element.addEventListener('click', () => doSomething());
element.removeEventListener('click', () => doSomething()); // không xoá được!

// ĐÚNG
const handler = () => doSomething();
element.addEventListener('click', handler);
element.removeEventListener('click', handler); // OK

// Cách verify trong DevTools
// 1. Chọn element trong Elements tab
// 2. Sub-tab "Event Listeners"
// 3. Xem listener nào đang gắn
```

**Tip phỏng vấn:** Ngoài cleanup, nhắc tới `AbortController` — pattern modern cleanup nhiều listener cùng lúc:

```js
const controller = new AbortController();
element.addEventListener('click', h1, { signal: controller.signal });
element.addEventListener('scroll', h2, { signal: controller.signal });
// Cleanup tất cả 1 phát
controller.abort();
```

---

### Câu 18: Debounce vs throttle — dùng khi nào?

**Trả lời ngắn:** Debounce = chờ user dừng rồi mới chạy. Throttle = giới hạn tần suất tối đa.

| | Debounce | Throttle |
|---|---|---|
| Cơ chế | Chờ im lặng `delay` ms | Chạy tối đa 1 lần / `delay` ms |
| Use case | Search input, resize | Scroll, mousemove, drag |
| Ví dụ | Gõ → ngừng 300ms → fetch | Scroll → cập nhật mỗi 16ms |

```js
// DEBOUNCE — search input
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce(async (value) => {
  const data = await searchAPI(value);
  setResults(data);
}, 300); // 200-400ms là sweet spot UX

// THROTTLE — scroll handler
function throttle(fn, limit) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn(...args);
    }
  };
}

const handleScroll = throttle(() => {
  setShowHeader(window.scrollY > 100);
}, 16); // ~60fps

// Dùng trong React — wrap với useCallback hoặc useMemo
const debouncedSearch = useMemo(
  () => debounce(searchAPI, 300),
  [] // tạo 1 lần
);

useEffect(() => {
  return () => debouncedSearch.cancel?.(); // lodash hỗ trợ
}, [debouncedSearch]);
```

**Tip phỏng vấn:** Production luôn dùng `lodash.debounce` / `lodash.throttle`. Tự viết cũng được nhưng thiếu `cancel`, `flush`, `leading`, `trailing` options.

---

### Câu 19: requestAnimationFrame vs setTimeout cho animation?

**Trả lời ngắn:** `rAF` đồng bộ với frame render của browser (60fps mượt). `setTimeout(16)` có thể lệch nhịp gây giật.

```js
// SAI — setTimeout có thể lệch frame
let pos = 0;
function animate() {
  pos += 5;
  box.style.left = pos + 'px';
  setTimeout(animate, 16);
}

// ĐÚNG — rAF sync với render cycle
let pos = 0;
let animId;

function animate(timestamp) {
  pos += 5;
  box.style.transform = `translateX(${pos}px)`; // dùng transform!
  if (pos < 500) {
    animId = requestAnimationFrame(animate);
  }
}
animId = requestAnimationFrame(animate);
cancelAnimationFrame(animId); // cleanup khi cần

// rAF với delta time — mượt trên mọi device
let last = null;
function animate(timestamp) {
  if (!last) last = timestamp;
  const delta = timestamp - last;
  last = timestamp;

  pos += speed * (delta / 1000); // pixels per second
  element.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}
```

**3 ưu điểm khác của rAF:**

1. Tự pause khi tab background → tiết kiệm battery
2. Browser có thể batch nhiều rAF callbacks
3. Đảm bảo callback chạy trước paint → animation luôn smooth

**Tip phỏng vấn:** Khi possible, ưu tiên CSS animation/transition hơn JS — browser tối ưu được ở compositor thread. Dùng rAF khi cần logic phức tạp mà CSS không làm được (vd: physics, parallax).

---

### Câu 20: DOM update rồi nhưng UI không phản ánh — debug thế nào?

**Quy trình debug 4 bước:**

**Bước 1 — Verify DOM thực sự đã đổi:**

```js
// Mở DevTools → Elements tab
// Hoặc console:
console.log(document.querySelector('.my-element').outerHTML);
// Hoặc inspect bằng React DevTools (component state)
```

**Bước 2 — Check CSS che phủ:**

```css
/* Các nghi can phổ biến */
.element {
  display: none;        /* element bị ẩn hoàn toàn */
  visibility: hidden;   /* invisible nhưng vẫn chiếm chỗ */
  opacity: 0;           /* trong suốt */
  z-index: -1;          /* bị element khác đè lên */
  overflow: hidden;     /* parent cắt content */
  position: absolute;
  left: -9999px;        /* bị đẩy ra ngoài viewport */
}
```

**Bước 3 — Check React state vs UI:**

```jsx
// Stale state — closure cũ
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // count luôn = giá trị lúc mount!
  }, 1000);
  return () => clearInterval(id);
}, []); // thiếu count trong deps

// FIX: dùng updater function
setCount(c => c + 1); // luôn lấy giá trị mới nhất

// Mutate trực tiếp — không trigger re-render
items.push(newItem);  // SAI
setItems([...items, newItem]); // ĐÚNG
```

**Bước 4 — Check key trong list:**

```jsx
// SAI — dùng index làm key
{items.map((item, i) => <Item key={i} {...item} />)}
// Khi thêm/xoá giữa list, React reuse component sai

// ĐÚNG — dùng id ổn định
{items.map(item => <Item key={item.id} {...item} />)}
```

**Tip phỏng vấn:** Quy trình này show bạn không đoán mò. Bonus: nhắc tới React DevTools "Highlight updates when components render" để thấy re-render trực quan.

---

### Câu 21: Browser cache & bug sau deploy?

**Trả lời ngắn:** User thấy giao diện cũ vì browser cache JS/CSS từ deploy trước. Fix bằng cache busting + cache headers đúng.

**Vấn đề & giải pháp:**

```html
<!-- BUG: file name cố định, browser cache mãi -->
<script src="/app.js"></script>

<!-- FIX 1: Versioning với query string -->
<script src="/app.js?v=1.2.3"></script>

<!-- FIX 2: Hash trong filename (Webpack/Vite tự gen) -->
<script src="/app.a8f3c2d.js"></script>
<!-- File đổi → hash đổi → browser fetch mới -->
```

**Cache-Control headers — chiến lược chuẩn:**

```
# index.html — không cache (luôn fetch mới)
Cache-Control: no-cache, no-store, must-revalidate

# Static assets có hash — cache cực lâu
Cache-Control: public, max-age=31536000, immutable
# 1 năm + immutable = browser không cần check ETag
```

**Logic vì sao chiến lược này work:**

1. HTML không cache → user luôn lấy version mới
2. HTML mới reference các asset mới (hash mới)
3. Asset cũ vẫn cached cho user chưa reload → không lãng phí

**Debug cache issue:**

```
DevTools → Network tab:
  ✓ Disable cache (chỉ khi DevTools mở)
  ✓ Right-click reload icon → "Empty Cache and Hard Reload"
  ✓ Check Response Headers cột Cache-Control
  ✓ Status 200 (from disk cache) vs 200 (fresh)
```

**Tip phỏng vấn:** Nhắc tới Service Worker — nếu app dùng PWA, cache còn phức tạp hơn. SW có thể serve version cũ dù file mới đã deploy. Cần `skipWaiting()` + `clients.claim()` để force update.

---

### Câu 22: Quy trình debug bug chỉ xảy ra ở môi trường cụ thể?

**Quy trình 5 bước có hệ thống:**

**Bước 1 — Reproduce & Document:**
- Browser nào, version bao nhiêu?
- Device, OS, screen size?
- Logged in / out?
- Có extension không (Adblock, Dark Reader)?
- Bug 100% reproduce hay sporadic?

**Bước 2 — Bisect môi trường:**

```
Test theo thứ tự:
1. Incognito mode (loại extension, cookie cũ)
2. Browser khác (Chrome vs Safari vs Firefox)
3. Device khác (mobile vs desktop)
4. Network throttling (slow 3G)
5. Different account / data
```

**Bước 3 — Bisect code (git):**

```bash
# Khi nào bug xuất hiện?
git log --oneline --since="2 weeks ago"

# Tự động tìm commit gây bug
git bisect start
git bisect bad           # commit hiện tại có bug
git bisect good v1.2.0   # commit trước đó OK
# Git checkout commit giữa, bạn test rồi đánh dấu good/bad
# Sau ~log2(N) lần, ra commit chính xác
```

**Bước 4 — Cô lập:**

```js
// Tạo minimal reproduction
// Tách component bị lỗi ra Storybook hoặc CodeSandbox
// Bỏ dần code không liên quan cho tới khi bug biến mất
// → biết chính xác phần nào gây ra
```

**Bước 5 — Verify fix:**

- Test trên đúng môi trường gốc gây bug
- Test cả các môi trường khác (đừng break thứ đang chạy)
- Add regression test nếu được

**Tip phỏng vấn:** Câu hỏi này ăn điểm khi bạn show được pattern *"không đoán, không sửa thử nhiều chỗ cùng lúc"*. Nhắc tới `git bisect` rất ấn tượng — nhiều dev không biết tool này.

---

## Phần 2B: HTML & CSS

### Câu 23: Box model gồm những gì và ảnh hưởng layout ra sao?

**Trả lời ngắn:** 4 lớp từ trong ra ngoài — content → padding → border → margin. Mặc định `width` chỉ tính content, dẫn tới element bị tràn nếu cộng padding/border.

```
┌─────────────────────────────┐
│         margin              │
│  ┌───────────────────────┐  │
│  │      border           │  │
│  │  ┌─────────────────┐  │  │
│  │  │    padding      │  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  content  │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Bug kinh điển — element bị tràn:**

```css
/* SAI — width 200px nhưng thực tế chiếm 240px */
.card {
  width: 200px;
  padding: 16px;     /* +32px */
  border: 4px solid; /* +8px */
  /* Total: 240px → vỡ layout grid! */
}

/* FIX — box-sizing: border-box */
.card {
  box-sizing: border-box;
  width: 200px;
  padding: 16px;
  border: 4px solid;
  /* Total: 200px (padding/border tính vào width) */
}

/* Best practice — apply globally */
*, *::before, *::after {
  box-sizing: border-box;
}
```

**Margin collapse — cái bẫy nữa:**

```css
.box-1 { margin-bottom: 30px; }
.box-2 { margin-top: 20px; }
/* Khoảng cách giữa 2 box = 30px (lấy max), KHÔNG phải 50px! */

/* Tránh collapse: dùng padding parent, hoặc flex/grid gap */
.parent {
  display: flex;
  flex-direction: column;
  gap: 16px; /* không bị collapse */
}
```

**Tip phỏng vấn:** Mở DevTools → Elements → tab "Computed" → scroll xuống dưới có sơ đồ box model trực quan. Nhắc tới điều này show bạn debug có hệ thống.

---

### Câu 24: display: block, inline, inline-block khác nhau thực tế?

**Trả lời ngắn:**

| | block | inline | inline-block |
|---|---|---|---|
| Chiếm ngang | Full width | Vừa content | Vừa content |
| Xuống dòng | Có | Không | Không |
| Set width/height | OK | **Không** | OK |
| Margin top/bottom | OK | **Không** | OK |
| Padding ngang | OK | OK | OK |
| Padding dọc | OK | Có nhưng không đẩy element khác | OK |

```html
<!-- block: <div>, <p>, <h1>, <section> -->
<div>Chiếm full width, tự xuống dòng</div>

<!-- inline: <span>, <a>, <strong>, <em> -->
<span>Đứng cùng dòng với text</span>

<!-- inline-block: vừa inline (không xuống dòng) vừa block (set kích thước) -->
<button>Click me</button> <!-- mặc định inline-block -->
```

**Bug thực tế — canh icon với text:**

```css
/* SAI — icon lệch khỏi text */
.icon {
  display: inline;
  width: 16px;  /* không có hiệu lực! */
  height: 16px; /* không có hiệu lực! */
}

/* FIX 1 — inline-block */
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle; /* canh giữa với text */
}

/* FIX 2 — flex (modern, recommended) */
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

**Khoảng trắng inline-block — bug nhức đầu:**

```html
<!-- 3 button có khoảng trắng giữa do whitespace HTML -->
<button>A</button>
<button>B</button>
<button>C</button>

<!-- Fix cũ: bỏ whitespace -->
<button>A</button><button>B</button><button>C</button>

<!-- Fix mới: dùng flex/gap -->
<div style="display: flex; gap: 0">
  <button>A</button>
  <button>B</button>
  <button>C</button>
</div>
```

**Tip phỏng vấn:** Thay vì cố nhồi inline-block, modern code dùng `flex` cho mọi layout 1 chiều. Nhắc điều này show bạn cập nhật.

---

### Câu 25: Flexbox vs Grid — chọn cái nào khi nào?

**Trả lời ngắn:** Flex cho 1 chiều (row HOẶC column). Grid cho 2 chiều (row VÀ column). Khi nghi ngờ → flex đơn giản hơn.

| Use case | Tool | Tại sao |
|---|---|---|
| Navbar (logo trái, menu phải) | Flex | 1 chiều, content size khác nhau |
| Card list responsive | Grid | 2 chiều, đều |
| Form 2 cột | Grid | Cần align cột |
| Center 1 element | Flex | Đơn giản nhất |
| Dashboard layout | Grid | Sidebar + header + main |
| Tag/chip list | Flex wrap | Items size linh hoạt |
| Sticky footer | Flex column | Min-height + flex grow |

**Code mẫu thực dụng:**

```css
/* PATTERN 1: Center perfect (flex) */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* PATTERN 2: Card grid responsive (grid) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  /* Tự động responsive — không cần media query! */
}

/* PATTERN 3: Holy grail layout (grid) */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

/* PATTERN 4: Sticky footer (flex) */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main { flex: 1; } /* push footer xuống */

/* PATTERN 5: Navbar (flex) */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
```

**Kết hợp Flex + Grid:**

```css
/* Grid cho macro layout, Flex cho từng card */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.card {
  display: flex;
  flex-direction: column;
}
.card-footer {
  margin-top: auto; /* push xuống dưới */
}
```

**Tip phỏng vấn:** *"Tôi dùng Grid cho tổng thể trang, Flex cho component nhỏ"* — câu trả lời ngắn gọn, đúng pattern thực tế.

---

### Câu 26: position relative, absolute, fixed, sticky?

**Trả lời ngắn:**

| Position | Định vị theo | Chiếm chỗ | Use case |
|---|---|---|---|
| `static` | Flow bình thường | Có | Mặc định |
| `relative` | Chính nó | Có | Anchor cho child absolute |
| `absolute` | Ancestor có position ≠ static | **Không** | Overlay, dropdown, badge |
| `fixed` | Viewport | **Không** | Header cố định, modal |
| `sticky` | Scroll container | Có | Section header, table header |

**Bug 1: absolute lệch vị trí (thiếu relative parent):**

```css
/* SAI — badge bị position theo <body>! */
.card {
  /* không có position */
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

/* FIX — parent cần position: relative */
.card {
  position: relative; /* tạo positioning context */
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

**Bug 2: sticky không hoạt động:**

```css
/* SAI — không stick! */
.sidebar {
  position: sticky;
  top: 0;
}
.parent {
  overflow: hidden; /* HỎNG sticky! */
  /* hoặc overflow: auto, overflow: scroll */
}

/* Lý do — sticky chỉ work khi:
   1. Parent KHÔNG có overflow: hidden/auto/scroll
   2. Parent có chiều cao đủ lớn để scroll
   3. Sticky element có top/bottom/left/right
*/

/* FIX */
.parent {
  /* bỏ overflow */
}
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
}
```

**Bug 3: z-index không có tác dụng:**

```css
/* SAI — z-index ignore */
.element {
  z-index: 999; /* không tác dụng nếu position: static! */
}

/* FIX */
.element {
  position: relative; /* hoặc absolute, fixed, sticky */
  z-index: 999;
}
```

**Stacking context — bẫy thường gặp:**

```css
/* z-index 999 nhưng vẫn bị element khác đè! */
.parent {
  opacity: 0.9; /* tạo stacking context mới! */
  /* Hoặc: transform, filter, will-change */
}
.child {
  z-index: 999; /* chỉ so với siblings trong parent này */
}
.outside-element {
  z-index: 1; /* nhưng outside stacking context của parent */
  /* → có thể đè child dù z-index thấp hơn! */
}
```

**Tip phỏng vấn:** Nhắc `transform`, `opacity < 1`, `filter` tạo stacking context — kiến thức này phân biệt junior với senior. Nhiều người chỉ biết `z-index` mà không biết khi nào nó "thua".

---

### Câu 27: CSS specificity và !important?

**Trả lời ngắn:** Specificity tính theo công thức `(inline, ID, class, element)`. Selector càng cụ thể càng ưu tiên cao.

**Bảng tính specificity:**

| Selector | (a, b, c, d) | Score |
|---|---|---|
| `*` | 0,0,0,0 | 0 |
| `div` | 0,0,0,1 | 1 |
| `.btn` | 0,0,1,0 | 10 |
| `.btn:hover` | 0,0,2,0 | 20 |
| `#header .btn` | 0,1,1,0 | 110 |
| `style="..."` (inline) | 1,0,0,0 | 1000 |
| `!important` | thắng tất cả | ∞ |

```css
/* Battle: cái nào thắng? */
.button { color: red; }        /* 0,0,1,0 = 10 */
button.primary { color: blue; } /* 0,0,1,1 = 11 → THẮNG */
#main button { color: green; }  /* 0,1,0,1 = 101 → THẮNG TIẾP */
```

**Triệu chứng & nghi can:**

```
Triệu chứng: "Sửa CSS đúng file, save rồi mà UI không đổi"

Nghi can theo thứ tự:
1. Specificity — có selector khác chuyên hơn đang đè
2. Source order — CSS load sau đè CSS load trước
3. Inline style đè external CSS
4. !important đè mọi thứ
5. CSS bị cache (hard reload)
6. Compiled CSS chưa rebuild
```

**Cách debug đúng — KHÔNG xài !important:**

```css
/* ANTI-PATTERN — !important war */
.btn { background: red !important; }
.btn-special { background: blue !important; } /* phải !important đấu lại */

/* ĐÚNG — đơn giản hoá selector */
.btn { background: red; }
.btn.special { background: blue; } /* class thứ 2 thắng */
```

**Modern solution — CSS layers (2023+):**

```css
@layer base, components, utilities;

@layer base {
  button { color: red; } /* layer base */
}

@layer utilities {
  .text-blue { color: blue; } /* layer utilities thắng base, dù selector yếu hơn! */
}
/* Layer order quyết định, không phải specificity */
```

**Tip phỏng vấn:** *"Tôi tránh !important vì nó tạo nợ kỹ thuật. Khi cần override, tôi tăng specificity bằng cách thêm class hoặc dùng CSS Modules/Tailwind."* Nhắc CSS layers là điểm cộng cho modern knowledge.

---

### Câu 28: CSS bị override sai — debug thế nào?

**Quy trình 4 bước:**

**Bước 1 — DevTools Elements → Styles panel:**

```
Mở DevTools (F12) → click element bị lỗi → tab "Styles":

✓ Rule nào có gạch ngang = bị override
✓ Rule nào màu đậm = đang active
✓ Hover qua selector → thấy specificity (x, y, z)
✓ Click ":hov" để force trạng thái hover/focus
✓ Click ".cls" để toggle class on/off
```

**Bước 2 — Computed tab — biết giá trị final:**

```
Tab "Computed" → search property (vd: "color"):
✓ Thấy giá trị cuối cùng
✓ Click mũi tên → trace ngược về rule nào set
✓ Hữu ích khi nhiều rule cùng set property
```

**Bước 3 — Check thứ tự load CSS:**

```html
<!-- File sau đè file trước nếu specificity bằng nhau -->
<link rel="stylesheet" href="reset.css">    <!-- load 1st -->
<link rel="stylesheet" href="components.css"> <!-- override reset -->
<link rel="stylesheet" href="overrides.css"> <!-- thắng cuối -->

<!-- Inline luôn thắng external (nếu cùng specificity) -->
<style>
  .btn { color: red; }
</style>
```

**Bước 4 — CSS Modules / Scoped — naming collision:**

```css
/* CSS Modules tạo class hash unique */
/* Button.module.css */
.btn { color: red; }
/* → compile thành .Button_btn__a8f3c */

/* Tránh collision với global CSS */
/* Nhưng cẩn thận :global() escape */
:global(.btn) { color: blue; } /* override toàn app! */
```

**Bonus — debug nhanh bằng outline:**

```css
/* Tạm thời để debug — viền đỏ mọi element */
* { outline: 1px solid red; }

/* Hoặc highlight element cụ thể */
.suspicious-element {
  outline: 3px solid lime !important;
  background: rgba(255, 0, 0, 0.2) !important;
}
```

**Tip phỏng vấn:** *"Tôi luôn debug bằng DevTools trước khi sửa code"* — câu này show kỷ luật. Đặc biệt nhấn mạnh tab Computed — nhiều người chỉ biết Styles tab.

---

### Câu 29: Responsive design — làm sao UI không vỡ?

**Triết lý:** Mobile-first → start với mobile, scale up. Dễ hơn desktop-first vì mobile constraint khắc nghiệt hơn.

**Breakpoints chuẩn:**

```css
/* Mobile-first */
.container {
  padding: 16px; /* mobile mặc định */
}

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 32px; }
}

/* Large desktop */
@media (min-width: 1440px) {
  .container { max-width: 1280px; margin: 0 auto; }
}
```

**Modern responsive — ít hoặc không cần media query:**

```css
/* 1. Grid auto-fit — responsive miễn phí */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
/* 1 cột trên mobile, 4 cột trên desktop — tự động! */

/* 2. clamp() — fluid typography */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
  /* min: 1.5rem, max: 3rem, scale theo viewport */
}

/* 3. Container queries (modern) */
.card-container {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { display: flex; } /* responsive theo container, không phải viewport */
}

/* 4. aspect-ratio — không cần padding hack */
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

**Test với content thực tế (đừng test với "Lorem ipsum"):**

```jsx
// Test edge cases:
const testCases = [
  { name: "Bob", title: "CEO" },                          // ngắn
  { name: "Nguyễn Văn Long Hoàng Tử", title: "Senior Software Engineer" }, // dài
  { name: "Anh", title: "Manager", emoji: "🎉🚀💯" },   // emoji
  { name: "محمد", title: "مهندس" },                      // RTL
];
```

**Common bugs:**

```css
/* BUG: text dài làm vỡ layout */
.card-title {
  /* mặc định overflow ra ngoài */
}
/* FIX */
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* hoặc multi-line: */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* BUG: ảnh kéo dãn layout */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* BUG: 100vh trên mobile bị thừa do address bar */
.full-screen {
  height: 100vh;        /* SAI trên mobile */
  height: 100dvh;       /* ĐÚNG — dynamic viewport */
}
```

**Tip phỏng vấn:** *"Tôi test responsive bằng DevTools Device Mode + thực tế trên device. Có lần bug chỉ xuất hiện trên iPhone Safari vì 100vh."* — câu chuyện cụ thể luôn ấn tượng.

---

### Câu 30: Accessibility cơ bản trong HTML/CSS?

**Trả lời ngắn:** A11y không phải thêm `aria-*` cho có. Bắt đầu từ semantic HTML, sau đó label, focus, contrast, keyboard navigation.

**Checklist 7 điểm:**

**1. Semantic HTML — quan trọng nhất:**

```html
<!-- SAI — div soup -->
<div class="header">
  <div class="nav">
    <div class="link" onclick="navigate()">Home</div>
  </div>
</div>

<!-- ĐÚNG — semantic -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<!-- Screen reader hiểu cấu trúc, keyboard navigate được -->
```

**2. Label cho form:**

```html
<!-- SAI — không có label -->
<input type="email" placeholder="Email" />

<!-- ĐÚNG — explicit label -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Hoặc wrap -->
<label>
  Email
  <input type="email" />
</label>

<!-- Khi không thể show label visually -->
<input type="search" aria-label="Search products" />
```

**3. Focus state visible:**

```css
/* SAI — xoá outline = giết keyboard nav */
button:focus { outline: none; }

/* ĐÚNG — chỉ ẩn cho mouse, giữ cho keyboard */
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}
```

**4. Color contrast — WCAG AA tối thiểu 4.5:1:**

```css
/* FAIL — contrast 2.8:1 */
.text { color: #aaa; background: white; }

/* PASS — contrast 7.2:1 */
.text { color: #595959; background: white; }

/* DevTools → Inspect element → Color picker
   → tự hiển thị contrast ratio + WCAG status */
```

**5. Keyboard navigation:**

```html
<!-- SAI — div không nhận keyboard -->
<div onclick="doStuff()">Click me</div>

<!-- ĐÚNG — dùng button, hoặc nếu phải dùng div: -->
<div
  role="button"
  tabindex="0"
  onclick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  Click me
</div>

<!-- Tốt nhất: dùng <button> -->
<button onClick={handleClick}>Click me</button>
```

**6. Image alt text:**

```html
<!-- Ảnh truyền thông tin -->
<img src="chart.png" alt="Sales increased 30% in Q3 2024" />

<!-- Ảnh trang trí -->
<img src="divider.svg" alt="" />
<!-- alt rỗng = screen reader bỏ qua -->

<!-- Icon button -->
<button aria-label="Close modal">
  <svg>...</svg>
</button>
```

**7. Heading hierarchy:**

```html
<!-- SAI — skip levels -->
<h1>Title</h1>
<h4>Subtitle</h4> <!-- skip h2, h3 -->

<!-- ĐÚNG -->
<h1>Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<!-- Mỗi page có 1 h1 duy nhất -->
```

**Tools để test:**

```
✓ axe DevTools extension — quét tự động
✓ Lighthouse → Accessibility tab
✓ Tab key navigation — thử dùng bàn phím xem flow OK không
✓ VoiceOver (Mac) / NVDA (Windows) — screen reader test
✓ Chrome DevTools → Rendering → Emulate vision deficiencies
```

**Tip phỏng vấn:** *"A11y không phải compliance checkbox. Semantic HTML đúng + keyboard navigate được → đã giải quyết 80% vấn đề. ARIA chỉ thêm khi HTML không đủ."* Câu này show bạn hiểu nguyên lý chứ không học vẹt.

---

## Phần 3A: React Fundamentals

### Câu 31: React giải quyết vấn đề gì so với JS thuần?

**Trả lời ngắn:** React giải quyết 3 vấn đề lớn — (1) tổ chức UI thành component tái sử dụng, (2) đồng bộ UI với data tự động, (3) quản lý DOM hiệu quả qua Virtual DOM.

**So sánh imperative vs declarative:**

```js
// JS thuần — IMPERATIVE (làm thế nào)
function updateCounter() {
  const el = document.getElementById('count');
  let count = parseInt(el.textContent);
  count++;
  el.textContent = count;

  // Cập nhật badge nếu count > 10
  const badge = document.getElementById('badge');
  if (count > 10) {
    badge.style.display = 'block';
    badge.textContent = 'High!';
  } else {
    badge.style.display = 'none';
  }
}
// → Phải nhớ update mọi nơi liên quan, dễ sót!

// React — DECLARATIVE (mô tả UI nhìn ra sao)
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <span>{count}</span>
      {count > 10 && <span className="badge">High!</span>}
    </>
  );
}
// → Mô tả UI = f(state). React tự lo update.
```

**Khi nào React over-engineering?**

- Landing page tĩnh → HTML thuần đủ
- Trang ít interaction → Vanilla JS + template
- App có >10 component, nhiều state, nhiều route → React phát huy

**Tip phỏng vấn:** Câu trả lời tệ là *"React làm UI nhanh hơn"*. Câu trả lời tốt là *"React giúp code dễ maintain khi UI phức tạp"*. Performance không phải lý do chính.

---

### Câu 32: State vs props khác nhau trong dự án thật?

**Trả lời ngắn:** Props = dữ liệu từ ngoài truyền vào (read-only). State = dữ liệu nội bộ component, có thể thay đổi.

| | Props | State |
|---|---|---|
| Nguồn | Parent component | Chính component |
| Thay đổi | Read-only | Mutable qua setter |
| Trigger re-render | Có (khi parent đổi) | Có (khi setState) |
| Use case | Cấu hình, data từ ngoài | UI state nội bộ |

```jsx
// PROPS — dữ liệu cấu hình từ ngoài
function Button({ label, onClick, variant = 'primary' }) {
  return <button className={variant} onClick={onClick}>{label}</button>;
}

// STATE — dữ liệu nội bộ
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// PHỐI HỢP — nâng state lên parent, truyền xuống qua props
function Parent() {
  const [user, setUser] = useState(null);
  return (
    <>
      <LoginForm onLogin={setUser} />
      <UserProfile user={user} /> {/* user là props ở đây */}
    </>
  );
}
```

**Anti-pattern — copy props vào state:**

```jsx
// SAI — duplicate dữ liệu, dễ lệch
function Profile({ user }) {
  const [name, setName] = useState(user.name); // copy props!
  // Nếu user.name đổi từ ngoài, name vẫn giữ giá trị cũ!
  return <div>{name}</div>;
}

// ĐÚNG — dùng props trực tiếp
function Profile({ user }) {
  return <div>{user.name}</div>;
}

// Trừ khi cần edit form trước khi save
function EditProfile({ user, onSave }) {
  const [name, setName] = useState(user.name); // OK — local edit
  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => onSave(name)}>Save</button>
    </>
  );
}
```

**Tip phỏng vấn:** *"Tôi không nhét mọi thứ vào state. Nếu giá trị tính được từ props/state khác, dùng biến thường hoặc useMemo."* Câu này show bạn không over-engineer.

---

### Câu 33: Khi nào component bị re-render?

**4 nguyên nhân:**

1. State thay đổi (`setState` được gọi)
2. Props thay đổi
3. Parent re-render → tất cả children re-render (mặc định)
4. Context value thay đổi

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveChild /> {/* re-render mỗi lần count đổi! */}
    </>
  );
}

// FIX 1: React.memo
const ExpensiveChild = React.memo(() => {
  console.log('render');
  return <div>...</div>;
});
// Chỉ re-render khi props đổi (shallow compare)

// BẪY — function/object props phá memo
function Parent() {
  return <Child onClick={() => doStuff()} />;
  // {() => doStuff()} là function MỚI mỗi render!
  // → memo không hiệu lực
}

// FIX 2: useCallback
function Parent() {
  const handleClick = useCallback(() => doStuff(), []);
  return <Child onClick={handleClick} />; // cùng reference
}

// FIX 3: useMemo cho object props
const config = useMemo(() => ({ theme: 'dark' }), []);
<Child config={config} />;
```

**setState với cùng giá trị — có re-render không?**

```jsx
const [count, setCount] = useState(5);

setCount(5); // Object.is check → KHÔNG re-render
setCount(6); // có re-render

// Nhưng với object/array
const [user, setUser] = useState({ name: 'Alice' });
setUser({ name: 'Alice' }); // CÓ re-render! (reference khác)
```

**Tip phỏng vấn:** Mở React DevTools → Profiler → record interaction. Component nào re-render nhiều, bao lâu, vì sao. Nhắc Profiler là điểm cộng lớn.

---

### Câu 34: useState vs useRef khi nào?

**Trả lời ngắn:** `useState` cho data trigger render. `useRef` cho data persist qua render nhưng KHÔNG trigger render.

| | useState | useRef |
|---|---|---|
| Persist qua render | ✓ | ✓ |
| Trigger re-render | ✓ | ✗ |
| Sync hay async | Async | Sync (immediate) |
| Use case | UI data | DOM ref, timer id, mutable value |

```jsx
// useRef CASE 1: DOM reference
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // truy cập DOM thật
  }, []);

  return <input ref={inputRef} />;
}

// useRef CASE 2: Lưu timer id
function Timer() {
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(tick, 1000);
  };
  const stop = () => clearInterval(intervalRef.current);

  return <>...</>;
}

// useRef CASE 3: Track previous value
function PriceTracker({ price }) {
  const prevPrice = useRef(price);

  useEffect(() => {
    if (price > prevPrice.current) console.log('Tăng!');
    prevPrice.current = price;
  }, [price]);
}

// useRef CASE 4: Tránh stale closure
function Chat() {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    socket.on('message', (msg) => {
      // messagesRef.current luôn là giá trị mới nhất
      // (messages biến local sẽ stale!)
      setMessages([...messagesRef.current, msg]);
    });
  }, []); // không cần dependency
}
```

**Anti-pattern — dùng useRef thay state:**

```jsx
// SAI — UI không update
function Counter() {
  const count = useRef(0);

  return (
    <button onClick={() => count.current++}>
      {count.current} {/* không re-render khi click! */}
    </button>
  );
}

// ĐÚNG — dùng state cho UI
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Tip phỏng vấn:** *"useRef cho 'tôi cần nhớ giá trị nhưng không muốn UI cập nhật'. useState cho 'giá trị này hiển thị trên UI'."*

---

### Câu 35: useEffect hay bị dùng sai ở đâu?

**5 lỗi phổ biến nhất:**

**Lỗi 1 — Thiếu dependency:**

```jsx
// SAI — count luôn = 0 (stale closure)
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // luôn 0!
    }, 1000);
    return () => clearInterval(id);
  }, []); // thiếu count
}

// ĐÚNG
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, [count]); // đưa count vào deps
```

**Lỗi 2 — Vòng lặp vô hạn:**

```jsx
// SAI — infinite loop!
useEffect(() => {
  setUser({ ...user, lastSeen: Date.now() });
}, [user]); // user đổi → effect chạy → setUser → user đổi...

// ĐÚNG — không depend on giá trị mình set
useEffect(() => {
  setUser(u => ({ ...u, lastSeen: Date.now() }));
}, []); // chạy 1 lần
```

**Lỗi 3 — Object/array trong deps:**

```jsx
// SAI — config là object mới mỗi render!
function Component() {
  const config = { theme: 'dark' }; // mới mỗi render

  useEffect(() => {
    initApp(config);
  }, [config]); // chạy MỌI render!
}

// FIX 1 — đưa ra ngoài
const CONFIG = { theme: 'dark' };
useEffect(() => initApp(CONFIG), []);

// FIX 2 — useMemo
const config = useMemo(() => ({ theme: 'dark' }), []);
useEffect(() => initApp(config), [config]);
```

**Lỗi 4 — Dùng effect thay vì derived value:**

```jsx
// SAI — không cần effect!
function Cart({ items }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, i) => sum + i.price, 0));
  }, [items]);

  return <div>{total}</div>;
}

// ĐÚNG — tính trực tiếp khi render
function Cart({ items }) {
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return <div>{total}</div>;
}

// Nếu tính nặng → useMemo
const total = useMemo(
  () => items.reduce((sum, i) => sum + i.price, 0),
  [items]
);
```

**Lỗi 5 — Race condition khi fetch:**

```jsx
// SAI — response cũ có thể về sau, set vào state
useEffect(() => {
  fetch(`/api/user/${id}`).then(setUser);
}, [id]);

// ĐÚNG — cleanup với flag hoặc AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/user/${id}`, { signal: controller.signal })
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort();
}, [id]);
```

**Tip phỏng vấn:** Nhắc tới React docs *"You Might Not Need an Effect"* — page chính chủ React team viết về anti-patterns. Show bạn đọc tài liệu chính thống.

---

### Câu 36: Dependency array ảnh hưởng gì tới bug logic?

**3 trường hợp:**

```jsx
// 1. Không có deps → chạy mỗi render
useEffect(() => {
  console.log('every render');
});

// 2. Deps rỗng [] → chạy 1 lần khi mount
useEffect(() => {
  console.log('mount');
  return () => console.log('unmount');
}, []);

// 3. Có deps → chạy khi deps đổi
useEffect(() => {
  console.log('count changed');
}, [count]);
```

**Bug stale closure — case study:**

```jsx
function Form() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      // BUG: name có thể là giá trị cũ nếu deps sai
      sendAnalytics({ name });
    }
  }, [submitted]); // thiếu name!

  // FIX
  // }, [submitted, name]);
}
```

**Bug vòng lặp vô hạn — case study:**

```jsx
function UserList() {
  const [users, setUsers] = useState([]);

  // BUG — fetchUsers tạo mới mỗi render
  const fetchUsers = async () => {
    const data = await api.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // fetchUsers mới mỗi render → infinite loop!

  // FIX 1 — bỏ deps nếu function không phụ thuộc state
  useEffect(() => {
    fetchUsers();
  }, []);

  // FIX 2 — useCallback nếu cần stability
  const fetchUsers = useCallback(async () => {
    const data = await api.getUsers();
    setUsers(data);
  }, []);
}
```

**Tip phỏng vấn:** Cài ESLint plugin `eslint-plugin-react-hooks` rule `exhaustive-deps`. Auto detect thiếu deps. Nhắc điều này show bạn dùng tooling thay vì tự nhớ.

---

### Câu 37: Cleanup function dùng khi nào?

**5 trường hợp bắt buộc cleanup:**

```jsx
// 1. Event listener
useEffect(() => {
  const handler = () => console.log('resize');
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// 2. Timer / Interval
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);

// 3. Subscription (WebSocket, observable)
useEffect(() => {
  const subscription = chatService.subscribe(handleMessage);
  return () => subscription.unsubscribe();
}, []);

// 4. Fetch request
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(setData);
  return () => controller.abort();
}, [url]);

// 5. Animation
useEffect(() => {
  const id = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(id);
}, []);
```

**Bug "Can't perform setState on unmounted component":**

```jsx
// BUG — fetch chậm, user navigate đi → component unmount
// → setData chạy trên component đã unmount → warning
function Profile({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then(r => r.json())
      .then(setData);
  }, [id]);
}

// FIX với AbortController
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/user/${id}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });
  return () => controller.abort();
}, [id]);
```

**Cleanup chạy khi nào?**

```jsx
useEffect(() => {
  console.log('effect run');
  return () => console.log('cleanup run');
}, [count]);

// Flow:
// Mount: effect run
// count đổi: cleanup run → effect run (cleanup TRƯỚC effect mới)
// Unmount: cleanup run
```

**Tip phỏng vấn:** *"Mỗi useEffect tôi viết, tôi tự hỏi: cái gì cần cleanup? Không có thì OK, có thì return."* — quy trình rõ ràng.

---

### Câu 38: Controlled vs uncontrolled component?

**Trả lời ngắn:** Controlled = value do React state quản. Uncontrolled = value nằm trong DOM, dùng ref để đọc.

```jsx
// CONTROLLED — state quản
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// UNCONTROLLED — DOM tự quản, dùng ref đọc
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} defaultValue="" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

**Khi nào dùng cái nào?**

| Use case | Controlled | Uncontrolled |
|---|---|---|
| Validation realtime | ✓ | ✗ |
| Format khi gõ (phone, currency) | ✓ | ✗ |
| Disable button khi invalid | ✓ | ✗ |
| Show character count | ✓ | ✗ |
| Form đơn giản, validate khi submit | OK | ✓ |
| Performance với form rất lớn | ✗ | ✓ |
| File input | ✗ (impossible) | ✓ |

**Bug thường gặp với controlled:**

```jsx
// BUG 1 — value undefined → switching uncontrolled/controlled
function Input() {
  const [value, setValue] = useState(); // undefined!
  return <input value={value} onChange={...} />;
  // Warning: A component is changing uncontrolled to controlled
}
// FIX
const [value, setValue] = useState(''); // empty string

// BUG 2 — performance với form lớn
function HugeForm() {
  const [form, setForm] = useState({ /* 50 fields */ });
  // Mỗi keystroke → re-render TOÀN BỘ form!
}
// FIX 1 — react-hook-form (uncontrolled)
import { useForm } from 'react-hook-form';
const { register, handleSubmit } = useForm();
<input {...register('email')} />

// FIX 2 — split component, mỗi field tự manage state
```

**Tip phỏng vấn:** Production thực tế dùng `react-hook-form` (uncontrolled-style) cho form lớn vì performance tốt hơn nhiều. Câu này show bạn biết tooling.

---

### Câu 39: Lifting state up — trade-off?

**Trả lời ngắn:** Khi nhiều component cần share data, nâng state lên ancestor chung gần nhất. Trade-off: parent phình to, props drilling.

```jsx
// VẤN ĐỀ — 2 component cần share state
function App() {
  return (
    <>
      <SearchBar /> {/* state query */}
      <ResultList />  {/* cần biết query để filter */}
    </>
  );
}

// LIFT UP
function App() {
  const [query, setQuery] = useState(''); // nâng lên đây
  return (
    <>
      <SearchBar query={query} onChange={setQuery} />
      <ResultList query={query} />
    </>
  );
}
```

**Trade-off cụ thể:**

```jsx
// PROBLEM 1: Props drilling — khi cây sâu
<App>                    // state user ở đây
  <Layout>               // không dùng user, vẫn phải truyền
    <Sidebar>            // không dùng user, vẫn phải truyền
      <UserMenu>         // không dùng user, vẫn phải truyền
        <Avatar user={user} /> {/* mới dùng */}
      </UserMenu>
    </Sidebar>
  </Layout>
</App>

// PROBLEM 2: Parent re-render không cần thiết
function App() {
  const [searchQuery, setQuery] = useState('');
  // Mỗi keystroke → App re-render → toàn bộ children!
  return <>
    <Header /> {/* re-render dù không liên quan */}
    <SearchBar query={searchQuery} onChange={setQuery} />
    <Results query={searchQuery} />
    <Footer /> {/* re-render dù không liên quan */}
  </>;
}
```

**Khi nào lift, khi nào dừng?**

```
Decision tree:
1. State chỉ 1 component dùng → để local
2. 2-3 component sibling cần share → lift to parent (OK)
3. Sâu hơn 3 levels, nhiều component dùng → Context
4. Phức tạp, async, cross-cutting → state library (Zustand, Redux)
5. Server data → React Query / SWR (đừng lift!)
```

**Tip phỏng vấn:** *"Lift up là first instinct. Nhưng khi thấy props drilling 4-5 levels, tôi cân nhắc Context. Khi state phức tạp với async, tôi dùng Zustand. Server data thì React Query — không nên đặt vào client state."*

---

### Câu 40: Key trong list — rủi ro dùng index?

**Trả lời ngắn:** Key giúp React reconciliation nhận diện item nào là item nào giữa renders. Index làm key gây bug khi list thêm/xoá/sort.

**Bug minh hoạ — input bị "nhảy" focus:**

```jsx
// BUG — dùng index làm key
function TodoList({ todos }) {
  return todos.map((todo, i) => (
    <li key={i}>
      <input defaultValue={todo.text} />
    </li>
  ));
}

// Scenario:
// Initial: ["A", "B", "C"]
// User gõ "Hello" vào input của "B"
// Click delete "A"
// Mong đợi: input "Hello" theo "B"
// Thực tế: input "Hello" hiện ở "C" (vì key=1 giờ là C)!
```

**Tại sao xảy ra:**

```
Render 1: [<Input key=0/>, <Input key=1 value="Hello"/>, <Input key=2/>]
                A                B                          C

Sau khi xoá A:
Render 2: [<Input key=0/>, <Input key=1/>]
                B                C
React thấy:
- key=0 vẫn ở đó → giữ nguyên DOM (giờ là B nhưng input cũ của A)
- key=1 vẫn ở đó → giữ nguyên DOM (giờ là C nhưng input "Hello" của B!)
- key=2 bị xoá

→ "Hello" ở sai vị trí!
```

**FIX với id ổn định:**

```jsx
function TodoList({ todos }) {
  return todos.map(todo => (
    <li key={todo.id}> {/* id stable, không đổi */}
      <input defaultValue={todo.text} />
    </li>
  ));
}
```

**Khi nào index ÔKE?**

```jsx
// Index OK khi tất cả 3 điều kiện:
// 1. List static (không thêm/xoá/sort)
// 2. Items không có state riêng (input, checkbox...)
// 3. Items không có id

// VD: render array của constants
const SIZES = ['S', 'M', 'L', 'XL'];
SIZES.map((size, i) => <span key={i}>{size}</span>); // OK
```

**Anti-pattern khác — generate id mỗi render:**

```jsx
// SAI — mỗi render tạo uuid mới → React thấy như list mới hoàn toàn!
todos.map(todo => <li key={Math.random()}>{todo.text}</li>);
todos.map(todo => <li key={uuid()}>{todo.text}</li>);

// → Tất cả unmount + mount lại MỖI render!
// → Mất state, mất focus, performance tệ
```

**Tip phỏng vấn:** *"Key phải là id từ data, không phải index, không phải generate. Nếu data không có id, tôi gen 1 lần khi tạo data, không gen mỗi render."*

---

### Câu 41: Tổ chức component để dễ maintain?

**Cách phổ biến nhất — by feature (feature-based):**

```
src/
  features/
    auth/
      components/
        LoginForm.tsx
        SignupForm.tsx
      hooks/
        useAuth.ts
      api/
        authApi.ts
      types.ts
      index.ts          <- public API

    cart/
      components/
        CartItem.tsx
        CartSummary.tsx
      hooks/
        useCart.ts
      utils/
        calculateTotal.ts
      index.ts

  shared/              <- dùng chung
    components/
      Button.tsx
      Modal.tsx
    hooks/
      useDebounce.ts
    utils/
      formatDate.ts

  pages/
    HomePage.tsx
    CartPage.tsx
```

**Phân loại component theo trách nhiệm:**

```jsx
// 1. UI components (presentational) — pure, reusable
function Button({ children, onClick, variant = 'primary' }) {
  return <button className={variant} onClick={onClick}>{children}</button>;
}

// 2. Container components — fetch data, manage state
function UserProfile({ userId }) {
  const { data, loading, error } = useUser(userId);
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserCard user={data} />;
}

// 3. Layout components — chỉ cấu trúc, không logic
function PageLayout({ children, sidebar }) {
  return (
    <div className="layout">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

// 4. Custom hooks — share logic giữa components
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
```

**Naming convention:**

```
Components:    PascalCase            UserProfile.tsx
Hooks:         use prefix            useAuth.ts
Utils:         camelCase             formatDate.ts
Types:         PascalCase            User, AuthState
Constants:     UPPER_SNAKE           MAX_RETRIES
Boolean props: is/has/should prefix  isLoading, hasError
Event handlers: on/handle prefix     onClick, handleSubmit
```

**Khi nào tách component?**

```
DẤU HIỆU NÊN TÁCH:
✓ File > 200 dòng
✓ JSX có > 4 levels nesting
✓ Logic lặp lại 2-3 lần (DRY)
✓ Phần JSX có thể có name riêng (UserCard, ProductTable)
✓ Phần logic có thể test riêng

DẤU HIỆU KHÔNG NÊN TÁCH (premature):
✗ Chỉ dùng 1 lần và nhỏ
✗ Tách ra phải truyền 5+ props
✗ Tên component không tự nhiên
```

**Tip phỏng vấn:** *"Tôi tổ chức theo feature, không theo type. Folder 'features/cart' chứa mọi thứ về cart — components, hooks, api. Khi xoá feature, xoá 1 folder là xong."*

---

### Câu 42: Debug bug React khi UI không đúng?

**Quy trình 5 bước:**

**Bước 1 — Xác định state vs UI:**

```jsx
// Mở React DevTools → Components tab
// Click component bị lỗi → xem:
// - Props hiện tại
// - State hiện tại
// - Hooks values

// Hoặc add log
function Component({ data }) {
  console.log('render', { data, state });
  // ...
}
```

**Bước 2 — Trace data flow ngược:**

```
UI sai
  ↓ Component nào render?
  ↓ State/props nào quyết định?
  ↓ Cái gì set state đó?
  ↓ Event handler / useEffect nào trigger?
  ↓ Source data đến từ đâu?
```

**Bước 3 — Check render lifecycle:**

```jsx
function Debug() {
  // Track render count
  const renderCount = useRef(0);
  renderCount.current++;
  console.log(`Render #${renderCount.current}`);

  // Track effect runs
  useEffect(() => {
    console.log('effect ran', { state });
    return () => console.log('cleanup');
  }, [state]);
}

// React DevTools → Profiler → Record interaction
// Xem component nào render, render mấy lần, mất bao lâu
```

**Bước 4 — Common bug checklist:**

```
☐ State đổi nhưng UI không update?
  → Mutate trực tiếp? (push, splice, obj.x = y)
  → Cùng reference? (setUser(user))

☐ Effect chạy không đúng lúc?
  → Deps thiếu hoặc dư
  → Object/array trong deps không stable

☐ Stale data trong handler/effect?
  → Closure cũ, dùng useRef hoặc updater function

☐ Component re-render quá nhiều?
  → Inline function/object props
  → Context có value đổi liên tục
  → Cần memo / useMemo / useCallback

☐ List render sai?
  → Key dùng index, không phải id
```

**Bước 5 — Isolate & reproduce:**

```jsx
// Tạo minimal reproduction
// 1. Copy component bị lỗi sang sandbox
// 2. Bỏ dần code, props, deps
// 3. Cho tới khi bug biến mất → đó là nguyên nhân
// 4. Add lại từng cái, identify culprit chính xác
```

**Tools & extensions:**

```
✓ React DevTools — Components & Profiler tabs
✓ Why Did You Render — log lý do component re-render
✓ ESLint react-hooks plugin — bắt lỗi hooks
✓ Console: console.trace() — trace call stack
```

**Tip phỏng vấn:** *"Tôi bắt đầu từ React DevTools, không phải code. Xem state/props ở Components tab trước. Nếu state đúng nhưng UI sai → bug ở render. State sai → trace ngược lên setter."*

---

## Phần 3B: State Management & Production

### Câu 43: Local state vs global state khác nhau thế nào?

**Trả lời ngắn:** Local cho data nội bộ 1 component/screen. Global cho data dùng chung nhiều màn hình. Mặc định là local — chỉ nâng lên khi thực sự cần.

**Quyết định đặt state ở đâu:**

```
Câu hỏi: Có bao nhiêu component dùng data này?
  ├─ 1 component → useState local
  ├─ 2-3 sibling → lift up to parent
  ├─ Nhiều levels deep → Context (nếu data ổn định)
  └─ Nhiều screen, async, persist → state library hoặc URL

Câu hỏi: Data này từ đâu?
  ├─ User input UI (form, toggle) → local state
  ├─ Server data (user, products) → React Query/SWR
  ├─ URL state (filter, page) → useSearchParams
  └─ Persist storage (theme, lang) → localStorage + state
```

**Phân loại state thực dụng:**

```jsx
// 1. UI STATE — chỉ component này quan tâm
function Modal() {
  const [isOpen, setIsOpen] = useState(false); // local!
  // Không cần lift, không cần Context
}

// 2. FORM STATE — local hoặc thư viện
function LoginForm() {
  const { register, handleSubmit } = useForm(); // react-hook-form
}

// 3. SERVER STATE — đừng tự manage!
function ProductList() {
  // KHÔNG dùng useState + useEffect cho server data
  const { data, loading, error } = useQuery(['products'], fetchProducts);
  // React Query lo cache, refetch, dedup, race condition
}

// 4. URL STATE — đặt trong URL, không trong state
function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  // Lợi: shareable URL, back/forward hoạt động, refresh giữ state
}

// 5. GLOBAL APP STATE — auth, theme, cart
const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

function Header() {
  const user = useAuthStore(s => s.user); // dùng ở Header
}
function Profile() {
  const user = useAuthStore(s => s.user); // dùng ở Profile
}
```

**Anti-pattern — global hoá quá tay:**

```jsx
// SAI — đưa form input vào Redux/Zustand
const useFormStore = create((set) => ({
  email: '', setEmail: (v) => set({ email: v }),
  password: '', setPassword: (v) => set({ password: v }),
  // Ai care email field này ngoài form?
}));

// ĐÚNG — local state đủ rồi
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
}
```

**Tip phỏng vấn:** *"State có 4-5 loại khác nhau, tôi không quản tất cả bằng cùng 1 tool. Server state dùng React Query, URL state dùng searchParams, UI state local, global state mới dùng Zustand."*

---

### Câu 44: Props drilling gây vấn đề gì trong dự án lớn?

**Trả lời ngắn:** Props drilling = phải truyền props qua nhiều levels, dù component giữa không dùng. Vấn đề: code khó đọc, khó refactor, dễ truyền sai.

**Minh hoạ tệ:**

```jsx
// 5 levels deep — trung gian không dùng nhưng phải truyền
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) { // không dùng, chỉ truyền tiếp
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) { // không dùng
  return <UserSection user={user} setUser={setUser} />;
}

function UserSection({ user, setUser }) { // không dùng
  return <Avatar user={user} onLogout={() => setUser(null)} />;
}

function Avatar({ user, onLogout }) {
  return <img src={user?.avatar} onClick={onLogout} />;
}

// Vấn đề:
// - Refactor: thêm field profile → sửa 5 file
// - Đọc Layout: tưởng nó cần user, nhưng không
// - TypeScript: 5 interface duplicate
// - Performance: user đổi → tất cả 5 component re-render
```

**4 cách xử lý theo mức độ phức tạp:**

**1. Composition (children prop) — đơn giản nhất:**

```jsx
function App() {
  const [user, setUser] = useState(null);
  return (
    <Layout sidebar={<Sidebar />}>
      <Avatar user={user} onLogout={() => setUser(null)} />
    </Layout>
  );
}

function Layout({ sidebar, children }) {
  return <div>{sidebar}{children}</div>;
  // Không quan tâm user!
}
```

**2. Component composition pattern:**

```jsx
function Card({ header, body, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

// Caller truyền component đã có context
<Card
  header={<UserHeader user={user} />}
  body={<UserStats user={user} />}
/>
```

**3. Context API — khi data thực sự "global" trong subtree:**

```jsx
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  );
}

function Avatar() {
  const { user, setUser } = useContext(UserContext);
  return <img src={user?.avatar} onClick={() => setUser(null)} />;
}
```

**4. State library — khi state phức tạp:**

```jsx
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Dùng ở bất kỳ đâu, không cần Provider
function Avatar() {
  const { user, logout } = useAuthStore();
  return <img src={user?.avatar} onClick={logout} />;
}
```

**Tip phỏng vấn:** *"Tôi không vội kéo Redux/Zustand. Composition + children solve 60% case. Context cho 30%. Library cho 10% — khi có cross-cutting concerns như cart, auth, hoặc shared cache."*

---

### Câu 45: Context API nên dùng khi nào?

**Trả lời ngắn:** Context phù hợp data ổn định, dùng rộng — auth, theme, locale, feature flags. KHÔNG dùng cho data thay đổi liên tục.

**Use cases tốt:**

```jsx
// 1. THEME
const ThemeContext = createContext('light');
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

// 2. AUTH
const AuthContext = createContext(null);

// 3. LOCALE / I18N
const LocaleContext = createContext('en');

// 4. FEATURE FLAGS
const FeatureContext = createContext({});
```

**Vấn đề performance — re-render storm:**

```jsx
// BUG — context value là object mới mỗi render!
function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {/* value mới mỗi render → MỌI consumer re-render! */}
      {children}
    </AppContext.Provider>
  );
}

// FIX 1 — useMemo cho value
const value = useMemo(
  () => ({ user, setUser, theme, setTheme }),
  [user, theme]
);

// FIX 2 — split context theo tần suất đổi
<AuthContext.Provider value={authValue}>
  <ThemeContext.Provider value={themeValue}>
    {children}
  </ThemeContext.Provider>
</AuthContext.Provider>
// User update → chỉ Auth consumers re-render
```

**Anti-pattern — Context cho data đổi liên tục:**

```jsx
// SAI — mouse position vào context
const MouseContext = createContext({ x: 0, y: 0 });
function MouseProvider({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return <MouseContext.Provider value={pos}>{children}</MouseContext.Provider>;
}
// → Toàn app re-render mỗi pixel mouse di chuyển!

// ĐÚNG — dùng useSyncExternalStore hoặc Zustand với selector
const useMouseStore = create((set) => ({ x: 0, y: 0 }));
// Component nào cần mới subscribe, có selector tránh re-render
```

**Pattern tốt — provider component với hook:**

```jsx
// auth/AuthProvider.tsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (creds) => {
    const u = await api.login(creds);
    setUser(u);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

// Sử dụng
function Header() {
  const { user, logout } = useAuth(); // sạch sẽ
}
```

**Tip phỏng vấn:** *"Context cho data thay đổi ít, dùng rộng. Tôi luôn split context theo tần suất đổi và memo value. Cho data đổi liên tục, tôi chuyển qua Zustand với selector — tránh re-render storm."*

---

### Câu 46: Derived state là gì và vì sao gây bug?

**Trả lời ngắn:** Derived state = state tính từ state/props khác. Bug xảy ra khi data nguồn đổi nhưng derived state không sync theo.

**Anti-pattern minh hoạ:**

```jsx
// BUG — derived state không sync
function Cart({ items }) {
  const [total, setTotal] = useState(
    items.reduce((sum, i) => sum + i.price, 0)
  );

  // items đổi từ ngoài, total vẫn giữ giá trị cũ!
  return <div>Total: {total}</div>;
}

// FIX — đừng store, tính trực tiếp
function Cart({ items }) {
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return <div>Total: {total}</div>;
}

// Nếu tính nặng → useMemo
function Cart({ items }) {
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price, 0),
    [items]
  );
  return <div>Total: {total}</div>;
}
```

**Bug phổ biến — duplicate source of truth:**

```jsx
// SAI — fullName tách rời name
function User({ user }) {
  const [fullName, setFullName] = useState(
    `${user.firstName} ${user.lastName}`
  );
  // user.firstName đổi → fullName vẫn cũ!
}

// ĐÚNG — derive khi cần
function User({ user }) {
  const fullName = `${user.firstName} ${user.lastName}`;
}

// SAI — filtered list as state
function ProductList({ products }) {
  const [filtered, setFiltered] = useState(products);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFiltered(products.filter(p => p.name.includes(search)));
  }, [products, search]);
  // Round-trip không cần thiết, dễ stale
}

// ĐÚNG — derive trực tiếp
function ProductList({ products }) {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => p.name.includes(search));
  // Tự động đồng bộ khi products hoặc search đổi
}
```

**Khi nào CẦN derived state?**

```jsx
// Khi cần "snapshot" — giá trị tại 1 thời điểm
function PriceChange({ currentPrice }) {
  const [initialPrice] = useState(currentPrice); // chỉ set 1 lần khi mount
  const change = currentPrice - initialPrice;
  return <div>Change: {change}</div>;
}

// Khi cần reset state khi props đổi (rare)
function Form({ userId }) {
  const [draft, setDraft] = useState('');
  const [prevId, setPrevId] = useState(userId);

  if (userId !== prevId) {
    setPrevId(userId);
    setDraft(''); // reset khi userId đổi
  }
  // Đây là pattern hiếm, đa số dùng key prop thay
}

// Cách thay thế clean hơn — dùng key
<Form key={userId} userId={userId} /> // userId đổi → component remount
```

**Tip phỏng vấn:** Quote React docs: *"Don't mirror props in state."* Câu này show bạn đọc tài liệu chính chủ. Quy tắc: nếu tính được, đừng store.

---

### Câu 47: Loading & error state — UX tốt thế nào?

**Trả lời ngắn:** Mỗi async operation có 4 trạng thái — idle, loading, success, error. Cộng thêm empty state. UX tốt = handle tất cả, không nhảy layout.

**Pattern đầy đủ:**

```jsx
function ProductList() {
  const { data, isLoading, error, refetch } = useQuery(['products'], fetchProducts);

  // 1. LOADING — skeleton, không spinner toàn màn hình
  if (isLoading) return <ProductListSkeleton />;

  // 2. ERROR — actionable, không chỉ "Error!"
  if (error) {
    return (
      <ErrorState
        title="Không tải được sản phẩm"
        message={error.message}
        action={<Button onClick={refetch}>Thử lại</Button>}
      />
    );
  }

  // 3. EMPTY — khác với loading!
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={<BoxIcon />}
        title="Chưa có sản phẩm"
        description="Thêm sản phẩm đầu tiên của bạn"
        action={<Button onClick={openCreateModal}>Thêm sản phẩm</Button>}
      />
    );
  }

  // 4. SUCCESS
  return (
    <div>
      {data.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

**Skeleton vs spinner — khi nào dùng cái nào?**

```
SKELETON — preferred
✓ Predictable layout (list, card, profile)
✓ Loading > 1s
✓ Tránh layout shift khi data về
✓ User cảm thấy "nhanh hơn" vì thấy structure

SPINNER — okay khi
✓ Action button (submit, save) — small inline
✓ Unknown layout
✓ Loading rất nhanh (<500ms)
```

**Bug UX thường gặp — layout shift:**

```jsx
// BUG — layout nhảy khi data về
function Profile() {
  const { data } = useQuery(['user'], fetchUser);
  return data ? <UserCard user={data} /> : <Spinner />;
  // Spinner nhỏ → UserCard 200px → layout shift!
}

// FIX — skeleton có cùng dimensions
function Profile() {
  const { data, isLoading } = useQuery(['user'], fetchUser);
  if (isLoading) return <UserCardSkeleton />; // cùng height/width
  return <UserCard user={data} />;
}

// Skeleton component
function UserCardSkeleton() {
  return (
    <div className="card" style={{ height: 200 }}>
      <div className="skeleton skeleton-avatar" />
      <div className="skeleton skeleton-text" style={{ width: '60%' }} />
      <div className="skeleton skeleton-text" style={{ width: '80%' }} />
    </div>
  );
}
```

**Optimistic update — tăng cảm giác nhanh:**

```jsx
function TodoList() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTodo,

    // Update UI ngay, không chờ server
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(['todos']);
      const previous = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) => [
        ...old,
        { ...newTodo, id: 'temp-' + Date.now() }
      ]);

      return { previous };
    },

    // Rollback nếu fail
    onError: (err, _, context) => {
      queryClient.setQueryData(['todos'], context.previous);
      toast.error('Failed to add todo');
    },

    // Re-sync với server
    onSettled: () => queryClient.invalidateQueries(['todos']),
  });
}
```

**Error message tốt:**

```
TỆ:
"Error"
"Something went wrong"
"500 Internal Server Error"

TỐT:
"Không thể lưu thay đổi" + nút "Thử lại"
"Mạng yếu, đang thử kết nối lại..." + auto retry
"Phiên đăng nhập hết hạn" + nút "Đăng nhập lại"
"Không tìm thấy sản phẩm này" + nút "Quay về"
```

**Tip phỏng vấn:** *"Tôi luôn thiết kế cho 4 trạng thái: idle/loading/success/error, cộng empty. Loading dùng skeleton match layout để tránh shift. Error luôn có action để user làm gì tiếp."*

---

### Câu 48: Race condition khi nhiều component update state cùng lúc?

**Trả lời ngắn:** Race condition xảy ra khi async operations về không theo thứ tự. Fix bằng AbortController, request id, hoặc dùng React Query.

**3 scenarios race condition phổ biến:**

**Scenario 1 — Search input:**

```jsx
// BUG
function Search() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then(r => r.json())
      .then(setResults);
  }, [query]);
}

// User gõ "a" → request 1
// User gõ "ab" → request 2
// Request 2 về trước (ngắn hơn)
// Request 1 về sau → setResults với kết quả "a" (sai!)

// FIX với AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setResults)
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });

  return () => controller.abort(); // cancel request cũ
}, [query]);
```

**Scenario 2 — Tab switch:**

```jsx
function Dashboard() {
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState(null);

  // BUG — switch tab nhanh, response cũ về sau
  useEffect(() => {
    fetch(`/api/${tab}`).then(r => r.json()).then(setData);
  }, [tab]);

  // FIX với request id
  const requestIdRef = useRef(0);

  useEffect(() => {
    const id = ++requestIdRef.current;
    fetch(`/api/${tab}`)
      .then(r => r.json())
      .then(d => {
        if (id === requestIdRef.current) {
          setData(d); // chỉ set nếu là request mới nhất
        }
      });
  }, [tab]);
}
```

**Scenario 3 — Form submit double:**

```jsx
function PaymentForm() {
  const [submitting, setSubmitting] = useState(false);

  // BUG — user double-click → 2 lần charge!
  const handleSubmit = async () => {
    await chargeCard(amount);
    showSuccess();
  };

  // FIX — disable button + flag
  const handleSubmit = async () => {
    if (submitting) return; // guard
    setSubmitting(true);
    try {
      await chargeCard(amount);
      showSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button disabled={submitting} onClick={handleSubmit}>
      {submitting ? 'Đang xử lý...' : 'Thanh toán'}
    </button>
  );
}
```

**Best solution — React Query auto-handle:**

```jsx
function Search() {
  const [query, setQuery] = useState('');

  // React Query tự xử lý:
  // - Cancel pending request khi query đổi
  // - Dedup nếu cùng key
  // - Cache, không refetch không cần thiết
  const { data } = useQuery(
    ['search', query],
    ({ signal }) => fetch(`/api/search?q=${query}`, { signal }).then(r => r.json()),
    { enabled: query.length > 0 }
  );
}
```

**Tip phỏng vấn:** *"React Query và SWR handle race condition tự động — đây là một lý do chính để dùng thư viện thay vì useEffect+fetch. Cho mutation, tôi luôn disable button khi đang pending."*

---

### Câu 49: UI lag khi scroll/nhập liệu — kiểm tra gì trước?

**Quy trình debug performance 4 bước:**

**Bước 1 — Confirm bằng Profiler, không đoán:**

```
Chrome DevTools → Performance tab → Record
1. Bắt đầu record
2. Thực hiện hành động lag (scroll, type)
3. Stop record
4. Xem:
   - FPS chart (xanh = 60fps, đỏ = lag)
   - Long tasks (>50ms) màu đỏ
   - Main thread breakdown
```

**Bước 2 — 5 nguyên nhân phổ biến:**

```jsx
// 1. RENDER QUÁ NHIỀU ITEM
{products.map(p => <ProductCard key={p.id} product={p} />)}
// 5000 items → 5000 components render mỗi update!

// FIX: Virtualization
import { FixedSizeList } from 'react-window';
<FixedSizeList itemCount={5000} itemSize={80} height={600}>
  {({ index, style }) => (
    <div style={style}>
      <ProductCard product={products[index]} />
    </div>
  )}
</FixedSizeList>
// Chỉ render ~10 items visible

// 2. INLINE FUNCTION/OBJECT PROPS
{items.map(item =>
  <Item
    onClick={() => handleClick(item.id)} // function mới mỗi render
    style={{ color: 'red' }}              // object mới mỗi render
  />
)}
// → memo không hiệu lực

// FIX
const handleItemClick = useCallback((id) => handleClick(id), []);
const itemStyle = useMemo(() => ({ color: 'red' }), []);

// 3. TÍNH TOÁN NẶNG TRONG RENDER
function List({ items }) {
  // Sort lại MỖI render!
  const sorted = items.sort((a, b) => b.score - a.score);
  return sorted.map(...);
}

// FIX
const sorted = useMemo(
  () => [...items].sort((a, b) => b.score - a.score),
  [items]
);

// 4. EVENT HANDLER NẶNG
<input onChange={(e) => {
  const value = e.target.value;
  expensiveValidation(value); // chạy mỗi keystroke!
  setData(value);
}} />

// FIX: debounce
const debouncedValidate = useMemo(
  () => debounce(expensiveValidation, 300),
  []
);

<input onChange={(e) => {
  setData(e.target.value);     // immediate
  debouncedValidate(e.target.value); // delayed
}} />

// 5. CONTEXT VALUE ĐỔI LIÊN TỤC
<MyContext.Provider value={{ data, setData }}>
// Toàn bộ consumers re-render khi value đổi

// FIX: memo value, split context, hoặc dùng selector library
```

**Bước 3 — React Profiler:**

```
React DevTools → Profiler tab → Record
1. Click record
2. Tương tác lag
3. Stop
4. Xem:
   - Flamegraph: component nào render lâu
   - Ranked: top components by render time
   - Why did this render? (cần Settings → enable "Record why")
```

**Bước 4 — Fix theo data:**

```jsx
// CHECKLIST optimization theo độ ưu tiên:
// 1. Virtualization cho list > 100 items
// 2. React.memo cho expensive components
// 3. useMemo cho expensive computations
// 4. useCallback cho handler truyền xuống memo'd children
// 5. Code splitting với React.lazy
// 6. Image lazy loading + proper sizing
// 7. CSS animations thay vì JS animations
```

**Đo lường — đừng optimize mù:**

```jsx
// Đo trước và sau
console.time('render');
// ... render
console.timeEnd('render');

// Hoặc Performance Mark
performance.mark('render-start');
// ...
performance.mark('render-end');
performance.measure('render', 'render-start', 'render-end');
```

**Tip phỏng vấn:** *"Tôi không optimize prematurely. Profile trước, fix điểm nghẽn cụ thể. List 1000 items lag → virtualization. Form input lag → debounce validation. Đừng wrap mọi thứ trong useMemo."*

---

### Câu 50: Sau deploy UI bị vỡ — ưu tiên làm gì?

**Trả lời ngắn:** Production incident có quy trình: assess → mitigate → diagnose → fix → postmortem. Mitigate (rollback) trước fix nếu impact lớn.

**Quy trình incident response:**

**Bước 1 — Assess impact (5 phút đầu):**

```
Câu hỏi cần trả lời ngay:
☐ Bao nhiêu user bị ảnh hưởng? (1%, 50%, 100%?)
☐ Browser/device nào bị? (Chrome only? iOS only?)
☐ Tính năng nào hỏng? (chỉ checkout? hay toàn site?)
☐ User có flow alternative không?
☐ Có đang mất tiền không? (payment, signup flow?)

Nguồn data:
- Sentry / error monitoring
- Analytics (Google Analytics, Amplitude) — drop-off rate
- User reports (support tickets, Twitter)
- Synthetic monitoring (Datadog, Pingdom)
```

**Bước 2 — Mitigate ngay nếu impact lớn:**

```bash
# Option 1: Rollback (nhanh nhất)
git revert HEAD
git push
# Hoặc Vercel/Netlify: redeploy previous version (1 click)

# Option 2: Feature flag tắt feature
flags.set('new-checkout', false);
# User về flow cũ, có thời gian fix calmly

# Option 3: Hotfix nhanh + push
git checkout -b hotfix/checkout
# fix nhỏ
git push
# deploy hotfix
```

**Khi nào rollback vs hotfix?**

```
ROLLBACK NGAY khi:
✓ Bug ảnh hưởng > 10% users
✓ Bug làm mất data hoặc tiền
✓ Không hiểu rõ root cause
✓ Fix sẽ mất > 30 phút

HOTFIX khi:
✓ Bug nhỏ, isolated
✓ Hiểu rõ root cause
✓ Fix < 15 phút
✓ Có thể test được
```

**Bước 3 — Diagnose (sau khi đã mitigate):**

```jsx
// Checklist nguyên nhân thường gặp:

// 1. CACHE — user thấy version cũ
//    → Hard reload, check service worker
//    → Verify cache headers đúng

// 2. CDN ASSET MISSING
//    → Build artifact thiếu file
//    → Check dist/ trên CI

// 3. ENV VARIABLE
//    → API_URL khác giữa staging và prod
//    → Feature flag không có ở prod

// 4. BROWSER COMPATIBILITY
//    → Dùng API mới, browser cũ không support
//    → Polyfill thiếu, transpile target sai

// 5. THIRD-PARTY API CHANGE
//    → API bên thứ 3 đổi response shape
//    → Rate limit, auth expired

// 6. DATA MIGRATION
//    → Schema mới deploy nhưng data cũ
//    → Field thêm không có default value

// 7. CSS conflict
//    → Tailwind purge xoá class cần
//    → CSS-in-JS không sync với SSR
```

**Bước 4 — Postmortem template:**

```markdown
# Incident: Checkout broken on iOS Safari
## Impact
- Duration: 23 minutes
- Users affected: ~500 iOS users (8% of checkouts)
- Revenue lost: $X

## Timeline
- 14:00 — Deploy v2.3.0
- 14:05 — First Sentry alert
- 14:08 — Confirmed issue, decided rollback
- 14:12 — Rollback complete
- 14:30 — Root cause identified

## Root cause
Used `Array.prototype.at()` which iOS Safari < 15.4 doesn't support.
Polyfill was excluded from build.

## What went well
- Sentry alert fired immediately
- Rollback was fast (<5 min)

## What to improve
- Add iOS Safari to CI test matrix
- Add browserslist check pre-deploy
- Setup canary deploy (5% traffic first)

## Action items
- [ ] Configure browserslist properly
- [ ] Add Playwright iOS test
- [ ] Setup canary deployment
```

**Production safety practices (preventive):**

```
✓ Staging environment giống production
✓ Feature flags cho new feature
✓ Canary deploy (rollout 1%, 10%, 50%, 100%)
✓ Error monitoring (Sentry, Bugsnag)
✓ Real User Monitoring (RUM)
✓ Synthetic checks (Datadog browser tests)
✓ Rollback button trong CI/CD
✓ Smoke tests sau deploy
✓ On-call rotation rõ ràng
```

**Tip phỏng vấn:** *"Production first, debug second. Tôi không cố fix dưới áp lực — rollback nếu impact lớn, debug calmly sau. Feature flags là bảo hiểm tốt nhất, có thể tắt feature mà không deploy."*

Câu chuyện cụ thể (chuẩn bị 1 case có thật):
*"Có lần tôi deploy build mới Friday 5pm, 30 phút sau Sentry báo lỗi iOS. Rollback ngay, weekend bình yên. Monday calmly debug ra `Array.at()` không support iOS 14. Setup browserslist + add CI check để không lặp lại."*

---

## Cheatsheet — Ôn nhanh trước phỏng vấn

### Top 10 câu hỏi hay gặp nhất (middle-senior)

1. **Closure** — debounce, stale closure trong React hooks
2. **Race condition** — search input, AbortController, React Query
3. **useEffect** — 5 lỗi phổ biến, dependency array
4. **Re-render** — khi nào, React.memo, useCallback, useMemo
5. **Reflow vs repaint** — layout thrashing, transform/opacity dùng GPU
6. **Event delegation** — bubbling, modal click outside
7. **Key trong list** — bug khi dùng index, input nhảy focus
8. **State management** — local vs global, server state với React Query
9. **Performance** — virtualization, profiling, optimize có data
10. **Production debug** — rollback first, postmortem sau

### Cụm từ đắt giá để dùng trong phỏng vấn

- *"Không optimize prematurely — profile trước"*
- *"Server state khác client state — đừng dùng useState cho data từ API"*
- *"Tôi không guess and check, tôi reproduce và bisect"*
- *"Mặc định không mutate, exception là local variable hoặc Immer"*
- *"Composition trước Context, Context trước state library"*
- *"Production first, debug second"*

### Câu hỏi follow-up hay gặp

- *"Sự khác biệt giữa stopPropagation và preventDefault?"*
- *"defer vs async script?"*
- *"Microtask vs macrotask?"*
- *"useMemo vs useCallback?"*
- *"React.memo có làm app nhanh hơn không?"*
- *"Khi nào dùng Redux thay vì Context?"*

### Tools cần biết tên

- **DevTools**: Chrome DevTools, React DevTools, Why Did You Render
- **State**: Zustand, Redux Toolkit, Jotai, Context API
- **Server State**: TanStack Query (React Query), SWR
- **Form**: react-hook-form, Formik
- **Performance**: Lighthouse, Web Vitals, react-window
- **Monitoring**: Sentry, Datadog, LogRocket
- **Testing**: Vitest, Playwright, Testing Library

---

**Chúc bạn phỏng vấn thành công!** 🚀

> Tài liệu này được biên soạn cho mục đích ôn tập phỏng vấn Frontend level middle-senior.
> Mỗi câu trả lời đều có code ví dụ thực tế, bug thường gặp, và tip để gây ấn tượng với interviewer.
