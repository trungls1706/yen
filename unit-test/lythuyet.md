Tuyệt vời\! Đây là toàn bộ nội dung đã được chuyển sang định dạng Markdown để dễ đọc và dễ sao chép:

-----

# Tổng hợp Framework Kiểm thử Phổ biến cho Lập trình viên React

Tăng cường kỹ năng kiểm thử là yếu tố then chốt cho mọi lập trình viên React. Dưới đây là tổng hợp đầy đủ về các framework kiểm thử phổ biến, cùng với ví dụ code và các thực tiễn tốt nhất (**best practices**).

## 1\. Phân loại Framework Kiểm thử

Trong hệ sinh thái React, các công cụ được chia thành hai nhóm chính dựa trên phạm vi kiểm thử:

| Loại kiểm thử | Công cụ phổ biến | Mục tiêu |
| :--- | :--- | :--- |
| **Unit/Component Testing** | **Jest**, **React Testing Library (RTL)**, Vitest | Kiểm tra logic của các đơn vị code nhỏ (component, hàm, custom hook) một cách biệt lập. |
| **End-to-End (E2E) Testing** | **Cypress**, **Playwright** | Mô phỏng hành trình người dùng qua toàn bộ ứng dụng (từ UI đến database). |

-----

## 2\. Unit Testing với Jest & React Testing Library (RTL)

Đây là bộ đôi tiêu chuẩn để kiểm thử component trong React.

### Lý thuyết chính (RTL Philosophy)

RTL khuyến khích kiểm thử ứng dụng theo cách mà người dùng tương tác, tập trung vào **hành vi (behavior)** của component hơn là chi tiết triển khai nội bộ (state hay props).

### Ví dụ Code: Kiểm thử Component Form

Giả sử bạn có một component đăng nhập đơn giản:

```javascript
// src/components/LoginForm.js
import React, { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" disabled={!username}>
        Submit
      </button>
    </form>
  );
}
export default LoginForm;
```

### File Test (`LoginForm.test.js`)

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

test('1. Submitting the form calls onSubmit with the correct data', () => {
  // 1. Arrange: Chuẩn bị mock function cho prop onSubmit
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);

  // 2. Act: Tương tác người dùng
  // Tìm kiếm input dựa trên label (cách người dùng tương tác)
  const usernameInput = screen.getByLabelText(/username/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Nhập liệu (Nên dùng userEvent.type thay cho fireEvent.change)
  fireEvent.change(usernameInput, { target: { value: 'tester123' } });
  
  // Submit form
  fireEvent.click(submitButton);

  // 3. Assert: Kiểm định
  // Kiểm tra onSubmit đã được gọi chưa
  expect(mockSubmit).toHaveBeenCalledTimes(1);
  // Kiểm tra dữ liệu được truyền vào có đúng không
  expect(mockSubmit).toHaveBeenCalledWith({ username: 'tester123' });
});

test('2. Submit button is disabled when input is empty', () => {
  render(<LoginForm onSubmit={jest.fn()} />);

  // Tìm kiếm button
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Kiểm tra trạng thái ban đầu của button
  expect(submitButton).toBeDisabled();
  
  // Nhập liệu và kiểm tra lại
  const usernameInput = screen.getByLabelText(/username/i);
  fireEvent.change(usernameInput, { target: { value: 'a' } });
  expect(submitButton).not.toBeDisabled();
});
```

-----

## 3\. End-to-End (E2E) Testing với Cypress / Playwright

Các công cụ này kiểm thử ứng dụng từ góc độ trình duyệt, đảm bảo các luồng công việc phức tạp hoạt động đúng đắn.

### Ví dụ Code: Cypress

Ví dụ kiểm tra quy trình đăng nhập thành công:

```javascript
// cypress/e2e/login_flow.cy.js (Tên file theo chuẩn mới)

describe('Login Flow', () => {
  it('should allow a user to successfully log in and see the dashboard', () => {
    // 1. Ghé thăm trang đăng nhập
    cy.visit('/login'); 

    // 2. Tìm kiếm và điền thông tin vào các trường input
    // Dùng .get() với selector ổn định (ví dụ: attribute name)
    cy.get('input[name=username]').type('testuser'); 
    cy.get('input[name=password]').type('password123');

    // 3. Click nút đăng nhập
    cy.get('button[type=submit]').click();

    // 4. Kiểm định: Xác minh người dùng đã được chuyển hướng đến trang dashboard
    cy.url().should('include', '/dashboard');

    // 5. Kiểm định: Xác minh nội dung trên dashboard xuất hiện
    cy.contains('h1', 'Welcome, testuser').should('be.visible');
  });
});
```

-----

## 4\. Best Practices (Thực tiễn tốt nhất) trong Kiểm thử

### Nguyên tắc chung:

  * **Sử dụng RTL làm tiêu chuẩn:** Luôn ưu tiên RTL cho Unit/Component Testing. Nó buộc bạn phải kiểm thử mã của mình theo cách mà người dùng trải nghiệm, giúp bài test mạnh mẽ hơn và ít bị phá vỡ khi refactoring.
  * **Tránh kiểm thử chi tiết triển khai:** Đừng kiểm tra state nội bộ (`useState`) hoặc props trừ khi thực sự cần thiết. Thay vào đó, hãy kiểm tra **kết quả hiển thị trên DOM** sau khi state thay đổi.
  * **Áp dụng "Test Pyramid":**
      * **Nhiều (Phần lớn):** **Unit Tests** (Nhanh, rẻ, dễ viết).
      * **Vừa phải:** **Integration Tests** (Kiểm tra giao tiếp giữa các module).
      * **Ít (Phần nhỏ):** **E2E Tests** (Chậm, đắt, nên chỉ kiểm tra các luồng kinh doanh quan trọng nhất).

### Kỹ thuật nâng cao:

1.  **Tập trung vào Truy vấn (Queries) tốt nhất (RTL/Playwright):**
    Khi tìm kiếm element, hãy dùng các truy vấn mà người dùng sẽ sử dụng (theo thứ tự ưu tiên):

      * `getByRole` (ví dụ: button, link, heading)
      * `getByLabelText` (cho input)
      * `getByPlaceholderText`
      * `getByText`
      * `getByTestId` (Chỉ dùng khi không có lựa chọn nào khác)

2.  **Mock API Calls (Jest/RTL):**
    Sử dụng `jest.mock('axios')` hoặc **MSW (Mock Service Worker)** để chặn (intercept) các cuộc gọi API. Điều này đảm bảo các bài kiểm thử component của bạn **nhanh chóng**, **đáng tin cậy** và không phụ thuộc vào tình trạng của server.

3.  **Selector ổn định (Cypress/Playwright):**
    Trong E2E, tránh sử dụng các class CSS dễ thay đổi. Hãy ưu tiên các thuộc tính dành riêng cho test như **`data-testid`** hoặc **`data-cy`** để làm Selector.

4.  **Tận dụng Auto-Waiting (Cypress/Playwright):**
    Tránh sử dụng các lệnh `wait(ms)` cứng nhắc. Cả hai framework đều có cơ chế tự động chờ phần tử xuất hiện. Đối với các hành động bất đồng bộ (async), hãy chờ phản hồi API (`cy.wait('@alias')` trong Cypress hoặc `page.waitForResponse` trong Playwright).