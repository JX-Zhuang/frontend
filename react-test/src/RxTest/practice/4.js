import { bindCallback, asyncScheduler } from 'rxjs';

const someFunction = (cb) => {
    console.log(999)
    cb(5, 'some string', { someProperty: 'someValue' })
};

const boundSomeFunction = bindCallback(someFunction,(...argus)=>argus);
boundSomeFunction().subscribe(values => {
    console.log(values); // [22, 2]
});