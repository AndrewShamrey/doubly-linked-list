const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = new Node();
        this._tail = new Node();
        this.length = 0;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    isEmpty() {
        return this.length === 0 ? true : false;
    }

    clear() {
        this._head = new Node();
        this._tail = new Node();
        this.length = 0;
        return this;
    }

    reverse() {
        let currentItem = this._head;
        while (currentItem) {
            [currentItem.prev, currentItem.next] = [currentItem.next, currentItem.prev];
            currentItem = currentItem.prev;
        }
        [this._head, this._tail] = [this._tail, this._head];
        return this;
    }

    toArray(type = 'data') {
        let currentItem = this._head, result = [];
        while (currentItem) {
            result.push(type === 'nodes' ? currentItem : currentItem.data);
            currentItem = currentItem.next;
        }
        return result;
    }

    at(index) {
        return this._loop(index, 'data');
    }

    indexOf(data) {
        let currentItem = this._head, i = 0;
        while (currentItem) {
            if (this._loop(i, 'data') === data) return i;
            currentItem = currentItem.next;
            i++;
        }
        return -1;
    }

    prepend(data) {
        const currentItem = new Node(data, null, this._head);
        if (this.length === 0) {
            currentItem.next = null;
            this._tail = currentItem;
        } else this._head.prev = currentItem;
        this._head = currentItem;
        this.length += 1;
        return this;
    }

    append(data) {
        const currentItem = new Node(data, this._tail);
        if (this.length === 0) {
            currentItem.prev = null;
            this._head = currentItem;
        } else this._tail.next = currentItem;
        this._tail = currentItem;
        this.length += 1;
        return this;
    }

    fromArray(...values) {
        values.forEach(value => this.append(value));
        return this;
    }

    insertAt(index, data) {
        const itemByIndex = this._loop(index, 'item');
        const currentItem = new Node(data, itemByIndex.prev, itemByIndex);
        if (index === this.length) return this.append(data);
        if (index === 0) return this.prepend(data);
        itemByIndex.prev.next = currentItem;
        itemByIndex.prev = currentItem;
        this.length += 1;
        return this;
    }

    deleteHead() {
        this._head.next.prev = this._head.prev;
        this._head = this._head.next;
        this.length -= 1;
        return this;
    }

    deleteTail() {
        this._tail.prev.next = this._tail.next;
        this._tail = this._tail.prev;
        this.length -= 1;
        return this;
    }

    deleteAt(index) {
        if (this.length < 2) return this.clear();
        if (index === 0) return this.deleteHead();
        if (index === this.length - 1) return this.deleteTail();
        const deletedItem = this._loop(index, 'item');
        deletedItem.next.prev = deletedItem.prev;
        deletedItem.prev.next = deletedItem.next;
        this.length -= 1;
        return this;
    }

    delete(data) {
        let currentItem = this._tail, i = this.length - 1, forDelete = [];
        while (currentItem) {
            if (currentItem.data === data) forDelete.push(i);
            currentItem = currentItem.prev;
            i--;
        }
        forDelete.forEach(item => this.deleteAt(item));
        return this;
    }

    _loop(index, type) {
        let currentItem = this._head, i = 0;
        while (currentItem) {
            if (i === index) return type === 'item' ? currentItem : currentItem.data;
            currentItem = currentItem.next;
            i++;
        }
        return 'Error';
    }
}

module.exports = LinkedList;
