const mergeSort = arr => {
    // *** Chúng ta sẽ không chia arr ra thành các mảng con nữa nếu arr chỉ có 1 phần tử
    if (arr.length <= 1) return arr;

    // *** vì splice sẽ thay đổi giá trị của arr nên mình copy arr để giữ nguyên giá trị ban đầu của nó
    const right = [...arr];

    // *** chia đôi mảng ra thành 2 mảng con
    const middlePoint = arr.length / 2;
    const left = right.splice(0, middlePoint);

    // *** tiếp tục chia các mảng con ra thành các mảng con
    return mergeUnsortedArrs(mergeSort(left), mergeSort(right));
}


const mergeUnsortedArrs = (left, right) => {
    // *** các phần tử cần được sắp xếp lại sẽ được chứa ở đây
    const sortedItems = [];

    /*
       *** Chúng ta sẽ dùng method shift của Array để loại bỏ các phần tử của 2 mảng left và right
           trong từng vòng lặp. Nên, nếu 1 trong 2 mảng left và right là mảng trống => ta khg thể
           và cũng khg cần phải so sánh thêm nữa,
    */
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            sortedItems.push(left.shift())
        } else {
            sortedItems.push(right.shift())
        }
    }

    // *** kết hợp (merge) các cặp mảng con đã được sắp xếp lại với nhau thành một mảng mới,
    return [...sortedItems, ...left, ...right];
}

const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr)); // *** => [3, 9, 10, 27, 38, 43, 82]