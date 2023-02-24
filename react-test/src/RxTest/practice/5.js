import { defer, fromEvent, interval } from 'rxjs';

const clicksOrInterval = defer(() => {
    return Math.random() > 0.5
        ? fromEvent(document, 'click')
        : interval(1000);
});
clicksOrInterval.subscribe(x => console.log(x));