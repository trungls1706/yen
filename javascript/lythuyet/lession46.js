//binary search



let binarySearch = (arr, start, end, num) => {

    if (end >= start) {
        let mid = start + (end - start) / 2;
        console.log('mid', mid)

        // Nếu arr[mid] = x, trả về chỉ số và kết thúc
        if (arr[mid] == num)
            return mid;

        // Nếu arr[mid] > x, gọi đệ quy tìm kiếm bên trái
        if (arr[mid] > num)
            return binarySearch(arr, start, mid - 1, num);

        // Ngược lại, nếu arr[mid] < x, gọi đệ quy tìm kiếm bên phải
        return binarySearch(arr, mid + 1, end, num);
    }

    // Trong trường hợp không tìm thấy
    return -1;
}


let arr = [2, 3, 4, 10, 40];
let num = 3;
let end = arr.length

let result = binarySearch(arr, 0, end - 1, num)
if (result) {
    console.log('thay')
} else {
    console.log('khong thay')
}

