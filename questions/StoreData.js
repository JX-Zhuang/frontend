class StoreData {
    constructor() {
        this.map = new Map();
        this.events = new Map();
    }
    add(key, value) {
        if (this.has(key)) {
            if (this.events.has(key)) {
                this.events.get(key).forEach((callback) => {
                    callback(this.map.get(key), value, key);
                });
            }
        }
        this.map.set(key, value);
    }
    on(action, callback) {
        if (typeof callback !== 'function') return;
        const arr = action.split(':');
        const key = arr[1];
        if (key === undefined) return;
        if (!this.events.has(key)) {
            this.events.set(key, []);
        }
        this.events.get(key).push(callback);
    }
    has(key) {
        return this.map.has(key);
    }
}
let store = new StoreData();
store.add('name', 'joe');
store.add('age', 30);
console.log(store.has('age'));    // return true
console.log(store.has('animal')); // return false
store.add('name', 'emma');
store.on('change:name', (old_val, new_val, key) => { console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`) });
store.add('name', 'john');
store.on('age', (old_val, new_val, key) => { console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`) });
store.add('age', 26);
store.on('change:age', (old_val, new_val, key) => { console.log(`${old_val > new_val ? 'older now' : ''}`) });
store.add('age', 28);
store.add('age', 45);
