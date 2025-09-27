Tuyệt vời\! Tôi sẽ tổng hợp **toàn bộ** các kiến thức bạn yêu cầu vào một **Cheat Sheet (README)** đầy đủ, bao gồm lý thuyết và code minh hoạ bằng **JavaScript** (JS).

Đây là bản tổng hợp đầy đủ nhất.

-----

# 🧑‍💻 CS & DSA Full Cheat Sheet (JavaScript/TypeScript)

## 1\. ⚙️ CS Fundamentals (Kiến Thức Cơ Bản)

| Khái niệm | Đặc điểm chính | Big-O |
| :--- | :--- | :--- |
| **Stack** | LIFO (Last-In, First-Out). Dùng cho Backtracking, Đệ quy. | $O(1)$ (Push/Pop) |
| **Queue** | FIFO (First-In, First-Out). Dùng cho BFS, Task Scheduling. | $O(1)$ (Enqueue/Dequeue) |
| **Array** | Truy cập ngẫu nhiên ($O(1)$). Bộ nhớ liên tục. Kích thước tĩnh. | $O(n)$ (Insert/Delete ở giữa) |
| **Linked List** | Thêm/Xóa nhanh ($O(1)$). Bộ nhớ không liên tục. Tốn bộ nhớ hơn (con trỏ). | $O(n)$ (Truy cập/Tìm kiếm) |
| **Hash Table** | Sử dụng **Hàm băm** để ánh xạ Key $\rightarrow$ Index. | $O(1)$ (Average, Insert/Search/Delete) |
| **Hash Collision** | Xử lý bằng **Separate Chaining** (DSLK/Mảng tại Index) hoặc **Open Addressing** (tìm ô trống tiếp theo). | $O(n)$ (Worst, khi nhiều collision) |
| **DFS** | Dùng **Stack/Recursion**. Tìm kiếm theo **chiều sâu**. Dùng để tìm đường đi/Cycle. | |
| **BFS** | Dùng **Queue**. Tìm kiếm theo **chiều rộng**. Tìm đường đi **ngắn nhất** (unweighted). | |
| **Recursion** | Hàm gọi lại chính nó. Dễ đọc cho Tree/Graph. Tốn **Stack Memory** (nguy cơ Stack Overflow). | |
| **Iteration** | Dùng vòng lặp. **Hiệu quả** hơn về bộ nhớ. | |
| **Greedy** | Chọn tối ưu **cục bộ** tại mỗi bước. Chỉ dùng khi có tính chất **Greedy Choice**. | |
| **DP (Dynamic Programming)** | Giải bài toán con **chồng chéo**. Dùng **Memoization** (Top-down) hoặc **Tabulation** (Bottom-up). | |
| **Stack Memory** | Cho biến cục bộ, con trỏ hàm. Cấp phát **tự động**, cực nhanh, kích thước nhỏ. | |
| **Heap Memory** | Cho cấp phát động (`new`). Cấp phát thủ công/GC, chậm hơn, kích thước lớn. | |

-----

## 2\. 📚 Data Structures & Algorithms (DS & Algo)

### 2.1. Array & String

#### A. Kadane’s Algorithm (Max Subarray Sum)

Tìm Subarray có tổng lớn nhất trong $O(n)$.

```javascript
const maxSubArray = (nums) => {
    let maxSoFar = nums[0];
    let currentMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Hoặc bắt đầu subarray mới, hoặc nối tiếp
        currentMax = Math.max(nums[i], currentMax + nums[i]); 
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    return maxSoFar;
};
```

#### B. Xoay mảng (Rotate Array) $k$ phần tử

Kỹ thuật **Reverse 3 lần** trong $O(n)$.

```javascript
const reverse = (arr, start, end) => {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
};

const rotate = (nums, k) => {
    k = k % nums.length; // Xử lý k lớn hơn length
    nums.reverse(); // 1. Reverse toàn bộ
    reverse(nums, 0, k - 1); // 2. Reverse k phần tử đầu
    reverse(nums, k, nums.length - 1); // 3. Reverse phần còn lại
};
```

