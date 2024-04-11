function search(curr: BinaryNode<number> | null, needle: number): boolean {
    // BASE CASE
    if (!curr) return false;

    if (curr.value === needle) return true;

    // RECURSE // Binary search so we only have to search one side each time.
    if (curr.value < needle) return search(curr.right, needle);
    else return search(curr.left, needle);

    // POST
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
