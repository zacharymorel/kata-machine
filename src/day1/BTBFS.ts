import Queue from "./Queue";

// Breath First Search Binary Tree
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<BinaryNode<number>>();
    q.enqueue(head); // ADD TREE AS HEAD

    while (q.length > 0) {
        const curr = q.deque();
        if (!curr) continue;

        // Search
        if (curr?.value === needle) {
            return true;
        }

        // else
        if (curr?.left) q.enqueue(curr.left);
        if (curr?.right) q.enqueue(curr.right);
    }

    // We didn't find the value
    return false;
}
