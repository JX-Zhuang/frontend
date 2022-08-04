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
const p6 = Promise.resolve('p6');
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
            }
        }
    });
}
Promise.all([p1, p2, p3, p4, p5, p6]).then(res => {
    console.log(res);
}, res => {
    console.log(res);
});
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
}
Promise.race([p1, p2, p3]).then(res => {
    console.log(res);
}, res => {
    console.log(res);
});