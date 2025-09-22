# Tóm tắt lý thuyết TypeScript
------------------------------------------------------------------------

## Giới thiệu về TypeScript

-   **TypeScript (TS)** không phải ngôn ngữ hoàn toàn mới mà được xây
    dựng dựa trên **JavaScript (JS)**.\
-   Được tạo ra bởi một kỹ sư của Microsoft (cha đẻ của C#).\
-   Code TypeScript được biên dịch bởi **TypeScript Compiler (TSC)**
    sang **JavaScript** để trình duyệt hiểu và chạy.\
-   Cú pháp TypeScript gần giống JavaScript.

------------------------------------------------------------------------

## Tại sao nên dùng TypeScript?

-   **Bắt lỗi sớm (Compile-time):** phát hiện lỗi khi biên dịch (ví dụ:
    sai kiểu dữ liệu).\
-   **Code dễ đọc, dễ bảo trì** nhờ có type rõ ràng.\
-   **Dễ nâng cấp và chỉnh sửa** mà ít lo ngại lỗi không mong muốn.\
-   **Cú pháp đơn giản, quen thuộc** với người viết JavaScript.

------------------------------------------------------------------------

## Các khái niệm cơ bản

### 1. Static Typing (Kiểu tĩnh)

-   Khác với JS (kiểu động).\
-   Một biến có kiểu dữ liệu cố định (`string`, `number`, ...).\
-   Có **Type Inference**: TS tự suy luận kiểu từ giá trị khởi tạo.

### 2. Kiểu `any`

-   Khi biến không có giá trị khởi tạo và không khai báo kiểu → TS gán
    kiểu `any`.\
-   `any` cho phép biến nhận mọi giá trị và **vô hiệu hóa kiểm tra
    type**.\
-   **Nên hạn chế sử dụng.**

### 3. Các kiểu dữ liệu cơ bản (Primitive Types)

-   Gồm: `boolean`, `number`, `string`, `null`, `undefined`.\

-   Khai báo:

    ``` ts
    let age: number;
    let name: string;
    ```

### 4. Array (Mảng)

-   Cú pháp:

    ``` ts
    let names: string[];
    let numbers: Array<number>;
    ```

-   TS sẽ báo lỗi nếu phần tử sai kiểu.

### 5. Function (Hàm)

-   Có thể định nghĩa kiểu cho **tham số** và **giá trị trả về**.\
-   Hàm không trả về gì: kiểu `void`.\
-   **Tham số tùy chọn**: `?` (luôn đứng sau tham số bắt buộc).\
-   **Rest Parameters**: `...args`.

------------------------------------------------------------------------

## Các khái niệm nâng cao

### 1. Type Alias (Bí danh kiểu)

-   Tạo kiểu tùy chỉnh để tái sử dụng.\

-   Cú pháp:

    ``` ts
    type User = { id: number; name: string; };
    ```

-   Chỉ tồn tại trong TS, **không có trong JS sau biên dịch**.

### 2. Union Type (`|`)

-   Biến có thể thuộc **một trong nhiều kiểu**.

    ``` ts
    type UserID = string | number;
    ```

-   **Literal Types**: giới hạn giá trị trong tập hợp cụ thể.

    ``` ts
    type Theme = 'dark' | 'light';
    ```

### 3. Intersection Type (`&`)

-   Gộp nhiều kiểu thành một.

    ``` ts
    type A = { name: string };
    type B = { age: number };
    type Person = A & B; // { name: string; age: number }
    ```

### 4. Interface

-   Định nghĩa cấu trúc object.\
-   **Giống `type`:** đều định nghĩa object, có thể mở rộng.\
-   **Khác biệt:**
    -   `interface` chỉ cho object, `type` cho mọi loại (primitive,
        union, ...).\
    -   `interface` hỗ trợ **Declaration Merging** (gộp nhiều interface
        trùng tên).

### 5. Generic Type (`<T>`)

-   Tạo component/hàm có thể hoạt động với nhiều kiểu khác nhau.\

-   Ví dụ:

    ``` ts
    function identity<T>(value: T): T {
      return value;
    }
    ```

------------------------------------------------------------------------
