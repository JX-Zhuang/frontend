class MyPromise {
    constructor(executor) {
        this.status = 'pending';
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
        const resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'fulfilled';
                this.value = value;
                this.onFulfilledCallback.forEach(item => item(value));
            }
        };
        const reject = () => {

        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === 'fulfilled') {
            onFulfilled(this.value);
        }
        if (this.status === 'pending') {
            this.onFulfilledCallback.push(value => {
                onFulfilled(value);
            })
        }
    }
}

const a = {
    name: 'hahaha'
};
function foo(a, b, c) {
    console.log(this.name, a, b, c);
}
Function.prototype.call = function (context, ...args) {
    let result;
    if (context === null) {
        result = this(...args);
    } else {
        const key = Symbol();
        context[key] = this;
        const result = context[key](...args);
        delete context[key];
    }
    return result;
}
Function.prototype.apply = function (context, args) {
    let result;
    if (context === null) {
        result = this(...args);
    } else {
        const key = Symbol();
        context[key] = this;
        result = context[key](...args);
        delete context[key];
    }
    return result;
}
// foo.call(null, 1, 2, 3);
// foo.call(a, 1, 2, 3);
// foo.apply(null, [1, 2, 3]);
// foo.apply(a, [1, 2, 3]);

// {
//     let arr1 = [1, 2, 3];
//     let arr2 = [4, 5, 6];
//     Array.prototype.push.apply(arr1, arr2);
//     console.log(arr1);
//     console.log(Math.max.apply(null, arr1));
// }
// {
//     let arr1 = [1, 2, 3];
//     let arr2 = [4, 5, 6];
//     Array.prototype.push.call(arr1, ...arr2);
//     console.log(arr1);
//     console.log(Math.max.call(null, ...arr1));
// }

Function.prototype.myBind = function (context, ...args) {
    const self = this;
    function F() {
        return self.apply(this instanceof F ? this : context, args.concat(...arguments));
    }
    function noop() { }
    noop.prototype = this.prototype;
    F.prototype = new noop();
    return F;
}

Function.prototype.myBindO = function (context, ...argus) {
    const self = this;
    function F() {
        return self.apply(this instanceof F ? this : context, argus.concat(...arguments));
    }
    function noop() { }
    noop.prototype = this.prototype;
    F.prototype = new noop();
    return F;
}

const obj = {
    x: 42,
    getX: function (a, b, c) {
        console.log(a, b, c)
        return this.x;
    },
};

const unboundGetX = obj.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.myBind(obj, 1, 2);
console.log(boundGetX(3));
// Expected output: 42


function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...arguments);
        }, delay);
    }
}
function throttle(fn, delay) {
    let start = 0;
    return function () {
        const currentTime = Date.now();
        if (currentTime - start < delay) return;
        const result = fn(...arguments);
        start = currentTime;
        return result;
    }
}
function test1(a) {
    console.log('test1', a);
}
function test2(a) {
    console.log('test2', a);
}
const debounce1 = debounce(test1, 1000);
// debounce1(0);
// debounce1(1);
// debounce1(2);
// debounce1(3);
// setTimeout(() => {
//     debounce1(4);
// }, 2000);
const throttle1 = throttle(test2, 1000);
throttle1(0);
throttle1(1);
throttle1(2);
throttle1(3);
setTimeout(() => {
    throttle1(4);
}, 2000);