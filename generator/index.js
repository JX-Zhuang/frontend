function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
}
function t1() {
    var gen = g();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
}
function myGenerator(list) {
    const n = list.length;
    let i = 0;
    return {
        next() {
            const done = i >= n;
            const value = done ? undefined : list[i++];
            return {
                value,
                done
            };
        }
    }
}

function t2() {
    var myGen = myGenerator(['a', 'b', 'c']);
    console.log(myGen.next());
    console.log(myGen.next());
    console.log(myGen.next());
    console.log(myGen.next());
    console.log(myGen.next());
}
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))
async function asyncAwait() {
    const data = await getData()
    console.log('data: ', data);
    const data2 = await getData()
    console.log('data2: ', data2);
    return 'success'
}

function t3() {
    asyncAwait().then(res => console.log(res));
}
// t3();
function* testG() {
    const data = yield getData();
    console.log('data: ', data);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}

function asyncToGenerator(generatorFunc) {
    return function () {
        const gen = generatorFunc();
        return new Promise((resolve, reject) => {
            function step(key, ...args) {
                let generatorResult;
                try {
                    generatorResult = gen[key](...args);
                } catch (error) {
                    return reject(error)
                }
                const { value, done } = generatorResult;
                if (done) {
                    return resolve(value);
                } else {
                    return Promise.resolve(value).then(value => step("next", value), error => step("throw", error));
                }
            }
            return step("next");
        });
    }
}
function t4() {
    var gen = testG();
    var dataPromise = gen.next().value;
    dataPromise.then((value1) => {
        var dataPromise1 = gen.next(value1).value;
        dataPromise1.then(value2 => {
            gen.next(value2);
            gen.next();
        });
    });
}
// t4();
function t5() {
    const t = asyncToGenerator(testG);
    t().then(res => console.log(res));
}
t5();