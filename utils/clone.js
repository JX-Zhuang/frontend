let obj = {
    married: true,
    age: 10,
    name: 'zhufeng',
    girlfriend: null,
    boyfriend: undefined,
    flag: Symbol('man'),
    home: { name: '北京' },
    set: new Set(),
    map: new Map(),
    getName: function () { },
    hobbies: ['抽烟', '喝酒', '烫头'],
    error: new Error('error'),
    pattern: /^regexp$/ig,
    date: new Date()
    // math: Math,
    // json: JSON,
    // document: document,
    // window: window
};
obj.set.add(1);
obj.map.set('name', 'value');
obj.obj = obj;


const getType = (o) => Object.prototype.toString.call(o);
const arrayTag = '[object Array]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const symbolTag = '[object Symbol]'
const objectTags = [arrayTag, objectTag, regexpTag, symbolTag, setTag, mapTag, errorTag, dateTag];
const instanceTags = [regexpTag, errorTag, dateTag];
function clone(source, map = new Map()) {
    let target;
    const sourceType = getType(source);
    if (!objectTags.includes(sourceType)) return source;
    if (map.get(source)) return map.get(source);
    const constructor = source.constructor;
    if (instanceTags.includes(sourceType)) return new constructor(source);
    if (sourceType === symbolTag) {
        return Object(Symbol.prototype.valueOf.call(source));
    }
    target = new constructor();
    map.set(source, target);
    if (sourceType === mapTag) {
        source.forEach((value, key) => target.set(key, clone(value, map)));
        return target;
    }
    if (sourceType === setTag) {
        source.forEach((value) => target.add(clone(value, map)));
        return target;
    }
    for (const key in source) {
        target[key] = clone(source[key], map);
    }
    return target;
}
const obj2 = clone(obj);

console.log('obj', obj);
console.log('obj2', obj2);