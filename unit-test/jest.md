### Kiểm thử đơn vị (Unit Testing) trong React

Kiểm thử đơn vị là quá trình kiểm tra từng phần nhỏ nhất của ứng dụng (đơn vị code) một cách riêng lẻ và độc lập để đảm bảo chúng hoạt động đúng như mong đợi. Trong React, một "đơn vị" thường là một component.

Mục tiêu chính của kiểm thử đơn vị là đảm bảo logic của component hoạt động chính xác, bao gồm:

  * Component render đúng.
  * Nó hiển thị nội dung chính xác.
  * Nó phản hồi đúng với các tương tác của người dùng (như click, nhập liệu).
  * Nó hiển thị trạng thái loading, error, và data đúng cách.

#### Các công cụ phổ biến

  * **Jest**: Một framework kiểm thử JavaScript do Facebook phát triển, thường được sử dụng cùng với React. Jest cung cấp một môi trường hoàn chỉnh để chạy các bài test.
  * **React Testing Library (RTL)**: Một thư viện kiểm thử trọng tâm vào hành vi người dùng. Nó khuyến khích kiểm thử ứng dụng theo cách mà người dùng tương tác, thay vì kiểm tra chi tiết triển khai bên trong.

-----

### Lý thuyết và ví dụ

#### Lý thuyết

RTL dựa trên nguyên tắc "kiểm thử hành vi" (behavioral testing). Thay vì kiểm tra trạng thái nội bộ của component, bạn sẽ kiểm tra xem component có hiển thị đúng các element mà người dùng nhìn thấy hay không.

Các bước cơ bản của một bài test với RTL:

1.  **Render component:** Dùng hàm `render` để tạo component ảo (virtual DOM) trong môi trường test.
2.  **Tìm kiếm các element:** Dùng các hàm truy vấn (queries) như `getByText`, `getByRole`, `getByTestId` để tìm các element trên component.
3.  **Tương tác (nếu cần):** Dùng hàm `fireEvent` hoặc `userEvent` để mô phỏng tương tác của người dùng (như click vào nút).
4.  **Kiểm định (Assertion):** Dùng `expect` và các hàm so sánh (matchers) như `toBeInTheDocument`, `toBeDisabled` để kiểm tra xem component có hoạt động đúng không.

#### Ví dụ

Giả sử bạn có một component đơn giản là `Button` như sau:

```jsx
// src/components/Button.js
import React from 'react';

const Button = ({ onClick, children, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
```

Bây giờ, chúng ta sẽ viết một bài test cho component này.

```jsx
// src/components/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom'; // Thêm các hàm so sánh (matchers) mở rộng

// Bài test đầu tiên: Kiểm tra xem button có render đúng không
test('renders with the correct text', () => {
  render(<Button>Click Me</Button>);
  // Tìm kiếm element button dựa trên văn bản hiển thị cho người dùng
  const buttonElement = screen.getByText(/click me/i);
  // Kiểm định: Element này phải có trong tài liệu (DOM ảo)
  expect(buttonElement).toBeInTheDocument();
});

// Bài test thứ hai: Kiểm tra chức năng click
test('calls the onClick handler when clicked', () => {
  const handleClick = jest.fn(); // Tạo một mock function
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  // Tìm kiếm button
  const buttonElement = screen.getByText(/click me/i);
  
  // Tương tác: click vào button
  fireEvent.click(buttonElement);
  
  // Kiểm định: Mock function phải được gọi một lần
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Bài test thứ ba: Kiểm tra trạng thái disabled
test('is disabled when the disabled prop is true', () => {
  render(<Button disabled>Click Me</Button>);
  
  const buttonElement = screen.getByText(/click me/i);
  // Kiểm định: Button phải ở trạng thái disabled
  expect(buttonElement).toBeDisabled();
});
```

**Tại sao cách tiếp cận này lại tốt?**

  * **Độc lập với implementation:** Bài test không quan tâm đến `props` hay `state` nội bộ. Nó chỉ kiểm tra xem hành vi cuối cùng có đúng không. Điều này giúp bạn dễ dàng refactor code mà không cần phải viết lại test.
  * **Trọng tâm vào người dùng:** RTL giúp bạn viết các bài test mô phỏng cách người dùng thực sự sử dụng ứng dụng, mang lại sự tự tin cao hơn về chất lượng sản phẩm.