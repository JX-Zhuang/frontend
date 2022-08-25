//call
//apply
//bind
Function.prototype.call2 = function (context, ...argus) {
    const key = Symbol('context');
    context[key] = this;
    const result = context[key](...argus);
    delete context[key];
    return result;
}
Function.prototype.apply2 = function (context, argus) {
    const key = Symbol('context');
    context[key] = this;
    const result = context[key](...argus);
    delete context[key];
    return result;
}
Function.prototype.bind2 = function (context, ...outerArgus) {
    return (...argus) => this.call2(context, ...outerArgus, ...argus);
}
function _new(clazz, ...argus) {
    const obj = {};
    obj.__proto__ = clazz.prototype;
    clazz.call(obj, ...argus);
    return obj;
}
function Person(name, age) {
    this.age = age;
    this.name = name;
}
Person.prototype = {
    getName() {
        console.log(this.name);
    }
}
function getName(age, home) {
    console.log(this.name, age, home);
}
var b = new Person('bbb', 12);
b.getName();
var a = _new(Person, 'aaa', 12);
a.getName();
console.log(b.__proto__ === Person.prototype);
console.log(a.__proto__ === b.__proto__);
var obj = {
    name: 'obj'
};
getName.call2(obj, 12, '山东');
getName.apply2(obj, [12, '山东']);
const boundGetName = getName.bind2(obj, 12);
boundGetName('山东');
function f1() { console.log('f1') };
function f2() { console.log('f2') };
f1.call.call(f2);
Function.prototype.myCall = function (context, ...argus) {
    context.__this__ = this;
    const result = context.__this__(...argus);
    delete context.__this__;
    return result;
}
getName.myCall(obj, 12, 12);