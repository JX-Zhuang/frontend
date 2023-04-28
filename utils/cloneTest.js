const date = new Date(), s = Symbol('man');
let obj = {
    married: true,
    age: 10,
    name: 'zhufeng',
    girlfriend: null,
    boyfriend: undefined,
    flag1: s,
    flag2: s,
    home: { name: '北京' },
    set: new Set(),
    map: new Map(),
    getName: function () { },
    hobbies: ['抽烟', '喝酒', '烫头'],
    error: new Error('error'),
    pattern: /^regexp$/ig,
    date1: date,
    date2: date
    // math: Math,
    // json: JSON,
    // document: document,
    // window: window
};
obj.set.add(1);
obj.map.set('name', 'value');
obj.obj = obj;
const notObjectType = (source) => {
    const type = typeof source;
    return type !== 'symbol' && (type !== 'object' || source === null);
};
const regexType = '[object Regex]';
const errorType = '[object Error]';
const dateType = '[object Date]';
const mapType = '[object Map]';
const setType = '[object Set]';
const symbolType = '[object Symbol]';
const getType = (source) => Object.prototype.toString.call(source);
const instancesTag = (type) => [regexType, errorType, dateType].includes(type);
function deepClone(source, m = new Map()) {
    if (notObjectType(source)) return source;
    if (m.get(source)) return m.get(source);
    const type = getType(source);
    const constructor = source.constructor;
    let target;
    if (type === symbolType) {
        target = Symbol.for(source.description);
        m.set(source, target);
        return target;
    }
    if (instancesTag(type)) {
        target = new constructor(source);
        m.set(source, target);
        return target;
    }
    target = new constructor();
    m.set(source, target);
    if (type === mapType) {
        source.forEach((value, key) => target.set(key, deepClone(value, m)));
        return target;
    }
    if (type === setType) {
        source.forEach((value) => target.add(deepClone(value, m)));
        return target;
    }
    for (const key in source) {
        target[key] = deepClone(source[key], m);
    }
    return target;
}
const obj2 = deepClone(obj);
console.log(obj.flag1 === obj2.flag1);

console.log('obj', obj.flag1 === obj.flag2);
console.log('obj2', obj2.flag1 === obj2.flag2);

console.log('obj', obj.date1 === obj.date2);
console.log('obj2', obj2.date1 === obj2.date2);