// const { debounce } = require('lodash');
const debounce = require('./debounce');
const start = Date.now();
function logger(n) {
    console.log(this.name);
    console.log(n, (Math.floor((Date.now() - start) / 1000)) + 's');
    return n;
}
const debounced = debounce(logger, 2000, {
    leading: true
});
const obj = {
    name: 'obj',
    debounced
}
setTimeout(() => {
    obj.debounced(1);
}, 1000);
setTimeout(() => {
    obj.debounced(2);
}, 2000);
setTimeout(() => {
    obj.debounced(3);
}, 3000);
setTimeout(() => {
    obj.debounced(4);
}, 4000);
setTimeout(() => {
    let result = obj.debounced(5);
    obj.debounced.cancel();
    console.log('返回：', result);
}, 5000);