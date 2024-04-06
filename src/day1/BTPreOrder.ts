// THIS IS A DEPTH FIRST TRAVERSAL

function walk(curr: BinaryNode<number> | null, path: number[]): void {
    // Base case
    if (!curr) return;

    // Recurse 1. pre 2. recurse 3. post

    // pre
    path.push(curr.value);

    // recurse (if we hit a node that doesn't exist, base case will return)
    walk(curr.left, path);
    walk(curr.right, path);

    // post
    return;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    walk(head, path);

    return path;
}
