interface Node<T> {
    value: T;
    prev?: Node<T>;
}

// *     A <- B <- C <- D
// *    Tail           Head
export default class Stack<T> {
    public length: number;
    private _head: Node<T> | undefined;
    private _tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    // Add item to end - new head.
    push(item: T): void {
        const nhead = { value: item } as Node<T>;
        this.length = this.length + 1;

        if (!this._head) {
            this._head = nhead;
            this._tail = this._head;
            return;
        }

        const oldHead = this._head;
        this._head = nhead;
        this._head.prev = oldHead;
        return;
    }

    // Remove head - last node - and return value
    pop(): T | undefined {
        if (this.length >= 1) {
            this.length = this.length - 1;
            // old head
            const oldHead = this._head;
            // new head
            this._head = oldHead?.prev;

            // clean up
            if (oldHead) oldHead.prev = undefined;

            return oldHead?.value;
        }

        return;
    }

    // Read value of end node - just look at it
    peek(): T | undefined {
        return this._head?.value;
    }
}
