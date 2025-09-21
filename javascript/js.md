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
- Minify & bundle JS/CSS.  
- Use lazy loading, code splitting.  
- Optimize DOM manipulation.  
- Debounce/throttle events.  
- Use caching (localStorage, service workers).  
- Optimize assets (images, fonts).  

---

### Why reduce the bundle and apply lazy loading improve the performance?
- **Reduce bundle size** → faster load times, less parsing.  
- **Lazy loading** → load only what’s needed, defer non-critical code.  
=> Improves first paint & time-to-interactive.  

---

### What is the rendering path
Critical Rendering Path (CRP):
1. Parse HTML → DOM.  
2. Parse CSS → CSSOM.  
3. Combine DOM + CSSOM → Render Tree.  
4. Layout (calculate positions & sizes).  
5. Paint pixels to screen.  

---

### What is defer/ async
- **defer**: loads JS in parallel but executes after HTML parsing is finished.  
- **async**: loads JS in parallel and executes immediately when ready (may block parsing).  

---

### What is a pure function
- A function with:
  - No side effects.  
  - Returns the same output for the same input.  

```js
function add(a, b) {
  return a + b;
}
```

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
