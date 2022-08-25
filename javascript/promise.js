/**
 * Promise 状态
 * pending：初始状态
 * fulfilled：成功
 * rejected：失败
 * 
 * Promise.reject:返回一个状态为已拒绝的Promise对象
 * Promise.resolve:返回一个状态由给定value决定的Promise对象
 * 
 * Promise.prototype.finally:原promise被敲定时调用
 */

/**
 * Promise.all:等到所有的promise对象都成功或有任意一个promise失败
 */
Promise.all = (promises) => {
    return new Promise((resolve, reject) => {
        const n = promises.length, ans = new Array(n);
        let count = 0;
        for (let i = 0; i < n; i++) {
            const promise = promises[i];
            if (promise instanceof Promise) {
                promise.then((res) => {
                    ans[i] = res;
                    count++;
                    if (count === n) {
                        resolve(ans);
                    }
                }).catch(res => {
                    reject(res)
                });
            } else {
                ans[i] = promise;
                count++;
                if (count === n) {
                    resolve(ans);
                }
            }
        }
    });
};
/**
 * Promise.allSettled:等到所有promise成功或失败，返回一个对象数组，每个对象对应每个promise的结果
 */
Promise.allSettled = (promises) => {
    return new Promise((resolve, reject) => {
        const n = promises.length, ans = new Array(n);
        let count = 0;
        for (let i = 0; i < n; i++) {
            const promise = promises[i];
            if (promise instanceof Promise) {
                promise.then(res => {
                    count++;
                    ans[i] = {
                        status: 'fulfilled',
                        value: res
                    }
                }).catch(res => {
                    count++;
                    ans[i] = {
                        status: 'rejected',
                        value: res
                    }
                }).finally(() => {
                    if (count === n) {
                        resolve(ans);
                    }
                });
            } else {
                ans[i] = {
                    status: 'fulfilled',
                    value: promise
                };
                count++;
                if (count === n) {
                    resolve(ans);
                }
            }
        }
    });
};
/**
 * Promise.any:任意一个promise成功，就返回
 */
Promise.any = (promises) => {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            if (promise instanceof Promise) {
                promise.then((res) => {
                    resolve(res);
                });
            } else {
                resolve(promise);
            }
        }
    });
};
/**
 * Promise.race:任意一个promise已完成，返回
 */
Promise.race = (promises) => {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            if (promise instanceof Promise) {
                promise.then((res) => {
                    resolve(res);
                }).catch(res => reject(res));
            } else {
                resolve(promise);
            }
        }
    });
};
/**
 * 
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
const p1 = sleep(3, 'p1');
const p2 = sleep(1, 'p2');
const p3 = sleep(1, 'p3');
const p4 = 123;
const p5 = Promise.resolve('p5');
const p6 = Promise.reject('p6');
Promise.any([p1, p2, p3, p4, p5, p6]).then(res => {
    console.log(res);
}, res => {
    // console.log(res);
});