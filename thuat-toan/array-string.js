// 🔹 Array / String
// Longest Substring Without Repeating Characters
// Move Zeroes
// Valid Parentheses

// ====================================== Two Sum ======================================*

// 1️⃣ Hash Map là gì?
// Hash Map là cấu trúc dữ liệu dùng để lưu dữ liệu theo cặp key → value, giúp tìm / thêm / xoá rất nhanh (O(1)).
// Trong JavaScript
// Hash Map thường là:
// Object
// Map
// const map = new Map();
// map.set('a', 1);
// map.set('b', 2);
// map.get('a'); // 1
// map.has('b'); // true

// input nums = [2, 7, 11, 15]
// target = 9
// output = [0, 1]
// time complexity: O(n)
// space complexity: O(n)
const twoSum = (arr, target) => {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const num = target - arr[i];
    if (map.has(num)) {
      return [map.get(num), i];
    }

    console.log(map);

    // Map(3) { 2 => 0, 7 => 1, 11 => 2 }

    map.set(arr[i], i);
  }
};

// // ====================================== lengthOfLongestSubstring ======================================*
// const set = new Set();

// set.add(1);
// set.add(2);
// set.add(2);

// console.log(set); // Set {1, 2}

const lengthOfLongestSubstring = (s) => {
  // dùng giải thuật 2 con trỏ, two pointer 1 con trỏ đi trước, 1 con trỏ đi sau
  // s = "a b c a b c b b"
  //   -
  // 3

  const set = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }

    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};

// input = [0, 1, 0, 3, 12]
// output = [1, 3, 12, 0, 0]

//  ====================================== moveZeros ======================================*

const moveZeros = (arr) => {
  // time complexity: O(n)
  // space complexity: O(1)

  let index = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      arr[index] = arr[i];
      index++;
    }
  }

  for (let i = index; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
};

//  ====================================== Valid Parentheses ======================================*

// ❓ Stack lưu vào đâu?

// 👉 Stack lưu trong bộ nhớ (RAM)
// Cụ thể là vùng Stack Memory hoặc Heap Memory tuỳ ngữ cảnh.

// 1️⃣ Stack là gì?

// Stack là cấu trúc dữ liệu tuyến tính hoạt động theo nguyên tắc:

// LIFO – Last In, First Out
// 👉 Vào sau → ra trước

// 📦 Giống như chồng đĩa:

// Đặt đĩa lên trên (push)

// Lấy đĩa trên cùng ra (pop)

// input = "()[]{}"
// output = true

// input = "(]"
// output = false

const isValid = (s) => {
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const stack = [];

  for (let char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};

//  ====================================== Reverse String ======================================*

// input = ["h", "e", "l", "l", "o"]
// output = ["o", "l", "l", "e", "h"]

// giai bang thuat toan dung 2 con tro
function reverseString(s) {
  // return s.split('').reverse().join('');
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}

// ====================================== Remove Duplicates ======================================*
// input = [1,1,2]
// output = 2, nums = [1,2,_]

// dung 2 con tro

const removeDuplicates = (nums) => {
  // mang da sap xep

  if (nums.length === 0) return 0;

  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    if(nums[i] !== nums[j]){
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
};


// ====================================== Best Time to Buy and Sell Stock ======================================*
// input = [7,1,5,3,6,4]
// output = 5

const maxProfit = (prices) => {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
};

// ====================================== Climbing Stairs ======================================*
// input = 3
// output = 3

const climbStairs = (n) => {
  if (n <= 2) return n;

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }

  return second;
};

// ====================================== Merge Sorted Array ======================================*
// input = [1,2,3,0,0,0], 3, [2,5,6], 3
// output = [1,2,2,3,5,6]

const merge = (nums1, m, nums2, n) => {
  let i = m - 1; // pointer for nums1
  let j = n - 1; // pointer for nums2
  let k = m + n - 1; // pointer for merged array    

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    }     else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;          
  }
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
};

// ====================================== Valid Anagram ======================================*
// input = "anagram", "nagaram"
// output = true

const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;

  const count = {};

  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of t) {
    if (!count[char]) {
      return false;
    }
    count[char]--;
  }

  return true;
};

// ====================================== First Unique Character in a String ======================================*
// input = "leetcode"
// output = 0

const firstUniqChar = (s) => {
  const count = {};

  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) {
      return i;
    }
  }

  return -1;
};

// ====================================== Implement strStr() ======================================*
// input = "hello", "ll"
// output = 2

const strStr = (haystack, needle) => {
  if (needle === "") return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }

  return -1;
};  

// ====================================== Count and Say ======================================*    
// input = 1  
// output = "1" 

const countAndSay = (n) => {
  if (n === 1) return "1";

  const prev = countAndSay(n - 1);
  let result = "";
  let count = 1;

  for (let i = 1; i < prev.length; i++) {
    if (prev[i] === prev[i - 1]) {
      count++;
    } else {
      result += count.toString() + prev[i - 1];
      count = 1;
    }
  }

  result += count.toString() + prev[prev.length - 1];

  return result;  
}
// ====================================== Maximum Subarray ======================================*
// input = [-2,1,-3,4,-1,2,1,-5,4]
// output = 6

const maxSubArray = (nums) => {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
};

// ====================================== Plus One ======================================*
// input = [1,2,3]
// output = [1,2,4]

const plusOne = (digits) => {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
};

// ====================================== Palindrome Number ======================================*
// input = 121
// output = true

const isPalindrome = (x) => {
  if (x < 0) return false;

  let reversed = 0;
  let original = x;

  while (x > 0) {
    const digit = x % 10;
    reversed = reversed * 10 + digit;
    x = Math.floor(x / 10);
  }

  return original === reversed;
};

// ====================================== Roman to Integer ======================================*
// input = "III"
// output = 3

const romanToInt = (s) => {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = map[s[i]];
    const next = map[s[i + 1]];

    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  return total;
};

// ====================================== Integer to Roman ======================================*
// input = 3
// output = "III"

const intToRoman = (num) => {    
  const map = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];    
  let result = "";
  for (let i = 0; i < map.length; i++) {
    while (num >= map[i].value) {
      result += map[i].symbol;
      num -= map[i].value;
    }
  }
  return result;
};  
// ====================================== Summary Ranges ======================================*
// input = [0,1,2,4,5,7]
// output = ["0->2","4->5","7"]

const summaryRanges = (nums) => {
  const result = [];
  let i = 0;

  while (i < nums.length) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }
    let end = nums[i];    
    if (start === end) {
      result.push(start.toString());
    } else {
      result.push(start + "->" + end);
    }
    i++;
  }
  return result;
};  