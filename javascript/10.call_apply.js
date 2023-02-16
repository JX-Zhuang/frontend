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

Function.prototype.call = function (context, ...args) {
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
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.apply(foo, [1, 2]);
bar.call(foo, 1, 2);
{
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    Array.prototype.push.apply(arr1, arr2);
    console.log(arr1);
    console.log(Math.max.apply(null, arr1));
}
{
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    Array.prototype.push.call(arr1, ...arr2);
    console.log(arr1);
    console.log(Math.max.call(null, ...arr1));
}