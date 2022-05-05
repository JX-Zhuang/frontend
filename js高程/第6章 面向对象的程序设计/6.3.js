/**
 * 继承
 * 1.原型链
 * 缺点：
 *      1.共享实例
 *      2.无法在不影响所有对象实例的情况下，给父类传参
 * 2.组合继承
 * 缺点：
 *      1.调用两次父类构造函数
 * 3.寄生组合式继承
 */
function t1() {
    function SuperType() {
        this.colors = [];
    }
    SuperType.prototype.getColors = function () {
        console.log(this.colors);
    }
    function SubType() {

    }
    SubType.prototype = new SuperType();
    const a = new SubType();
    const b = new SubType();
    console.log(a.colors === b.colors);
}
function t2() {
    function SuperType() {
        this.colors = [];
    }
    SuperType.prototype.getColors = function () {
        console.log(this.colors);
    }
    function SubType(name) {
        SuperType.call(this, arguments);
        this.name = name;
    }
    SubType.prototype = new SuperType();
    SubType.prototype.getName = function () {
        console.log(this.name);
    }
    const a = new SubType('a');
    const b = new SubType('b');
    console.log(a.colors === b.colors);
    a.getName();
    b.getName();
}
function t3() {
    function create(o) {
        if (Object.create) return Object.create(o);
        function F() { }
        F.prototype = o;
        return new F();
    }
    function inheritPrototype(subType, superType) {
        const prototype = create(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }
    function SuperType(name) {
        this.name = name;
    }
    SuperType.prototype.sayName = function () {
        console.log(this.name);
    };
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }
    inheritPrototype(SubType, SuperType);
    SubType.prototype.sayAge = function () {
        console.log(this.age);
    }
}
t1();
t2();