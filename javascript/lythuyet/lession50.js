//Bubble Sort
// https://viblo.asia/p/implementing-sorting-algorithms-in-javascript-GrLZDv6E5k0
const arr = [6, 5, 3, 1, 8, 7, 2, 4]

function bubbleSort(arr) {
    const len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            console.log('i', i)
            console.log('j', j)
            console.log('-------')
            if (arr[j - 1] > arr[j]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    let minIndex, temp,
        len = arr.length;

    for (let i = 0; i < len; i++) {
        minIndex = i;
        // tìm index của giá trị nhỏ nhất
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Đổi chỗ
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

let result = bubbleSort(arr)
console.log(result)
