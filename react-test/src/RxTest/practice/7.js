import {
    fromEvent, fromEventPattern
} from 'rxjs';

// const clicks = fromEvent(document, 'click');
// clicks.subscribe(x => console.log(x));
function addClickHandler(handler) {
    document.addEventListener('click', handler);
    return 123;
}

function removeClickHandler(handler, n) {
    console.log(n);
    document.removeEventListener('click', handler);
}

const clicks = fromEventPattern(
    addClickHandler,
    removeClickHandler
);
const result = clicks.subscribe(x => {
    console.log(x);
    result.unsubscribe();
});