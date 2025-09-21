//bài tập 1: đảo ngược chuỗi
function reverseString(s) { // đảo ngược chuỗi
    // Create the result list
    const result = [];
    // Start from the end of the string and iterate towards the start
    for (let i = s.length - 1; i >= 0; i -= 1) {
        // Push the current char in the list
        result.push(s[i]);
    }
    // Combine the result in a string
    return result.join('');
}

// Examples
//    console.log(reverseString(""))
//    console.log(reverseString("abc"))
//    console.log(reverseString("aaabbbcccd"))


function filterNumbers(arr) {
    // Create the result list
    const result = arr.filter(function (value, i) {
        // Filter based on the rules for checking the input is number
        if (isNaN(value) || isBoolean(value) || isEmptyString(value)) {
            return false;
        }
        return true;
    });
    // Return numbers only list
    return result;
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isEmptyString(value) {
    return typeof value === 'string' && value.trim().length === 0;
}

//3. Viết function tìm kiếm phần tử trong một mảng
// Đây là ví dụ điển hình của thuật toán "tìm kiếm tuyến tính", tên tiếng Anh là "Linear Search". 
// Để giải quyết bàn toán này chúng ta phải duyệt qua tất cả các phần tử trong mảng để lấy ra được phần tử chúng ta cần tìm:
// tìm kiếm tuần tự từng phần tư
function linearSearch(arr, x) {
    let lo = 0;
    let hi = arr.length - 1;
    // Iterate from start till end of list
    while (lo <= hi) {
        // If item was found then return index
        if (arr[lo] === x) {
            return lo;
        } else {
            lo += 1
        }
    }
    // Return -1 to denote the item was not found
    return -1;

    // for (const i in arr) { // trả ra vị trí
    //     if (arr[i] === x) return i
    // }

}

// let arr = [1, 3, 5, 7, 9, 11, 14, 18, 22];
// console.info("Item was found at index: " + linearSearch(arr, 22));

// 6. Write a function that flattens a list of items (cái này dịch ra tiếng Việt hông có hay cho lắm).
// Đây cũng là một câu hỏi điển hình. Các bạn có thể hiểu được câu hỏi này qua ví dụ sau:
// Cho một mảng là: [1, [2,3, [4]]] thì sẽ trả về một mảng là [1,2,3,4]. Tức là mảng trả về chỉ gồm "1-level"
// Để có thể làm được điều này, quan trọng nhất là chúng ta phải xác định được mảng đó có bao nhiêu mảng con. Bên dưới là câu trả lời cho bài toán này:

function flatten(arr = []) {
    // Create the result list;
    let result = [];
    for (let item of arr) {
        // If item is an array we concat the contents
        if (Array.isArray(item)) {
            result = result.concat((item));
        } else {
            result = result.concat(item);
        }
    }
    return result;
}
// console.info(flatten([[1, 2, [3]], 4]));

// 7. Viết function tìm kiếm phần tử trong một mảng - dùng thuật toán tìm kiếm nhị phân

// Cũng là bài toán tìm kiếm phần tử trong mảng, nhưng lần này chúng ta không dùng linear search nữa mà là dùng binary search.
//  Cách implement thuật toán này bạn có thể xem code mẫu bên dưới:

// Binany Search(Tìm kiếm nhị phân) là một giải thuật tìm kiếm nhanh với độ phức tạp thời gian chạy là Ο(log n).
// Giải thuật tìm kiếm nhị phân làm việc dựa trên nguyên tắc chia để trị(Divide and Conquer).
// Để giải thuật này có thể làm việc một cách chính xác thì tập dữ liệu nên ở trong dạng đã được sắp xếp.

// Binary Search tìm kiếm một phần tử cụ thể bằng cách so sánh phần tử tại vị trí giữa nhất của tập dữ liệu.
// Nếu tìm thấy kết nối thì chỉ mục của phần tử được trả về.
// Nếu phần tử cần tìm là lớn hơn giá trị phần tử giữa thì phần tử cần tìm được tìm trong mảng con nằm ở bên phải phần tử giữa;
// nếu không thì sẽ tìm ở trong mảng con nằm ở bên trái phần tử giữa.
// Tiến trình sẽ tiếp tục như vậy trên mảng con cho tới khi tìm hết mọi phần tử trên mảng con này.

function binarySearch(arr, x) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        // Find mid element
        let m = Math.floor((lo + hi) / 2);
        // Check if equal to target
        if (arr[m] === x) {
            return m;
            // Reduce array search space by half
        } else if (arr[m] < x) {
            lo = m + 1;
        } else {
            hi = m - 1;
        }
    }
    // Item not found
    return -1;
}

// let arr = [1, 3, 5, 7, 9, 11, 14, 18, 22];
// console.info(console.info("Item was found at index: " + binarySearch(arr, 22)));

// 9. Tính tổng các số fibonacci của một số N.

function fib(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

// function memo(func) {
//     let cache = {};
//     return function (x) {
//         if (x in cache) return cache[x];
//         return cache[x] = func(x);
//     };
// };

// let fib = memo(function (n) {
//     if (n === 0) {
//         return 0;
//     } else if (n === 1) {
//         return 1;
//     } else {
//         return fib(n - 1) + fib(n - 2);
//     }
// });
// console.info(fib(2))

// 10. Viết function, nhận đầu vào là một chuỗi, trả về một "map" tần suất các kí tự xuất hiện trong chuỗi.

// Để tính toán tần suất, chúng ta sẽ dùng hash-table. 
// Thông thường, để giải bài toán này, chúng ta sẽ dùng object-mapping với key là các kí tự trong chuỗi và value là tần suất xuất hiện các kí tự đó, hoặc là dùng javascript Map

// Dưới đây là solution cho bài toán này:


