/**
 * TWO functions we need:
 * Partition produces the Pivot Index and moves items to hi and low sides,
 * QS: which does the quick sorting which calls partition and gets the pivot. Which then calls quick sort which does the recursive step and does the base case step. Qs does the recursion.
 */

function qs(arr: number[], lo: number, hi: number): void {
    // BASE CASE
    if (lo >= hi) {
        return;
    }
    const pivotIndex = partition(arr, lo, hi);
    // console.log("pivotIndex: ", pivotIndex);

    // pivot - 1 or pivot + 1 is always where we sort.
    // Sort everything on the left of the pivot
    qs(arr, lo, pivotIndex - 1);
    // Sort everything on the right of the pivot
    qs(arr, pivotIndex + 1, hi);
}

// Returns the pivot index
function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1; // we go - 1 back from the lo because we need to be able to put stuff in the lo position.

    for (let i = lo; i < hi; i++) {
        // Moves everything over that is less than our pivot
        if (arr[i] <= pivot) {
            idx++;
            const temp = arr[i];
            // console.log("temp: ", temp, " | pivot:: ", pivot);
            arr[i] = arr[idx];
            arr[idx] = temp;
            // console.log("arr[i]: ", arr[i], " | arr[idx]: ", arr[idx]);
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    // Return the pivot index
    return idx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
