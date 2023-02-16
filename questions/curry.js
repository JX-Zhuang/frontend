/**
 * @callback func
 * @return {Function}
 */
function addTwo(a, b) {
    return a + b;
}

const curriedAddTwo = curry(addTwo);
console.log(1, curriedAddTwo(3)(4)); // 7

const alreadyAddedThree = curriedAddTwo(3);
console.log(2, alreadyAddedThree(4)); // 7

function multiplyThree(a, b, c) {
    return a * b * c;
}

const curriedMultiplyThree = curry(multiplyThree);
console.log(3, curriedMultiplyThree(4)(5)(6)); // 120

const containsFour = curriedMultiplyThree(4);
const containsFourMulFive = containsFour(5);
console.log(4, containsFourMulFive(6)); // 120

function curry(func) {
    const length = func.length;
    return function curried(...argus1) {
        if (arguments.length >= length) {
            return func.apply(this, argus1);
        }
        return function (...argus2) {
            return curried.apply(this, [...argus1, ...argus2]);
        };
    }
}