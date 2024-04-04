type Node<T> = {
    value: T;
    prev?: Node<T> | null;
    next?: Node<T> | null;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T> | null;
    private tail?: Node<T> | null;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    prepend(item: T): void {
        const node = {
            value: item,
        } as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Idx doesn't exist.");
        } else if (idx === this.length) {
            // This is just an append.
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;
        const curr = this.getAt(idx) as Node<T>;
        const node = { value: item } as Node<T>;

        node.next = curr; // We're are attaching new node between previous links
        node.prev = curr.prev;
        curr.prev = node;

        if (node.prev) {
            // node.prev is the old current
            // Old curr previous's next needs to point new node?
            node.prev.next = node;
        }
    }

    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;

        if (!this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;

        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }
        if (!curr) return item;
        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) return undefined;

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = null;
            this.tail = null;
            return out;
        }

        // if (node.prev) node.prev.next = node.next;
        if (node.prev) node.prev = node.next;
        // if (node.next) node.next.prev = node.prev;
        if (node.next) node.next = node.prev;

        if (node === this.head) {
            // Move up head
            this.head = node.next;
        }
        if (node === this.tail) {
            // Move back tail
            this.tail = node.prev;
        }

        // Broken nodeent from linkedlist
        node.prev = null;
        node.next = null;

        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined | null {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            curr = curr.next;
        }
        return curr;
    }
}
