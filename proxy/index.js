const source = {
    a: 1,
    b: {
        c: 1
    },
    c: {
        a: 12
    }
};
const target = new Proxy(source, {
    set: function (obj, key, value) {

    },
    get: function (obj, key) {

    }
});
target.c.a = 123;
function immer(source, callback) {
    
}
console.log(target.b === source.b)