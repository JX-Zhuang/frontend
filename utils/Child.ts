class Parent {
    constructor(public name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    static staticParentName = 'Parent';
    static staticGetParentName() {
        return Parent.staticParentName
    }
}
class Child extends Parent {
    constructor(public age, public name) {
        super(name);
        this.age = age;
    }
    getAge() {
        return this.age;
    }
    static staticChildName = 'Child';
    static staticGetChildName() {
        return Child.staticChildName
    }
}
const child = new Child(12, '张三');
console.log(child.getAge());
console.log(child.getName());
console.log(Child.staticGetChildName());
console.log(Child.staticGetParentName());