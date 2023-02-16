function objectFactory(Constructor, ...argus) {
    function F() { }
    F.prototype = Constructor.prototype;
    const obj = new F();
    const result = Constructor.apply(obj, argus);
    return typeof result === 'object' ? result : obj;
}

// Otaku 御宅族，简称宅
function Otaku(name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
    // return {
    //     name: name,
    //     habit: 'Games result'
    // }
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = objectFactory(Otaku, 'Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin