Đây là tổng hợp so sánh giữa Webpack và Rollup, cùng với giải thích về mục đích cấu hình Webpack, được định dạng chi tiết bằng Markdown.

---

# Webpack và Rollup: So sánh Công cụ Đóng gói Mã nguồn (Module Bundlers)

## 1. Webpack Configuration (Mục đích cấu hình)

**Webpack** là một trình biên dịch module (**module bundler**), được thiết kế để gom và tối ưu hóa tất cả các tài nguyên (JavaScript, CSS, hình ảnh, fonts, v.v.) của ứng dụng thành một (hoặc nhiều) file đầu ra tối ưu cho trình duyệt.

Cấu hình Webpack là **bản hướng dẫn** chi tiết cho Webpack biết cách thực hiện việc đóng gói này.

### Các thành phần cấu hình chính:

| Khái niệm | Mục đích | Ví dụ |
| :--- | :--- | :--- |
| **`entry`** | Khai báo **điểm bắt đầu** của ứng dụng (file gốc) để Webpack bắt đầu quét dependencies. | `entry: './src/index.js'` |
| **`output`** | Xác định **nơi xuất ra** file bundle cuối cùng và tên file. | `filename: 'bundle.js', path: path.resolve(__dirname, 'dist')` |
| **`module.rules` (Loaders)** | Cho phép Webpack "hiểu" và xử lý các loại file **không phải JavaScript** (ví dụ: CSS, hình ảnh, TypeScript). | `{ test: /\.css$/, use: ['style-loader', 'css-loader'] }` |
| **`plugins`** | Thêm các **chức năng nâng cao** và mở rộng tính năng của quá trình đóng gói (ví dụ: tối ưu hóa, tạo file HTML tự động, truyền biến môi trường). | `new HtmlWebpackPlugin({...})` |
| **`mode`** | Đặt chế độ tối ưu hóa cho môi trường: `development` (nhanh, dễ debug) hoặc `production` (nén code, tối ưu hóa kích thước). | `mode: 'production'` |
| **`devServer`** | Cấu hình máy chủ phát triển cục bộ với các tính năng như Hot Module Replacement (HMR). | `devServer: { port: 3000, hot: true }` |

---

## 2. Webpack vs. Rollup (So sánh chi tiết)

Webpack và Rollup đều là module bundler nhưng có triết lý và mục đích sử dụng khác nhau.

### ⚔️ Mục đích và Triết lý

| Tiêu chí | Webpack | Rollup |
| :--- | :--- | :--- |
| **Mục đích chính** | Xây dựng **Ứng dụng web phức tạp (SPA)**: xử lý mọi thứ từ JS, CSS đến ảnh. | Xây dựng **Thư viện (Library) hoặc Package** tái sử dụng. |
| **Triết lý** | "All-in-one" - bộ công cụ toàn diện. | "Tree-shaking thuần túy" - hướng tới output nhẹ và tinh gọn. |

### ⚙️ Tính năng kỹ thuật

| Tiêu chí | Webpack | Rollup |
| :--- | :--- | :--- |
| **Tree Shaking** | Có hỗ trợ, nhưng đôi khi kém hiệu quả hơn Rollup. | **Rất hiệu quả** - có khả năng loại bỏ code chết (Dead Code) vượt trội. |
| **Code Splitting** | Hỗ trợ mạnh mẽ và linh hoạt (Dynamic `import()`, Lazy load). | Có hỗ trợ, nhưng cần cấu hình bổ sung và ít linh hoạt hơn. |
| **Hệ thống Module** | Hỗ trợ nhiều loại module (CommonJS, AMD, ESM). | Tối ưu hóa cho **ES Modules (ESM)**. |
| **Dev Server / HMR** | **Tích hợp sẵn** (`webpack-dev-server`). | Cần sử dụng plugin bên ngoài. |
| **Định dạng Output** | Chủ yếu tạo ra bundle để chạy trên trình duyệt. | Có thể xuất ra nhiều định dạng: **ESM, CJS, UMD, IIFE**. |

### 🚀 Khi nào dùng công cụ nào?

| Trường hợp sử dụng | Gợi ý | Lý do |
| :--- | :--- | :--- |
| **Xây dựng ứng dụng web lớn (React, Vue, Angular)** | **Webpack** (hoặc các công cụ dùng Webpack như Next.js) | Cần Code Splitting mạnh mẽ, Dev Server, và dễ dàng xử lý nhiều loại tài sản (assets). |
| **Xây dựng thư viện JavaScript (xuất ra npm)** | **Rollup** | Cần output nhỏ gọn, Tree-shaking tuyệt đối, và hỗ trợ nhiều định dạng module (`esm`, `cjs`). |
| **Nhu cầu Code Splitting phức tạp** | **Webpack** | Cung cấp các công cụ linh hoạt nhất để chia nhỏ bundle. |
| **Nhu cầu output siêu nhẹ, tối ưu Tree-shaking** | **Rollup** | Thích hợp cho các thư viện front-end như React, Vue, D3.js, Lodash-es. |

### 🧭 Tóm tắt nhanh:

| | Webpack | Rollup |
| :--- | :--- | :--- |
| **Thích hợp cho** | Ứng dụng web | Thư viện/Package |
| **Ưu điểm** | Đa năng, Dev Server mạnh, hỗ trợ mọi loại file. | Bundle nhỏ, Tree-shaking tối ưu, hỗ trợ đa định dạng. |
| **Nhược điểm** | Cấu hình phức tạp, bundle có thể lớn hơn. | Thiếu Dev Server mạnh mẽ, plugin ít đa dạng hơn. |