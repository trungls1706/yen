https://www.greatfrontend.com/questions/quiz/react-interview-questions?framework=react&tab=quiz#what-is-the-difference-between-state-and-props-in-react

| Feature         | **Props**                                                              | **State**                                                                      |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Definition      | Short for “properties”, data passed **from parent to child** component | Internal data managed **within a component**                                   |
| Mutability      | **Immutable** — cannot be changed by the child component               | **Mutable** — can be updated using `setState` (class) or `useState` (function) |
| Who controls it | Controlled by **parent**                                               | Controlled by **the component itself**                                         |
| Usage           | To **pass data** and **configure child components**                    | To **manage dynamic data** and **trigger re-renders**                          |
| Example         | `<Child name="Alice" />`                                               | `const [count, setCount] = useState(0)`                                        |


| Đặc điểm              | **Props**                                                                    | **State**                                                              |
| --------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Định nghĩa            | Viết tắt của “properties”, dữ liệu được **truyền từ component cha sang con** | Dữ liệu nội bộ được **quản lý bên trong component**                    |
| Có thể thay đổi không | **Không thể thay đổi** bởi component nhận                                    | **Có thể thay đổi** bằng `setState` (class) hoặc `useState` (function) |
| Ai kiểm soát          | Component **cha**                                                            | Component **tự quản lý**                                               |
| Mục đích sử dụng      | Để **truyền dữ liệu** và **cấu hình component con**                          | Để **quản lý dữ liệu động** và **kích hoạt render lại**                |
| Ví dụ                 | `<Child name="Alice" />`                                                     | `const [count, setCount] = useState(0)`                                |


https://www.greatfrontend.com/blog/practice-50-react-coding-interview-questions-with-solutions