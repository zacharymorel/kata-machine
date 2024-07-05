type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>; // FOR Trimming our cache and giving our data structure O(1) lookups.
    private reverseLookup: Map<Node<V>, K>; // We need the ability to go from a node back to the key, delete it out, then delete out the key that is in the look up.

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // Does it exist? get()
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            // If it doesn't, we need to insert.
            //   - Check capacity and evict if over max capacity.
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // If it does, we need to update to the front of the list and update the value
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }

    get(key: K): V | undefined {
        // Check the cache for existence.
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        // Update the value we found and move it to the front.
        this.detach(node); // Detaches node from linkedList. But it is still in our lookup and in our reverse lookup.
        this.prepend(node); // Add it to the front of our cache (linked list)

        // Return out the value found or undefined if doesn't exist.
        return node.value;
    }

    private detach(node: Node<V>): void {
        // Removing current node from linked list and changing the links.
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        // break from linked list
        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);

        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);

        this.length--;
    }
}
