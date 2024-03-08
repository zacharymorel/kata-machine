interface Node<T> {
    value: T;
    next?: Node<T>;
}

// *     A -> B -> C -> D
// *    Head           Tail
export default class Queue<T> {
    public length: number;
    private _head: Node<T> | undefined;
    private _tail: Node<T> | undefined;

    constructor() {
        this._head = undefined;
        this._tail = undefined;
        this.length = 0;
    }

    // ADD to queue
    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length = this.length + 1;
        if (!this._tail) {
            this._head = node;
            this._tail = this._head;
            return;
        }

        // Point our old tail's next to new tail
        this._tail.next = node;
        // Assign new tail
        this._tail = node;
        return;
    }

    // Remove form Queue
    deque(): T | undefined {
        if (!this._head) return undefined;
        this.length = this.length - 1;

        // Save your new head
        const oldHead = this._head;
        this._head = this._head?.next;

        // free old head node from LinkedList
        oldHead.next = undefined;

        // Reset Tail
        if (this.length === 0) this._tail = undefined;

        // return old head value
        return oldHead.value;
    }

    // See value at head of queue
    peek(): T | undefined {
        return this._head?.value;
    }
}
