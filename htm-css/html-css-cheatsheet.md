
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
