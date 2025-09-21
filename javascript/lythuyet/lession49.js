// https://viblo.asia/p/ap-dung-thuat-toan-selection-sort-trong-javascript-aWj53GEe56m

function selectionSort(arr) {
    let currentValueNewIndex;

    // *** chạy một vòng lặp qua từng giá trị của mảng
    for (let i = 0; i < arr.length; i++) {
        /*
            *** biến này sẽ chứa giá trị của vị trí sau khi được hoán đổi
                của giá trị hiện tại của vòng lặp đầu tiên
        */
        currentValueNewIndex = i;

        /*
            *** chạy thêm một vòng lặp qua các giá trị còn lại của mảng để
                so sánh chúng với giá trị hiện tại của vòng lặp thứ nhất
        */
        for (let j = i + 1; j < arr.length; j++) {
            /*
                *** đổi index của giá trị hiện tại của vòng lặp thứ 1 với
                    index của giá trị của vòng lặp 2
            */
            if (arr[currentValueNewIndex] > arr[j]) {
                currentValueNewIndex = j;
            }
        }

        /*
            *** nếu ví trị của giá trị hiện tại của vòng lặp thứ 1
                được update thì ta sẽ tiến hành việc hoán đổi
        */
        if (i !== currentValueNewIndex) {
            let temp = arr[i];
            arr[i] = arr[currentValueNewIndex];
            arr[currentValueNewIndex] = temp;
        }
    }

    // *** trả về mảng đã được sắp xếp
    return arr;
}

const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(selectionSort(arr)); // *** => [3, 9, 10, 27, 38, 43, 82]