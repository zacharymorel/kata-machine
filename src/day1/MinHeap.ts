// min heap also like a queue?
export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        // Insert at end.
        this.data[this.length] = value;
        // Bubble up the value we just inserted to make sure it is the correct spot in the heap.
        this.heapifyUp(this.length);
        // Since we've add a new item to the heap, increase length by 1
        this.length++;
    }

    delete(): number {
        // base case
        if (this.length === 0) return -1;

        const out = this.data[0];
        if (this.length === 1) {
            this.data = [];
            this.length--;
            return out;
        }

        this.length--;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        // Base case
        if (idx >= this.length) return;

        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        // Base case
        if (lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        // Right value is the smallest out of the right and left AND we are greater than the right value. We will need to swap and heapifyDown.
        if (lV > rV && v > rV) {
            this.data[idx] = rV;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            this.data[idx] = lV;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        // Base case
        if (idx === 0) return;

        const p = this.parent(idx);
        const parenV = this.data[p];
        const v = this.data[idx];

        // Min Heaps maintain a WEAK ordering. I.e.,
        // Notice Parent is less than child
        //
        //                              50
        //                        71            100
        //                     101  80        200  101
        //

        if (parenV > v) {
            // We have to swap ourselves and our parent
            this.data[idx] = parenV;
            this.data[p] = v;
            // Recursive - go up as far as we can until we are less than parent
            this.heapifyUp(p);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
