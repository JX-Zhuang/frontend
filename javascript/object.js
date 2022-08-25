//Object.preventExtensions:不能添加新的属性
//Object.seal:当前属性的值只要原来的可写的就可以改变
//Object.freeze:冻结一个对象，不能修改，不能添加，不能删除
//Object.isExtensible:判断一个对象是否是可扩展的
//Object.isSealed:判断一个对象是否被密封
//Object.isFrozen:判断一个对象是否被冻结
//Object.keys:返回一个包含对象自身可枚举属性名称的数组
//for...in:迭代一个对象的除Symbol以外的可枚举属性，包括继承的可枚举属性
//Object.getOwnPropertyNames:返回一个由指定对象的所有自身属性的属性名组成的数组，包括不可枚举属性但不包括Symbol值作为名称的属性
//Object.getOwnPropertySymbols:返回一个给定对象自身的所有Symbol属性的数组
/**
 * Object.defineProperty(obj,prop,descriptor)
 * descriptor:
 *  configurable:当且仅当configurable为true时，该属性的描述符才能被改变，同时该属性也能从对应的对象上删除。默认为false
 *  enumerable:当且仅当enumerable为true时，该属性才能出现在对象的枚举属性中。默认为false
 *  value:属性对应的值。默认undefined
 *  writable:当且仅当writable为true时，value可以被赋值运算符改变。默认为false
 *  get:默认undefined
 *  set:默认undefined
 */
//Object.getPrototypeOf:返回指定对象的原型。([[Prototype]],__proto__)
//Object.assign:将所有可枚举和自由的属性从一个或多个源对象复制到目标对象，返回修改后的对象
//Object.create:创建一个对象，使用现有的对象来作为新创建对象的原型(prototype)
/**
 * Object.prototype.isPrototypeOf:一个对象是否存在于另一个对象的原型链上
 *  prototypeObj.isPrototypeOf(object)
 */
/**
 * Object.prototype.propertyIsEnumerable:返回指定的属性是否可以枚举
 * 原型链继承的属性，返回false
 */
//Object.setPrototypeOf(obj,prototype):设置一个指定的对象的原型到另一个对象或null
//obj.valueOf:返回指定对象的原始值
//Object.values(obj):返回一个给定对象自身的所有可枚举属性值的数组