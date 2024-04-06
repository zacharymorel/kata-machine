// Binary tree comparison with Depth search.
export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    //  base cases

    // Structural check
    if (a === null && b === null) {
        // Guard return when there is no more children to check because A & B nodes are null.
        return true;
    }
    // Structural check
    if (a === null || b === null) {
        // Case where only 1 is false
        // All it takes is 1 falsy for comparison to fail
        return false;
    }
    // Value check
    if (a.value !== b.value) {
        // All it takes is 1 falsy for comparison to fail
        return false;
    }

    // IF A and b equal each other, we don't have to check, we continue to recurse.
    // WE CHECK FOR a === null && b === null which means the WHOLE tree down was matching

    // Recurse
    return compare(a.left, b.left) && compare(a.right, b.right);

    // NO POST actions
}