#### C. Ký tự đầu tiên không lặp (First Unique Character)

Dùng **Hash Map** để đếm tần suất.

```javascript
const firstUniqChar = (s) => {
    const freq = {};
    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }
    for (let i = 0; i < s.length; i++) {
        if (freq[s[i]] === 1) {
            return i; // Trả về index
        }
    }
    return -1;
};
```

-----

### 2.2. Linked List (Danh sách liên kết)

#### A. Reverse Linked List (Đảo ngược) - Iteration

Sử dụng 3 con trỏ: `prev`, `current`, `next_node`.

```javascript
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

const reverseList = (head) => {
    let prev = null;
    let current = head;
    while (current) {
        const nextNode = current.next; // Lưu next
        current.next = prev;           // Đảo chiều
        prev = current;                // Di chuyển prev
        current = nextNode;            // Di chuyển current
    }
    return prev; // prev là head mới
};
```

#### B. Detect Cycle (Phát hiện Chu trình) - Floyd’s (Slow/Fast Pointers)

Fast pointer đi nhanh gấp đôi Slow pointer. Nếu gặp nhau $\rightarrow$ có Cycle.

```javascript
const hasCycle = (head) => {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true; // Cycle detected
        }
    }
    return false; // No cycle
};
```

-----

### 2.3. Stack & Queue

#### A. Min Stack ($O(1)$ getMin)

