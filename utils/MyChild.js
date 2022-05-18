var __extends = (function () {
    var extendStatics = function (Child, Parent) {
        Object.setPrototypeOf(Child, Parent);
    }
    return function (Child, Parent) {
        extendStatics(Child, Parent);
        function T() {
            this.constructor = Child;
        }
        T.prototype = Parent.prototype;
        Child.prototype = new T();
        // Child.prototype = Parent.prototype;
    };
})();
var Parent = (function () {
    function Parent(name) {
        this.name = name;
        this.name = name;
    }
    Parent.prototype.getName = function () {
        return this.name;
    };
    Parent.staticGetParentName = function () {
        return Parent.staticParentName;
    };
    Parent.staticParentName = 'Parent';
    return Parent;
})();
var Child = (function (_super) {
    __extends(Child, _super);
    function Child(age, name) {
        _super.call(this, name);
        this.age = age;
    }
    Child.prototype.getAge = function () {
        return this.age;
    };
    Child.staticGetChildName = function () {
        return Child.staticChildName;
    };
    Child.staticChildName = 'Child';
    return Child;
})(Parent);
var child = new Child(12, '张三');
console.log(child.getAge());
console.log(child.getName());
console.log(child.constructor);
console.log(Child.staticGetParentName());