function curry(func) {
    const length = func.length;
    return function curried(...argus1) {
        if (arguments.length >= length) {
            return func.apply(null, argus1);
        }
        return function (...argus2) {
            return curried.apply(null, [...argus1, ...argus2]);
        }
    }
}