const throttle = require('./throttle');
// const { throttle } = require('lodash');
const start = Date.now();
function logger(n) {
    console.log(n, (Math.floor((Date.now() - start) / 1000)) + 's');
}
let throttled = throttle(logger, 3000, { leading: false, trailing: true });
setTimeout(() => {
    throttled(1);
}, 1000);
setTimeout(() => {
    throttled(2);
}, 2000);
setTimeout(() => {
    throttled(3);
}, 3000);
setTimeout(() => {
    throttled(4);
}, 4000);
setTimeout(() => {
    throttled(5);
}, 5000);
setTimeout(() => {
    throttled(6);
}, 6000);