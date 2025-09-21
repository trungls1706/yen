
# 📘 HTML & CSS Cheatsheet

## HTML

### 1. Semantic HTML là gì?
- **Semantic HTML**: HTML có ý nghĩa về mặt **cấu trúc và nội dung**, giúp:
  - Trình duyệt hiểu rõ vai trò của phần tử.
  - Công cụ tìm kiếm (SEO) index chính xác.
  - Hỗ trợ **Accessibility** (screen reader).

#### Ví dụ `<article>` vs `<section>`
| Thẻ | Khi nào dùng | Ví dụ |
|-----|--------------|-------|
| `<article>` | Nội dung **độc lập**, tách ra vẫn có nghĩa riêng. | Bài blog, bài báo, comment. |
| `<section>` | Nhóm nội dung **liên quan**, thường có heading mô tả. | Mục "Tin tức", "Liên hệ". |

```html
<article>
  <h2>Bài viết: Học React</h2>
  <p>React là một thư viện JS phổ biến...</p>
</article>

<section>
  <h2>Tin tức công nghệ</h2>
  <article><h3>Apple ra mắt iPhone</h3></article>
  <article><h3>Google phát hành Android mới</h3></article>
</section>
```

---

### 2. `<button>` vs `<a>`
| Thẻ | Ý nghĩa | Khi dùng |
|-----|---------|----------|
| `<button>` | Hành động trong UI (submit, mở modal, toggle). | Khi cần **tương tác nội bộ** trong trang. |
| `<a>` | Liên kết điều hướng (đến URL khác hoặc anchor). | Khi cần **chuyển trang** hoặc cuộn đến một phần khác. |

👉 Nguyên tắc:  
- **Điều hướng → `<a>`**  
- **Hành động → `<button>`**

---

### 3. Thuộc tính `alt` trong `<img>`
- Mô tả **nội dung ảnh**.
- Lợi ích:
  - **SEO**: công cụ tìm kiếm hiểu ảnh.
  - **Accessibility**: screen reader đọc alt.
  - Hiển thị khi ảnh **không load được**.

```html
<img src="dog.jpg" alt="Chú chó màu vàng đang chạy trên cỏ">
```

---

### 4. Thẻ `<meta>`
Cung cấp **metadata** (thông tin mô tả) cho trình duyệt và máy tìm kiếm.

#### Ứng dụng
- **SEO**
```html
<meta name="description" content="Trang web chia sẻ kiến thức lập trình React và JS">
<meta name="keywords" content="React, JavaScript, học lập trình, frontend">
```

- **Responsive**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### 5. Khi nào dùng `<form>` thay vì `<div>` + JS?
| Dùng `<form>` khi... | Vì sao? |
|----------------------|---------|
| Login, đăng ký, tìm kiếm, checkout. | Có sẵn **submit mặc định** (Enter để gửi). |
| Cần **accessibility** tốt. | Screen reader, tab order hỗ trợ. |
| Muốn **autofill / autocomplete** từ trình duyệt. | Tiện cho người dùng. |
| Muốn trang vẫn hoạt động khi **JS bị tắt**. | Progressive enhancement. |

👉 `<div>` + JS chỉ nên dùng khi **custom hoàn toàn**, nhưng vẫn kém `<form>` về accessibility.

---

## CSS

### 1. Các giá trị của `position`
| Giá trị | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| **static** (mặc định) | Không bị ảnh hưởng bởi `top`, `left`, `right`, `bottom`. | Văn bản bình thường. |
| **relative** | Giữ chỗ trong flow, nhưng có thể **dịch chuyển tương đối** vị trí ban đầu. | Tooltip nhỏ lệch nhẹ. |
| **absolute** | Bị loại khỏi flow, định vị **so với tổ tiên gần nhất có position khác static**. | Pop-up, badge. |
| **fixed** | Cố định so với **viewport**, không bị cuộn trang. | Thanh navbar cố định trên đầu. |
| **sticky** | Kết hợp relative + fixed. Lúc đầu scroll theo, đến ngưỡng thì **dính cố định**. | Header dính ở đầu khi cuộn. |

---

### 2. Flexbox vs CSS Grid
| Tiêu chí | **Flexbox** | **CSS Grid** |
|----------|-------------|--------------|
| Trục | 1D (một chiều: hàng hoặc cột). | 2D (cả hàng và cột). |
| Khi dùng | Align items trong 1 row/column. | Layout toàn trang/phức tạp. |
| Ưu điểm | Dễ canh giữa, co giãn theo nội dung. | Layout grid rõ ràng, mạnh với responsive. |
| Nhược điểm | Khó quản lý layout nhiều hàng/cột. | Cú pháp phức tạp hơn. |

👉 Quy tắc:  
- **Flexbox**: thành phần nhỏ, align.  
- **Grid**: layout chính, chia vùng trang.  

---

### 3. CSS Specificity (độ ưu tiên)
Thứ tự ưu tiên (từ thấp → cao):  
1. **Element** (`div`, `p`, `h1`) → 0-0-1  
2. **Class, pseudo-class** (`.btn`, `:hover`) → 0-1-0  
3. **ID** (`#main`) → 1-0-0  
4. **Inline style** (`style=""`) → 1-0-0-0  
5. **!important** → cao nhất (nên hạn chế).  

