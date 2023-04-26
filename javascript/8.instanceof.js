/**
 * 实现类似：a instanceof b 的功能
 * a instanceof b
 * 返回b的prototype是不是在a的原型链上
 * Number，Boolean，String基本数据类型不能判断
 * console.log(1 instanceof Number);                    // false
 * console.log(true instanceof Boolean);                // false 
 * console.log('str' instanceof String);                // false  
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