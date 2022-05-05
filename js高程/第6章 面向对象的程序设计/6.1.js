// Object.defineProperty
// Object.defineProperties
// Object.getOwnPropertyDescriptor
const person = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(person, 'name', {
    value: 'Jesse'
});
delete person.name;
Object.defineProperty(person, 'year', {
    get: function () {
        return this._year;
    },
    set: function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
person.year = 2005;
console.log(person.edition);
console.log(Object.getOwnPropertyDescriptor(person, 'edition'));