#### Ví dụ
```css
div { color: blue; }        /* 0-0-1 */
.container p { color: red;} /* 0-1-1 */
#main p { color: green; }   /* 1-0-1 */
```
👉 Kết quả: `green` thắng.  

---

### 4. Inline vs Inline-block vs Block
| Kiểu | Đặc điểm | Ví dụ |
|------|----------|-------|
| **inline** | Không xuống dòng, chỉ chiếm nội dung, **không set được width/height**. | `<span>`, `<a>` |
| **inline-block** | Giữ đặc tính inline (nằm cùng dòng), nhưng **set được width/height**. | Menu item. |
| **block** | Chiếm toàn bộ chiều ngang, **xuống dòng mới**. | `<div>`, `<p>` |

---

### 5. Stacking Context (ngữ cảnh chồng lớp)
- Quy định cách các phần tử **xếp chồng (z-index)**.  
- Một phần tử có thể tạo **stacking context mới** khi:  
  - Có `position` + `z-index` (khác auto).  
  - Có `opacity < 1`.  
  - Một số thuộc tính CSS như `transform`, `filter`, `flex`, `grid`...  

👉 Nghĩa là `z-index` chỉ có tác dụng **trong stacking context của nó**, không ảnh hưởng ra ngoài.  

#### Ví dụ
```css
.parent {
  position: relative;
  z-index: 1;
}
.child {
  position: absolute;
  z-index: 999;
}
```
👉 `child` **chỉ nằm trên parent**, nhưng không thể vượt qua phần tử khác có stacking context cao hơn.  

---

### 6. Responsive Design
#### Mobile-first
- **Bắt đầu từ màn hình nhỏ (mobile)** → mở rộng dần.  
- Sử dụng `min-width` media queries.  
- Ưu điểm: nhẹ cho mobile, phù hợp xu hướng hiện nay.  

```css
.container {
  font-size: 14px;
}
@media (min-width: 768px) {
  .container { font-size: 16px; }
}
```

#### Desktop-first
- **Bắt đầu từ màn hình lớn (desktop)** → thu nhỏ dần.  
- Sử dụng `max-width` media queries.  
- Dễ quen với dev truyền thống, nhưng kém tối ưu mobile.  

```css
.container {
  font-size: 18px;
}
@media (max-width: 768px) {
  .container { font-size: 14px; }
}
```

👉 **Khuyến nghị hiện nay: Mobile-first** (ưu tiên trải nghiệm mobile).  



# 📘 HTML & CSS Q&A

### How to customize styles in a project?
- Có thể tùy chỉnh style trong dự án theo nhiều cách:
  1. **Inline styles**: thêm trực tiếp vào thuộc tính `style` trong HTML.  
     ```html
     <p style="color: red;">Hello</p>
     ```
  2. **Internal CSS**: viết trong thẻ `<style>` của file HTML.  
     ```html
     <style>
       p { color: blue; }
     </style>
     ```
  3. **External CSS**: tách ra file `.css` riêng, dùng `<link>` để import. (Khuyến khích).  
     ```html
     <link rel="stylesheet" href="styles.css">
     ```
  4. **CSS Preprocessor**: SCSS, LESS để viết code CSS có biến, mixin.  
  5. **CSS-in-JS / Utility-first**: styled-components, Tailwind CSS.  

---

### How does Media Query work?
- **Media Query** cho phép áp dụng CSS **tùy theo điều kiện môi trường** (kích thước màn hình, orientation, độ phân giải...).  
- Cú pháp:  
  ```css
  @media (max-width: 768px) {
    body {
      background-color: lightblue;
    }
  }
  ```
- Ví dụ trên: khi màn hình ≤ 768px, màu nền sẽ đổi thành xanh nhạt.  

---

### What are rem & em (besides pixel, are there any other units)?
- **px**: đơn vị tuyệt đối (1px = 1 điểm ảnh).  
- **em**: dựa trên **font-size của phần tử cha**.  
  - `2em` = gấp 2 lần font-size của cha.  
- **rem** (root em): dựa trên **font-size của root (`html`)**.  
  - Nếu `html { font-size: 16px }`, thì `2rem = 32px`.  

👉 Ngoài ra còn có các đơn vị khác:  
- **%**: theo phần trăm kích thước phần tử cha.  
- **vw / vh**: viewport width/height (1vw = 1% chiều rộng màn hình).  
- **vmin / vmax**: theo cạnh nhỏ/lớn hơn của viewport.  
- **ch**: chiều rộng của ký tự "0".  

---

### What HTML tag represents the root?
- Thẻ **`<html>`** là **root element** trong một tài liệu HTML.  
- Nó chứa toàn bộ nội dung trang: `<head>` + `<body>`.  

Ví dụ:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

---

### How many phases does an event in HTML have?
Sự kiện trong HTML có **3 giai đoạn (event phases)**:
1. **Capturing phase**: Sự kiện đi từ `window` → `document` → phần tử cha ngoài cùng.  
2. **Target phase**: Sự kiện xảy ra tại chính phần tử được target.  
3. **Bubbling phase**: Sự kiện lan ngược từ target → cha → document → window.  

👉 Có thể chọn `useCapture = true` khi `addEventListener` để bắt sự kiện ở **capturing** thay vì bubbling (mặc định).  

```js
element.addEventListener("click", handler, true); // capturing
element.addEventListener("click", handler, false); // bubbling
```
