export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    while (lo < hi) {
        // middle
        const m = Math.floor(lo + (hi - lo) / 2);
        const v = haystack[m];

        // WE FOUND IT
        if (v === needle) return true;
        // We half the search for both conditions.
        else if (v > needle) hi = m; // Move the search to the left.
        else lo = m + 1; // Move the search to the right.
    }

    return false;
}
