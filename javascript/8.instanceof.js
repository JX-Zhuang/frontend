/**
 * 实现类似：a instanceof b 的功能
 * a instanceof b
 * 返回b的prototype是不是在a的原型链上
 */
function myInstanceof(obj, construct) {
    const prototype = construct.prototype;
    while (obj) {
        if (obj.__proto__ === prototype) return true;
        obj = obj.__proto__;
    }
    return false;
}
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
console.log(auto instanceof Object);
console.log(myInstanceof(auto, Car));
console.log(myInstanceof(auto, Object));