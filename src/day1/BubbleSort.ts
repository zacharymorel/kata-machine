export default function bubble_sort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const left = arr[j];
                const right = arr[j + 1];
                arr[j] = right;
                arr[j + 1] = left;
            }
        }
    }
}
