class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
class List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    unshift(value) {
        return this.insert(0, value);
    }
    push(value) {
        if (this.head === null) {
            this.head = new Node(value, this.tail);
            this.length++;
        } else {
            this.insert(this.length, value);
        }
        return this.length;
    }
    insert(index, value) {
        var insertPos = this.head;
        //找到需要插入的位置的节点
        for (var i = 0; i < index - 1; i++) {
            insertPos = insertPos.next;
        }
        var node = null;
        if (index === 0) {
            node = new Node(value, this.head);
            this.head = node;
        } else {
            node = new Node(value, insertPos.next);
            insertPos.next = node;
        }
        this.length++;
        return value;
    }
}
var length = 9999;
var list = new List();
var arr = new Array(length);
arr[length] = undefined;
for (var i = 0; i < length; i++) {
    list.push(i);
}
var count = length;
console.time("list unshfit");
for (var i = 0; i < count; i++) {
    list.unshift(i);
}
console.timeEnd("list unshfit");

console.time("array unshfit");
for (var i = 0; i < count; i++) {
    arr.unshift(i);
}
console.timeEnd("array unshfit");

console.time("list insert middle with index");
for(var i = 0; i < count; i++){
    insertPos = list.insert(list.length >> 1, i);
}
console.timeEnd("list insert middle with index");

console.time("array insert middle");
for(var i = 0; i < count; i++){
    arr.splice(arr.length >> 1, 0, i);
}
console.timeEnd("array insert middle");