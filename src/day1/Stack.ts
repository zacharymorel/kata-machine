interface Node<T> {
    value: T;
    prev?: Node<T>;
}

// *     A <- B <- C <- D
// *    Tail           Head
export default class Stack<T> {
    public length: number;
    private _head: Node<T> | undefined;
    // private _tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this._head = undefined;
    }

    // Add item to end - new head.
    push(item: T): void {
        const node = { value: item } as Node<T>;
        this.length = this.length + 1;

        if (!this._head) {
            this._head = node;
            return;
        }

        node.prev = this._head;
        this._head = node;
        return;
    }

    // Remove head - last node - and return value
    pop(): T | undefined {
        if (this.length === 1) {
            this.length = this.length - 1;
            // old head
            const head = this._head;
            // reset head
            this._head = undefined;
            return head?.value;
        }

        if (this.length > 1) {
            this.length = this.length - 1;

            // old head
            const head = this._head;

            // move head back
            this._head = head?.prev;

            // Clean up memory allocation
            if (head) head.prev = undefined;

            return head?.value;
        }

        return;
    }

    // Read value of end node - just look at it
    peek(): T | undefined {
        return this._head?.value;
    }
}
