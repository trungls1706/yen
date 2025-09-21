# JavaScript Q&A

### What is an event loop
The **event loop** is the mechanism that allows JavaScript (single-threaded) to perform non-blocking operations.  
It continuously checks the **call stack** and the **callback queue** (or microtask queue).  
- If the call stack is empty, the event loop pushes the first callback from the queue into the stack.  
- This enables async operations like `setTimeout`, Promises, and I/O without blocking execution.

---

### How many states a promise has
A JavaScript **Promise** has 3 states:
1. **Pending** – initial state, neither fulfilled nor rejected.  
2. **Fulfilled** – the operation completed successfully.  
3. **Rejected** – the operation failed.  

---

### Given problems with the order of function execution. Find the result and explain the way JavaScript reads and executes the functions/ tasks
JavaScript uses the **call stack** (synchronous) and the **task queues** (macro-task queue & micro-task queue).  
Execution order:
1. Run synchronous code line by line.  
2. Execute **microtasks** (Promises, MutationObserver).  
3. Execute **macrotasks** (setTimeout, setInterval, I/O).  

---

### What is async/await, and what are the differences from Promise?
- **Promise**: a way to handle async results via `.then()` and `.catch()`.  
- **async/await**: syntactic sugar built on Promises. It allows writing async code in a synchronous-like way.  

Difference:
- Async/await makes code more readable.  
- Error handling with `try...catch` is simpler compared to `.catch()`.  

---

### Code practice: I have a legacy function that was not written in async/await. Convert to asynchronous
```js
// Legacy
function fetchData(callback) {
  setTimeout(() => {
    callback("done");
  }, 1000);
}

// Async/await
function fetchDataAsync() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("done"), 1000);
  });
}

(async () => {
  const result = await fetchDataAsync();
  console.log(result); // "done"
})();
```

---

### Explain var, let, and const
- **var**: function-scoped, hoisted, can be redeclared.  
- **let**: block-scoped, not hoisted the same way as var, cannot redeclare in the same scope.  
- **const**: block-scoped, must be initialized, cannot be reassigned (but object properties can be mutated).  

---