Sử dụng **Stack chính** và **Stack phụ** (Min Stack) để lưu giá trị nhỏ nhất hiện tại.

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        // Chỉ push vào minStack nếu val nhỏ hơn hoặc bằng min hiện tại
        const currentMin = this.minStack.length > 0 ? this.minStack[this.minStack.length - 1] : Infinity;
        this.minStack.push(Math.min(val, currentMin));
    }

    pop() {
        this.minStack.pop();
        return this.stack.pop();
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

#### B. LRU Cache (Least Recently Used)

Thường dùng **HashMap** (tra cứu $O(1)$) kết hợp với **Doubly Linked List** (thêm/xóa $O(1)$).

-----

### 2.4. Hash Table (Bảng băm)

#### Two Sum Problem

Đã có code ở mục 4.B. Độ phức tạp $O(n)$

#### Anagram Check

Sử dụng **Map** để đếm tần suất.

```javascript
const isAnagram = (s, t) => {
    if (s.length !== t.length) return false;

    const charCount = new Map();
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (const char of t) {
        if (!charCount.has(char) || charCount.get(char) === 0) {
            return false;
        }
        charCount.set(char, charCount.get(char) - 1);
    }
    return true; // Nếu tần suất giảm hết và length bằng nhau
};
```

-----

### 2.5. Tree & Graph

#### A. Tree Traversals (Duyệt cây)

| Thứ tự | Logic |
| :--- | :--- |
| **Inorder** | Left $\rightarrow$ Root $\rightarrow$ Right. Cho **BST** $\rightarrow$ mảng sắp xếp. |
| **Preorder** | Root $\rightarrow$ Left $\rightarrow$ Right. Dùng để tạo bản sao (Clone). |
| **Postorder** | Left $\rightarrow$ Right $\rightarrow$ Root. Dùng để xóa cây (Delete). |

```javascript
// Inorder Traversal
const inorder = (root) => {
    if (!root) return;
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
};
```

#### B. Kiểm tra Binary Search Tree (BST) hợp lệ

Giá trị của Node phải nằm trong khoảng $(min, max)$ hợp lệ.

```javascript
const isValidBST = (root, min = -Infinity, max = Infinity) => {
    if (!root) return true;

    if (root.val <= min || root.val >= max) {
        return false;
    }
    // Cây con trái: max mới là root.val
    const leftValid = isValidBST(root.left, min, root.val);
    // Cây con phải: min mới là root.val
    const rightValid = isValidBST(root.right, root.val, max);

    return leftValid && rightValid;
};
```

#### C. Breadth-First Search (BFS) - Tìm đường đi ngắn nhất (unweighted)

Sử dụng **Queue**.

```javascript
const bfs = (graph, startNode) => {
    const queue = [startNode];
    const visited = new Set();
    visited.add(startNode);

    while (queue.length > 0) {
        const node = queue.shift(); // Dequeue
        console.log(node);

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor); // Enqueue
            }
        }
    }
};
```

-----

### 2.6. Heap / Priority Queue

#### A. K largest elements

Sử dụng **Min-Heap** (Priority Queue).

1.  Duyệt qua mảng.
2.  Thêm phần tử vào Min-Heap.
3.  Nếu kích thước Heap $> K$, **Pop** phần tử nhỏ nhất (root) ra.
4.  Sau khi duyệt xong, Heap còn lại $K$ phần tử lớn nhất.

<!-- end list -->

  * **Complexity:** $O(n \log k)$

#### B. Median of data stream

Sử dụng **hai Heap** (Max-Heap cho nửa dưới, Min-Heap cho nửa trên) để duy trì hai nửa của dữ liệu luôn cân bằng về số lượng phần tử.

  * **Median:** Là root của Heap lớn hơn, hoặc trung bình cộng của hai root nếu hai Heap có kích thước bằng nhau.
  * **Complexity:** $O(\log n)$ (Insert), $O(1)$ (Find Median)

-----

## 3\. ⚡️ Algorithms

### 3.1. Sorting (Sắp xếp)

| Thuật toán | Complexity (Average) | Ưu điểm (Khi nào dùng) |
| :--- | :--- | :--- |
| **Quick Sort** | $O(n \log n)$ | Array, tốc độ nhanh nhất trong thực tế (cache friendly). |
| **Merge Sort** | $O(n \log n)$ | **Ổn định** (Stable). Tốt cho Linked List và External Sort. |
| **Insertion Sort** | $O(n^2)$ | Array **gần sắp xếp** hoặc $n$ rất nhỏ. |

### 3.2. Binary Search

#### Search trong Rotated Sorted Array

$O(\log n)$.

```javascript
const searchRotated = (nums, target) => {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;

        // Xác định phần mảng nào được sắp xếp bình thường
        if (nums[left] <= nums[mid]) { // Phần trái sắp xếp
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1; // Target nằm bên trái
            } else {
                left = mid + 1;  // Target nằm bên phải
            }
        } else { // Phần phải sắp xếp
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;  // Target nằm bên phải
            } else {
                right = mid - 1; // Target nằm bên trái
            }
        }
    }
    return -1;
};
```

### 3.3. Dynamic Programming (DP)

#### Longest Common Subsequence (LCS)

$O(m \times n)$. (Xem chi tiết ở mục 2.D.2)

#### Coin Change (Tìm số đồng xu tối thiểu)

Sử dụng mảng DP để lưu số đồng xu tối thiểu cho tổng từ 0 đến $amount$.

```javascript
const coinChange = (coins, amount) => {
    // dp[i] là số đồng xu tối thiểu cần để đạt được tổng i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // 0 đồng xu cho tổng 0

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            // Cập nhật dp[i] = min(dp[i] hiện tại, dp[i - coin] + 1)
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    // Nếu dp[amount] là Infinity, không tìm được cách đổi
    return dp[amount] === Infinity ? -1 : dp[amount];
};
```

### 3.4. Backtracking

#### N-Queens Problem

Tìm tất cả các cách đặt $N$ quân hậu trên bàn cờ $N \times N$ sao cho không quân nào tấn công nhau.

```javascript
const solveNQueens = (n) => {
    const board = new Array(n).fill(0).map(() => new Array(n).fill('.'));
    const results = [];

    const isSafe = (row, col) => {
        // Kiểm tra cột, chéo lên, chéo xuống
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
            if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
        }
        return true;
    };

    const backtrack = (row) => {
        if (row === n) {
            results.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q'; // Đặt Hậu (Thử)
                backtrack(row + 1);    // Đệ quy
                board[row][col] = '.'; // Quay lui (Undo)
            }
        }
    };

    backtrack(0);
    return results;
};
```
