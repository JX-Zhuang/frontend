
/**
 * 寄生组合式继承两步：
 * 1.构造函数继承
 * 2.继承原型上的方法和属性
 */
function myExtends(Child, Parent) {
    function create(o) {
        function F() { }
        F.prototype = o;
        return new F();
    }
    const prototype = create(Parent.prototype);
    prototype.constructor = Child;
    Child.prototype = prototype;
}

function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}
myExtends(Child, Parent);
Child.prototype.getName = function () {
    console.log('Child', this.name);
}
const c = new Child('zhuang', 20);
c.getName();
console.log(c.constructor);

function create(obj) {
    function F() { };
    F.prototype = obj;
    return new F();
}