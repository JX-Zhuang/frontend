/**
 * 1.css
 *  flex:flex-grow,flex-shrink,flex-basis
 *  默认：0 1 auto;
 *  flex:1;   =>1 1 0%;
 *  flex:auto;=>1 1 auto;
 *  flex:none;=>0 0 auto;
 * 2.js
 *  call、apply、bind
 *  debounce、throttle
 *  instanceof、Object.create
 *  new、curry
 * 3.promise
 *  Promise.any,Promise.all,Promise.race,Promise.allSettled
 * 4.react
 *  17vs18
 *  useState
 */
const sleep = (time, value, flag) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (flag) {
            reject(value);
        } else {
            resolve(value);
        }
    }, time * 1000);
});

Promise.any = (promises) => {
    return new Promise((resolve, reject) => {
        const errors = [];
        for (const p of promises) {
            if (p instanceof Promise) {
                p.then(resolve).catch(err => {
                    errors.push(err);
                    if (errors.length === promises.length) {
                        reject(new AggregateError(errors));
                    }
                });
            } else {
                resolve(p);
            }
        }
    });
};
Promise.all = (promises) => {
    return new Promise((resolve, reject) => {
        const length = promises.length, arr = new Array(length);
        let count = 0;
        for (let i = 0; i < length; i++) {
            const promise = promises[i];
            if (promise instanceof Promise) {
                promise.then(value => {
                    arr[i] = value;
                    count++;
                    if (count === length) {
                        resolve(arr);
                    }
                }).catch(err => {
                    reject(err);
                })
            } else {
                count++;
                arr[i] = promise;
                if (count === length) {
                    resolve(arr);
                }
            }
        }
    });
};
Promise.race = (promises) => {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            if (promise instanceof Promise) {
                promise.then(resolve).catch(reject);
            } else {
                resolve(promise);
            }
        }
    });
};
Promise.allSettled = promises => {
    return new Promise((resolve, reject) => {
        const length = promises.length, arr = new Array(length);
        let count = 0;
        for (let i = 0; i < length; i++) {
            const promise = promises[i];
            if (promise instanceof Promise) {
                promise.then(value => {
                    arr[i] = { status: 'fulfilled', value };
                }).catch(reason => {
                    arr[i] = { status: 'rejected', reason };
                }).finally(() => {
                    count++;
                    if (count === length) {
                        resolve(arr);
                    }
                })
            } else {
                arr[i] = { status: 'fulfilled', value: promise };
                count++;
                if (count === length) {
                    resolve(arr);
                }
            }
        }
    })
}
function testAny() {
    const p1 = sleep(3, 'p1');
    const p2 = sleep(1, 'p2');
    const p3 = sleep(1, 'p3');
    const p4 = 123;
    const p5 = Promise.resolve('p5');
    const p6 = Promise.reject('p6');
    Promise.any([p1, p2, p3, p4, p5, p6]).then(res => {
        console.log(res);
    }, res => {
        console.log(res);
    });

    const pErr = new Promise((resolve, reject) => {
        reject("总是失败");
    });

    const pSlow = new Promise((resolve, reject) => {
        reject("slow");
    });

    const pFast = new Promise((resolve, reject) => {
        reject("pFast");
    });

    Promise.any([pErr, pSlow, pFast]).then((value) => {
        console.log(value);
        // pFast 第一个兑现
    });
}
function testAll() {
    const promise1 = Promise.resolve(3);
    const promise2 = 42;
    const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, 'foo');
    });

    Promise.all([promise1, promise2, promise3, Promise.reject(1)]).then((values) => {
        console.log(values);
    }).catch(e => {
        console.log(e)
    })
}
function testRace() {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, 'one');
    });

    const promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, 'two');
    });

    Promise.race([promise1, promise2, new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("请求超时")), 1);
    })]).then((value) => {
        console.log(value);
        // Both resolve, but promise2 is faster
    }).catch((err) => {
        console.log(err);
    });
}
function testAllSettled() {
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) => setTimeout(reject, 1000, 'foo'));
    const promises = [promise1, promise2, 123];
    Promise.allSettled(promises).then((results) => console.log(results));
}
function myInstanceof(obj, constructor) {
    const prototype = constructor.prototype;
    while (obj) {
        if (obj.__proto__ === prototype) return true;
        obj = obj.__proto__;
    }
    return false;
}
function testInstanceof() {
    console.log([] instanceof Object, myInstanceof([], Object));
    console.log([] instanceof Array, myInstanceof([], Array));
    console.log([] instanceof String, myInstanceof([], String));
    console.log(null instanceof Object, myInstanceof(null, Object));
    console.log(undefined instanceof Object, myInstanceof(undefined, Object));
}
Object.create = function (obj) {
    function F() { }
    F.prototype = obj;
    return new F();
};
function testCreate() {
    const person = {
        isHuman: false,
        printIntroduction: function () {
            console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
        },
    };
    const me = Object.create(person);
    me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
    me.isHuman = true; // Inherited properties can be overwritten
    me.printIntroduction();
    person.printIntroduction();
}
function myNew(constructor, ...argus) {
    function F() { };
    F.prototype = constructor.prototype;
    const instance = new F();
    const result = constructor.apply(instance, argus);
    return typeof result === 'object' ? result : instance;
}
function testNew() {
    function Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    Car.prototype.getName = function () {
        console.log(this.model, this.model, this.year);
    }
    const car1 = myNew(Car, 'Eagle', 'Talon TSi', 1993);
    // const car1 = new Car('Eagle', 'Talon TSi', 1993);
    console.log(car1.constructor, car1.make);
    car1.getName();
}
function curry(func) {
    const length = func.length;
    return function curried(...argus1) {
        if (argus1.length >= length) {
            return func.apply(this, argus1);
        }
        return function (...argus2) {
            return curried.apply(this, argus1.concat(argus2));
        }
    }
}
function testCurry() {
    function sum(a, b, c) {
        return a + b + c;
    }
    let curriedSum = curry(sum);
    console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
    console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
    console.log(curriedSum(1)(2)(3)); // 6，全柯里化
}