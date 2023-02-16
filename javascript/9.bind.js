Function.prototype.myBind = function (context, ...argus) {
    const self = this;
    function F() {
        return self.apply(this instanceof F ? this : context, argus.concat(...arguments));
    }
    function noop(){}
    noop.prototype = this.prototype;
    F.prototype = new noop();
    return F;
}

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

// var bindFoo = bar.bind(foo, 'daisy');
var bindFoo = bar.myBind(foo, 'daisy');
bindFoo.prototype.a = 123;
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
console.log(obj.a, bar.prototype.a);
console.log(obj.constructor,bindFoo.prototype);