### Code practice: Given a for loop and asked about the final log? explain the problems and find a solution.
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Logs: 3, 3, 3
```
Problem: `var` is function-scoped, so `i` is shared.  

Solution:
```js
// Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 0,1,2
}
```

---

### What will you do to optimize the performance of a JavaScript app?
- **Minify & bundle JS/CSS**  
  → Giảm dung lượng file tải xuống.

- **Use lazy loading & code splitting**  
  → Load code khi cần (component theo route).  
  ```js
  const LazyComponent = React.lazy(() => import("./MyComponent"));
  ```

- **Optimize DOM manipulation**  
  → Hạn chế thao tác DOM trực tiếp, gộp thay đổi.  
  ```js
  // ❌ Không tối ưu
  for (let i = 0; i < 1000; i++) {
    document.body.appendChild(document.createElement("div"));
  }

  // ✅ Tối ưu
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    frag.appendChild(document.createElement("div"));
  }
  document.body.appendChild(frag);
  ```

- **Debounce / Throttle events**  
  → Tránh gọi handler liên tục (scroll, resize, input).  
  ```js
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  window.addEventListener("resize", debounce(() => {
    console.log("Resize event (debounced)");
  }, 300));
  ```

- **Use caching** (localStorage, sessionStorage, service workers).  
  → Lưu dữ liệu hay dùng, giảm gọi API.  

- **Optimize assets** (nén ảnh, preload font, dùng webp/avif).  


---

### Why reduce the bundle and apply lazy loading improve the performance?
- **Reduce bundle size** → faster load times, less parsing.  
- **Lazy loading** → load only what’s needed, defer non-critical code.  
=> Improves first paint & time-to-interactive.  

- **Reduce bundle size**  
  → Tải nhanh hơn, parse nhanh hơn.  

- **Lazy loading**  
  → Chỉ tải code khi cần, defer phần không quan trọng.  

👉 Kết quả: cải thiện **First Paint (FP)** và **Time To Interactive (TTI)**.  

---

### What is the rendering path
Critical Rendering Path (CRP):
1. Parse HTML → DOM.  
2. Parse CSS → CSSOM.  
3. Combine DOM + CSSOM → Render Tree.  
4. Layout (calculate positions & sizes).  
5. Paint pixels to screen.  

Đường đi để browser render ra màn hình:

1. Parse **HTML** → DOM tree.  
2. Parse **CSS** → CSSOM tree.  
3. Kết hợp DOM + CSSOM → **Render Tree**.  
4. **Layout** → tính toán kích thước, vị trí.  
5. **Paint** → vẽ pixel lên màn hình.  

---

### What is defer/ async
- **defer**: loads JS in parallel but executes after HTML parsing is finished.  
- **async**: loads JS in parallel and executes immediately when ready (may block parsing).  

- **`defer`**
  - Load JS song song với HTML.  
  - Thực thi sau khi HTML parse xong.  
  - Giữ đúng thứ tự script.  
  ```html
  <script src="app.js" defer></script>
  ```

- **`async`**
  - Load JS song song với HTML.  
  - Thực thi ngay khi tải xong (có thể ngắt HTML parsing).  
  ```html
  <script src="analytics.js" async></script>
  ```

👉 Best practice:  
- `defer` cho JS chính của app.  
- `async` cho script ngoài (analytics, ads).  

---

### What is a pure function
👉 Một function **pure** nếu:  
1. **Không có side effects** (không thay đổi biến ngoài, DOM, API...).  
2. **Cùng input → luôn cùng output**.  

### Ví dụ: Pure Function
```js
function add(a, b) {
  return a + b; 
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (luôn như nhau)
```

### Ví dụ: Impure Function (side effect)
```js
let counter = 0;
function increase() {
  return ++counter; 
}

console.log(increase()); // 1
console.log(increase()); // 2 (input giống, output khác)
```

### Ví dụ: Impure Function (phụ thuộc external)
```js
function getTime() {
  return new Date().toLocaleTimeString();
}
console.log(getTime()); // mỗi lần gọi khác nhau
```

### Ứng dụng của Pure Function
- Dễ test.  
- Dễ debug.  
- Hợp với functional programming (map, filter, reduce).  


---

### How are pure functions applied in modern libraries/frameworks?
- **React**: functional components are pure (given same props → same UI).  
- **Redux**: reducers must be pure functions (state → new state).  

---

### Code practice: write me a function that implements the memorization mechanism
```js
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

// Example
const square = memoize(x => x * x);
console.log(square(4)); // 16
console.log(square(4)); // 16 (cached)
```

---

### How to optimize and serve the static assets? (images, video, js …)
- Use CDN.  
- Compress assets (gzip, Brotli).  
- Use modern formats (WebP, AVIF).  
- Apply caching strategies.  
- Lazy load images/videos.  

---

### How do you handle data streaming?
- Use **ReadableStream** / **WritableStream** APIs.  
- Process data in chunks (useful for video/audio).  
- Example: fetch large files with streaming.  

**Data Streaming** là quá trình xử lý dữ liệu khi nó được truyền đến theo luồng (chunks) thay vì chờ tải toàn bộ. Điều này quan trọng trong các ứng dụng **real-time** như video, audio, chat, hay xử lý file lớn.  

---

#### 🛠 Cách xử lý data streaming:

1. **Sử dụng Stream API (Node.js)**  
   - Node.js có `Readable`, `Writable`, `Transform`, `Duplex`.  
   - Ví dụ: đọc file lớn bằng `fs.createReadStream()` thay vì `fs.readFile()`.  

   ```js
   const fs = require("fs");

   const readStream = fs.createReadStream("largeFile.txt", { encoding: "utf8" });
   readStream.on("data", (chunk) => {
     console.log("Received chunk:", chunk.length);
   });
   readStream.on("end", () => {
     console.log("File reading completed");
   });
   ```

---

2. **Sử dụng Web Streams API (Browser)**  
   - Trong trình duyệt hiện đại, `ReadableStream`, `WritableStream` cho phép xử lý streaming response từ `fetch`.  

   ```js
   fetch("https://example.com/large-data")
     .then(response => {
       const reader = response.body.getReader();
       return reader.read().then(function process({ done, value }) {
         if (done) {
           console.log("Streaming finished");
           return;
         }
         console.log("Chunk received:", value.length);
         return reader.read().then(process);
       });
     });
   ```

---

3. **Sử dụng WebSocket cho real-time**  
   - Thay vì request-response, WebSocket giữ kết nối liên tục để truyền data streaming theo thời gian thực.  

   ```js
   const socket = new WebSocket("ws://localhost:8080");

   socket.onmessage = (event) => {
     console.log("Message from server:", event.data);
   };
   ```

---

4. **Backpressure Handling (Điều tiết luồng dữ liệu)**  
   - Không phải lúc nào consumer cũng đọc nhanh như producer.  
   - Streams có cơ chế **pause/resume** hoặc **highWaterMark** để tránh memory overflow.  

   ```js
   const stream = fs.createReadStream("largeFile.txt", { highWaterMark: 1024 });

   stream.on("data", (chunk) => {
     stream.pause(); // tạm dừng nếu consumer chưa xử lý xong
     console.log("Chunk:", chunk);
     setTimeout(() => stream.resume(), 100); // resume sau khi xử lý
   });
   ```

---

#### ✅ Tóm gọn:
- **File lớn → dùng Stream API.**  
- **Trình duyệt → dùng Web Streams API.**  
- **Real-time → WebSocket/EventSource.**  
- **Quan trọng**: luôn xử lý **backpressure** để tránh quá tải bộ nhớ.  

### 1. Data Chunking là gì?
**Data chunking** = chia nhỏ dữ liệu lớn thành nhiều phần (chunk) nhỏ để dễ xử lý hơn.

**Ví dụ:**
- Upload file 1GB → chia thành nhiều chunk 10MB để upload dần.
- Mảng 100.000 phần tử → chia thành từng batch 1000 phần tử để xử lý.


### 2. Tại sao cần chunking?
- **Tiết kiệm bộ nhớ**: không load toàn bộ dữ liệu.
- **Nhanh hơn**: có thể xử lý song song.
- **Ổn định**: retry từng chunk khi lỗi.
- **Mở rộng**: phù hợp với stream, upload/download file, gọi API nhiều request.

---

### 3. Best Practices (không dùng thư viện ngoài)

### (a) Chia nhỏ **Array / String**
```js
function chunkArray(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// Ví dụ
const data = [1, 2, 3, 4, 5, 6, 7];
console.log(chunkArray(data, 3));
// [[1,2,3], [4,5,6], [7]]


---

### What are the best practices for handling the data chunking without using 3rd library?
- Use built-in streams API (`TextDecoder`, `ReadableStream`).  
- Process in small chunks to avoid memory overload.  
- Example:
```js
const response = await fetch("bigfile.txt");
const reader = response.body.getReader();
let result = "";
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  result += new TextDecoder().decode(value);
}
```

---

### How to render an object using Three.js? What components do we have to configure
Basic steps:
1. **Scene** – container for objects.  
2. **Camera** – defines perspective.  
3. **Renderer** – renders scene + camera.  
4. **Geometry + Material** → Mesh.  

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
renderer.render(scene, camera);
```

---

### How can you handle an error?
- Use `try...catch`.  
- Graceful degradation (fallback UI).  
- Log errors (console, remote service).  
- Retry strategies.  

---

### How do you monitor and log errors during application error handling?
- Use monitoring tools: Sentry, LogRocket, Datadog.  
- Capture `window.onerror` & `unhandledrejection`.  
- Store logs on server for analysis.  
