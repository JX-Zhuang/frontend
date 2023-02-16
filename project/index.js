const { detailedDiff } = require('deep-object-diff');
const origin = {
    a: {
        name: 1,
        school: {
            a: 1,
            b: 2
        }
    },
    b: 1
};
const newObj = {
    a: {
        name: 1,
        school: {
            a: 1,
            b: 3
        }
    },
    b: 2
};
console.log(detailedDiff(origin, newObj));