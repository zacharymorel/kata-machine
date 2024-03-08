export default class ArrayList<T> implements List<T> {
    public length: number;
    private _list: T[];
    private _capacity: number;

    constructor(size?: number | undefined) {
        this._list = [];
        this.length = 0;
        this._capacity = size ?? 0;
    }

    prepend(item: T): void {
        if (this._capacity === this.length) this._capacity += 10;
        this.length += 1;

        if (this.length === 0) {
            this._list = [item];
        } else {
            const oldArr = this._list;
            const newArr = [item];
            for (let i = 0; i < oldArr.length; i++) {
                newArr[i + 1] = oldArr[i];
            }

            this._list = newArr;
        }

        return;
    }

    insertAt(item: T, idx: number): void {
        if (!item || idx === undefined || idx === null) return;
        if (this._capacity === this.length) this._capacity += 10;

        if (this.length === 0) {
            this.length += 1;
            this._list = [item];
        } else {
            const oldArr = this._list;
            const newArr = [];
            for (let i = 0; i < oldArr.length; i++) {
                if (i < idx) newArr[i] = oldArr[i];
                else if (i === idx) newArr[i] = item;
                else newArr[i + 1] = oldArr[i];
            }
            this._list = newArr;
        }
        return;
    }

    append(item: T): void {
        if (this._capacity === this.length) this._capacity += 10;

        if (this.length === 0) {
            this._list = [item];
            this.length += 1;
        } else {
            const oldArr = this._list;
            const newArr = [];
            for (let i = 0; i < oldArr.length; i++) {
                newArr[i] = oldArr[i];

                // Final append item
                if (i === oldArr.length - 1) newArr[i + 1] = item;
            }

            this._list = newArr;
            this.length += 1;
        }

        return;
    }

    remove(item: T): T | undefined {
        if (!item) return undefined;
        if (Math.floor(this._capacity / this.length) > 2) {
            this._capacity -= this.length * 2; // shrink Array list memory
        }
        let returner = undefined;
        let match = false;
        const newArr: T[] = [];
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i] === item) {
                returner = this._list[i];
                match = true;
                continue;
            } else {
                if (match) newArr[i - 1] = this._list[i];
                else {
                    newArr[i] = this._list[i];
                }
            }
        }
        this._list = newArr;
        this.length = Math.max(0, (this.length -= 1));
        return returner;
    }

    get(idx: number): T | undefined {
        if (idx === undefined || idx === null) return undefined;
        if (this.length === 0) return undefined;
        if (typeof idx === "number") {
            return this._list[idx];
        }

        return undefined;
    }

    removeAt(idx: number): T | undefined {
        if (idx === undefined || idx === null) return undefined;
        if (typeof idx !== "number") return undefined;
        if (!this._list[idx]) return undefined;
        if (Math.floor(this._capacity / this.length) > 2) {
            this._capacity -= this.length * 2; // shrink Array list memory
        }

        let returner = undefined;
        const newArr = [];
        for (let i = 0; i < this._list.length; i++) {
            if (i < idx) newArr[i] = this._list[i];
            else if (i === idx) {
                console.log("HERE ", i, idx);
                returner = this._list[i];
                continue;
            } else newArr[i - 1] = this._list[i];
        }

        this.length = Math.max(0, (this.length -= 1));
        this._list = newArr;
        return returner;
    }

    print(): void {
        console.log("ArrayList list: ", this._list);
        console.log("ArrayList capacity: ", this._capacity);
    }
}
