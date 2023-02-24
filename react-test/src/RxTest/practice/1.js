import { Observable, from } from 'rxjs';
const observable1 = new Observable(subscriber => {
    console.log('11')
    try {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
        subscriber.next(4);
    } catch (err) {
        subscriber.error(err);
    }

});
setTimeout(()=>{
    observable1.subscribe(x => console.log('s1', x));
},4000);
// observable1.subscribe({
//     next(x) {
//         console.log('s2 next:' + x);
//     },
//     error(err) {
//         console.error('something wrong occurred: ' + err);
//     },
//     complete() {
//         console.log('done');
//     }
// });
// const observable2 = from([10, 20, 30]);
// const subscription = observable2.subscribe(x => console.log(x));