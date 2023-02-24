import { from, interval, take, asyncScheduler } from 'rxjs';

const array = [10, 20, 30];
const result1 = from(array);

result1.subscribe(x => console.log(x));

function* generateDoubles(seed) {
    let i = seed;
    while (true) {
        yield i;
        i = 2 * i; // double it
    }
}
const iterator = generateDoubles(3);
const result2 = from(iterator).pipe(take(10));

result2.subscribe(x => console.log(x));

console.log('start');

const result3 = from(array, asyncScheduler);

result3.subscribe(x => console.log(x));

console.log('end');
