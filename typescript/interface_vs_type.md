# So sánh `interface` vs `type` trong TypeScript

  -----------------------------------------------------------------------
  Tiêu chí               `interface`                   `type`
  ---------------------- ----------------------------- ------------------
  **Đối tượng áp dụng**  Chỉ dùng để mô tả **object**  Dùng cho **mọi
                                                       kiểu dữ liệu**
                                                       (primitive, union,
                                                       tuple,
                                                       intersection, ...)

  **Kế thừa / Mở rộng**  Dùng `extends` để kế thừa     Dùng toán tử `&`
                         interface khác                (intersection) để
                                                       gộp type

  **Declaration          Có (có thể định nghĩa nhiều   Không có, nếu định
  Merging**              lần cùng tên, TS sẽ gộp lại)  nghĩa trùng tên sẽ
                                                       lỗi

  **Tính linh hoạt**     Thích hợp khi mô tả **cấu     Thích hợp khi tạo
                         trúc object** hoặc **API**    **union type**,
                                                       **tuple**, hoặc
                                                       alias cho
                                                       primitive

  **Khi biên dịch**      Chỉ tồn tại ở compile-time,   Cũng chỉ tồn tại ở
                         không có trong JS             compile-time,
                                                       không có trong JS
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Ví dụ minh họa

### 1. Định nghĩa object

``` ts
// Interface
interface User {
  id: number;
  name: string;
}

// Type alias
type UserType = {
  id: number;
  name: string;
};
```

------------------------------------------------------------------------

### 2. Kế thừa / mở rộng

``` ts
// Interface kế thừa
interface Person {
  name: string;
}
interface Employee extends Person {
  salary: number;
}

// Type sử dụng intersection
type PersonType = { name: string };
type EmployeeType = PersonType & { salary: number };
```

------------------------------------------------------------------------

### 3. Declaration Merging

``` ts
// Interface có thể gộp
interface Car {
  brand: string;
}
interface Car {
  year: number;
}

const myCar: Car = {
  brand: "Toyota",
  year: 2024
};

// Type KHÔNG cho phép gộp
type Bike = {
  brand: string;
};
/*
type Bike = { year: number }; ❌ Error: Duplicate identifier 'Bike'
*/
```

------------------------------------------------------------------------

### 4. Union và Tuple (chỉ `type` làm được)

``` ts
// Union
type Status = "success" | "error" | "loading";

// Tuple
type Point = [number, number];
```

------------------------------------------------------------------------

## Khi nào dùng gì?

-   Dùng **`interface`**: khi mô tả **cấu trúc object, class, API**.\
-   Dùng **`type`**: khi cần **union, tuple, alias cho primitive**, hoặc
    tổ hợp phức tạp.
