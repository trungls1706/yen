// 30 Câu Phỏng Vấn Kỹ Thuật Với Javascript (Phần 1)
// https://codelearn.io/sharing/30-cau-phong-van-javascript-phan-1
//1 Đảo ngược chuỗi
function reverseString(s) {
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
// console.log(reverseString(""))
// console.log(reverseString("abc"))
// console.log(reverseString("aaabbbcccd"))

//2 Viết một function filter number từ một mảng.
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
// console.log(filterNumbers([1, "2", " ", NaN, Number.POSITIVE_INFINITY, 66, "ab1", false]))

//3 Viết function tìm kiếm phần tử trong một mảng
// Linear Search == tìm kiếm tuyến tính"
// Trong trường hợp tốt nhất độ phức tạp của thuật toán này là O(1), trường hơp xấu nhất là O(n), trung bình cũng là O(n).

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
}

let arr = [1, 3, 5, 7, 9, 11, 14, 18, 22];
// console.info("Item was found at index: " + linearSearch(arr, 22));


//4 Viết function mô tả được closure trong js.
// Closure là một chức năng có quyền truy cập vào phạm vi cha, ngay cả sau khi scope đã đóng.


function parent(name) {
    return function child(val) {
        console.log(name, val)
    }
}

function multiplier(first) {
    let a = first;
    return function (b) {
        return a * b;
    };
}

// let multiplyBy2 = multiplier(2);
// console.info(multiplyBy2(4));
// console.info(multiplyBy2(5));

// let aaa = parent('son')
// aaa('trung')
// console.log(aaa)


//5 trả về mảng level1
//Write a function that flattens a list of items

function flatten(arr = []) {
    // Create the result list;
    let result = [];
    for (let item of arr) {
        // If item is an array we concat the contents
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result = result.concat(item);
        }
    }
    return result;
}
// console.info(flatten([[1, 2, [3]], 4]));


// 6 Viết function nhận đầu vào là 2 số a, b và trả về thương số và số dư của phép chia a,b.


//7 Tính tổng các số fibonacci của một số N.

function fib(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}


function memo(func) {
    let cache = {};
    return function (x) {
        if (x in cache) return cache[x];
        return cache[x] = func(x);
    };
};

let fib2 = memo(function (n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
});


console.log(fib(20))