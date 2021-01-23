const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = new Node();
        this._tail = new Node();
        this.length = 0;
    }

    append(data) {
        const currentItem = new Node(data, this._tail);
        if (this.length === 0) this._head = currentItem;
        else this._tail.next = currentItem;
        this._tail = currentItem;
        this.length += 1;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this._loop(index, 'data');
    }

    insertAt(index, data) {
        const currentItem = new Node(data, this._loop(index, 'item').prev, this._loop(index, 'item'));
        if (index === this.length) {
            this.append(data);
            return this;
        } else if (index === 0) this._head = currentItem;
        else this._loop(index - 1, 'item').next = currentItem;
        this._loop(index, 'item').prev = currentItem;
        this.length += 1;
        return this;
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

    deleteAt(index) {
        if (this.length < 2) {
            this.clear();
            return this;
        } else {
            if (index === 0) this._head = this._loop(index + 1, 'item');
            else this._loop(index - 1, 'item').next = this._loop(index, 'item').next;
            if (index === this.length - 1) this._tail = this._loop(index - 1, 'item');
            else this._loop(index + 1, 'item').prev = this._loop(index, 'item').prev;
        }
        this.length -= 1;
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

    indexOf(data) {
        let currentItem = this._head, i = 0;
        while (currentItem) {
            if (this._loop(i, 'data') === data) return i;
            currentItem = currentItem.next;
            i++;
        }
        return -1;
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
