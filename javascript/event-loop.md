https://www.jsv9000.app/

# JavaScript Event Loop & Promise Deep Dive

## Event Loop, Call Stack, Task Queue, Microtask Queue
- **Call Stack**: nơi các function đang thực thi được ghi nhận.  
- **Task Queue (Macro-task queue)**: chứa các task async như `setTimeout`, `setInterval`, I/O.  
- **Microtask Queue**: chứa các tasks với **ưu tiên cao hơn**, ví dụ: Promises `.then()`, `MutationObserver`.  
- **Event Loop**: liên tục kiểm tra Call Stack và các queue để thực thi các task.

### Execution Flow
1. Call Stack thực thi các function đồng bộ.  
2. Khi stack rỗng, **microtasks** được xử lý trước **macrotasks**.  
3. Sau đó, event loop lấy task từ **task queue**.

---

## Tasks vs Microtasks
| Feature | Task (macro) | Microtask |
|---------|-------------|-----------|
| Examples | `setTimeout`, `setInterval`, I/O | Promise `.then()`, `MutationObserver` |
| Priority | Thấp | Cao (xử lý trước task) |
| When executed | After call stack empty | Immediately after current stack finishes |

---

## Promise Methods: `Promise.all` vs `Promise.race`
- **Promise.all([p1, p2, ...])**  
  - Chờ tất cả promise resolve.  
  - Nếu bất kỳ promise reject → toàn bộ reject.  

```js
Promise.all([Promise.resolve(1), Promise.resolve(2)])
  .then(console.log); // [1,2]
```

- **Promise.race([p1, p2, ...])**  
  - Chạy xong promise nào trước → resolve/reject ngay.  

```js
Promise.race([
  new Promise(res => setTimeout(() => res(1), 100)),
  new Promise(res => setTimeout(() => res(2), 50))
]).then(console.log); // 2
```

---

## Promise and Errors
- Handle errors using `.catch()` or `try...catch` with `async/await`.

```js
Promise.reject("error")
  .catch(err => console.log(err)); // "error"

async function test() {
  try {
    await Promise.reject("error");
  } catch (err) {
    console.log(err); // "error"
  }
}
test();
```

---

## Nested Promise Chain
```js
Promise.resolve(1)
  .then(val => {
    console.log(val); // 1
    return val + 1;
  })
  .then(val => {
    console.log(val); // 2
  });
```
- Mỗi `.then()` tạo **microtask**, được push vào **microtask queue** theo thứ tự.

---

## Wrap setTimeout in Promise
```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Start");
  await delay(1000);
  console.log("After 1s");
}
run();
```
- Cho phép `setTimeout` chạy theo async/await flow.

---

## Native Execution vs Task vs Microtask (Prime Example)
```js
console.log("script start"); // Native

setTimeout(() => console.log("setTimeout"), 0); // Task

Promise.resolve().then(() => console.log("promise1")); // Microtask

console.log("script end"); // Native
```
**Output**:  
```
script start
script end
promise1
setTimeout
```
- Native code chạy ngay.  
- Microtask queue chạy sau stack rỗng.  
- Task queue chạy sau microtask.

---

### Summary Table
| Type | Example | When executed |
|------|---------|---------------|
| Native | console.log | Immediately |
| Microtask | Promise `.then` | After current stack, before tasks |
| Task | setTimeout | After current stack + microtasks |

---

## Tips
- Microtasks **luôn chạy trước tasks** → nhiều Promise resolve sẽ chạy trước `setTimeout`.  
- Nested Promises tạo **chuỗi microtasks**, thực hiện tuần tự.  
- Event loop là cơ chế để JS **non-blocking**, single-threaded.  

---

**Reference Tool**: [JS Visualizer 9000](https://www.jsv9000.app/) – visualize call stack, event loop, and queues.
