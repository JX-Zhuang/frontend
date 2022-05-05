/**
 * 函数柯里化
 */
function curry(fn) {
    const outArgus = Array.prototype.slice.call(arguments, 1);
    return function () {
        const innerArgus = Array.prototype.slice.call(arguments);
        const argus = outArgus.concat(innerArgus);
        return fn.apply(null, argus);
    }
}
function add(num) {
    return this.num + num;
}
Function.prototype.bind = function (context) {
    const that = this;
    const outArgus = Array.prototype.slice.call(arguments, 1);
    return function () {
        const innerArgus = Array.prototype.slice.call(arguments);
        const argus = outArgus.concat(innerArgus);
        return that.apply(context, argus);
    }
}
const curriedAdd = add.bind({
    num: 22
}, 1);
console.log(curriedAdd());