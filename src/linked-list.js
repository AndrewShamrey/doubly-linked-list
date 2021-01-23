const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = new Node();
        this._tail = new Node();
        this._items = [];
        this.length = 0;
    }

    append(data) {
        const currentItem = new Node(data, this._tail);
        if (this.length === 0) this._head = currentItem;
        else this._tail.next = currentItem;
        this._tail = currentItem;
        this.length += 1;
        this._items.push(currentItem);
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this._items[index].data;
    }

    insertAt(index, data) {
        let currentItem;
        if (index === this.length) {
            this.append(data);
            return this;
        } else if (index === 0) {
            currentItem = new Node(data, null, this._items[index]);
            this._head = currentItem;
            this._items[index].prev = currentItem;
        } else if (index === this.length - 1) {
            currentItem = new Node(data, this._items[index]);
            this._tail = currentItem;
            this._items[index].next = currentItem;
        } else {
            currentItem = new Node(data, this._items[index].prev, this._items[index]);
            this._items[index].prev = currentItem;
            this._items[index - 1].next = currentItem;
        }
        this.length += 1;
        this._items.splice(index, 0, currentItem);
        return this;
    }

    isEmpty() {
        return this.length === 0 ? true : false;
    }

    clear() {
        this._head = new Node();
        this._tail = new Node();
        this._items = [];
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (this.length < 2) {
            this.clear();
            return this;
        } else if (index === 0) {
            this._head = this._items[index + 1];
            this._items[index + 1].prev = new Node();
        } else if (index === this.length - 1) {
            this._tail = this._items[index - 1];
            this._items[index - 1].next = new Node();
        } else {
            this._items[index - 1].next = this._items[index + 1];
            this._items[index + 1].prev = this._items[index - 1];
        }
        this.length -= 1;
        this._items.splice(index, 1);
        return this;
    }

    reverse() {
        [this._head, this._tail] = [this._tail, this._head];
        this._items.reverse();
        return this;
    }

    indexOf(data) {
        return this._items.indexOf(this._items.find((item) => item.data === data));
    }
}

module.exports = LinkedList;
