/**
 * We have array ['a', 'b', 'c']
 * search(arr, v)
 * We walk linearly through arr until we find "v".
 *
 * Big O = O(n)
 */

export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
}
