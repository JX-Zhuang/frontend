/**
 * 创建对象
 * 1.工厂模式
 *      缺点：无法解决对象识别问题
 * 2.构造函数模式
 *      缺点：实例上的方法不相同
 * 3.原型模式
 *      缺点：可以修改属性
 * 4.组合使用构造函数模式和原型模式
 */
function t1() {
    function createPerson(name, age) {
        return {
            name,
            age,
            sayName: function () {
                console.log(this.name);
            }
        }
    }
    const p = createPerson('Jesse', 23);
    p.sayName();
}
function t2() {
    function Person(name, age) {
        this.name = name;
        this.age = this.age;
        this.sayName = function () {
            console.log(this.name);
        }
    }
    const p = new Person('Jesse', 23);
    p.sayName();
}
function t3() {
    function Person(name, age) {
    }
    Person.prototype.name = 'Jesse';
    Person.prototype.age = 23;
    Person.prototype.sayName = function () {
        console.log(this.name);
    }
    const p = new Person('Jesse', 23);
    p.sayName();
    console.log(p.__proto__ === p.constructor.prototype);
    console.log(p.__proto__ === Person.prototype);
    console.log(p.constructor === Person);
    console.log(Person.prototype.isPrototypeOf(p));
    console.log(Object.getPrototypeOf(p) === p.constructor.prototype);
    console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(p), 'name'));
    for (const k in p) {
        console.log(p[k])
    }
    console.log('name' in p);
    console.log(p.hasOwnProperty('name'));
}
function t4() {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype = {
        constructor: Person,
        sayName: function () {
            console.log(this.name);
        }
    };
    const p = new Person('Jesse', 23);
    p.sayName();
}
t1();
t2();
t3();
t4();