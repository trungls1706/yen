const { Children } = require("react");

const firstNonRepeating = (text) => {
  const map = new Map();
  for (let char of text) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let char of text) {
    if (map.get(char) === 1) return char;
  }

  return "";
};

// console.log(firstNonRepeating("naver")); // 'n'
// console.log(firstNonRepeating("aabbcc")); // ''
// console.log(firstNonRepeating("swiss")); // 'w'

//  --------------------------------------

const flatten = (arr) => {
  let result = [];

  for (let i of arr) {
    if (Array.isArray(i)) {
      result.push(...flatten(i));
    } else {
      result.push(i);
    }
  }

  return result;
};

// console.log(flatten([1, [2, [3, [4]], 5]])); // [1, 2, 3, 4, 5]

//  --------------------------------------

const groupAnagrams = (array) => {
  const map = new Map();

  for (let char of array) {
    let key = char.split("").sort().join("");
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(char);
  }

  return [...map.values()];
};

// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// ----------------------------------

const deepEqual = (a, b) => {};

// ----------------------------------

const twoSum = (arr, target) => {
  const map = new Map();
  const result = [];
  for (let i in arr) {
    const num = target - arr[i];

    if (map.has(num)) {
      return [map.get(num), i];
    }

    map.set(arr[i], i);
  }

  return [];
};

// console.log(twoSum([2,7,11,15], 9)); // [0, 1]

// ==================================

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);

    // xoa
    this.cache.delete(key);
    // gán len dau
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    // ton tai
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // lay ra phan tu dau tien, xoa
    else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 1
cache.put(3, 3); // evicts key 2
cache.get(2); // -1

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall > delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const items = [
  { id: 1, parentId: null, name: "A" },
  { id: 2, parentId: 1, name: "B" },
  { id: 3, parentId: 1, name: "C" },
  { id: 4, parentId: 2, name: "D" },
];
// [
//   {
//     id: 1,
//     name: "A",
//     children: [
//       { id: 2, name: "B", children: [{ id: 4, name: "D", children: [] }] },
//       { id: 3, name: "C", children: [] },
//     ],
//   },
// ];



function buildTree(items) {
  const map = new Map();
  const roots = [];

  // 1. Create map: id -> node (clone + children)
  for (const item of items) {
    map.set(item.id, {
      ...item,
      children: [],
    });
  }

  // 2. Link parent -> children
  for (const item of items) {
    const node = map.get(item.id);

    if (!item.parentId) {
      // root node
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);

      // ⚠️ safe check (tránh crash nếu parent không tồn tại)
      if (parent) {
        parent.children.push(node);
      } else {
        // optional: treat as root if orphan
        roots.push(node);
      }
    }
  }

  return roots;
}

// {
//     1=>{ id: 1, parentId: null, name: 'A', children: [] },
//     2=>{ id: 2, parentId: 1, name: 'B', children: [] },
//     3=>{ id: 3, parentId: 1, name: 'C', children: [] },
//     4=>{ id: 4, parentId: 2, name: 'D', children: [] }
// }

console.log(buildTree(items));

//   Map(4) {
//   1 => { id: 1, parentId: null, name: 'A', children: [] },
//   2 => { id: 2, parentId: 1, name: 'B', children: [] },
//   3 => { id: 3, parentId: 1, name: 'C', children: [] },
//   4 => { id: 4, parentId: 2, name: 'D', children: [] }
// }
