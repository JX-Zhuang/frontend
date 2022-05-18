var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent = /** @class */ (function () {
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
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(age, name) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        _this.name = name;
        _this.age = age;
        return _this;
    }
    Child.prototype.getAge = function () {
        return this.age;
    };
    Child.staticGetChildName = function () {
        return Child.staticChildName;
    };
    Child.staticChildName = 'Child';
    return Child;
}(Parent));
var child = new Child(12, '张三');
console.log(child.getAge());
console.log(child.getName());
console.log(Child.staticGetChildName());
console.log(Child.staticGetParentName());
