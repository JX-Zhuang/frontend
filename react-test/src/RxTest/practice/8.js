import { generate } from 'rxjs';

const result = generate(0, x => {
    debugger
    return x < 3
}, x => {
    debugger
    return x + 1;
}, x => {
    debugger;
    return x
});

result.subscribe(x => console.log(x));

// Logs:
// 0
// 1
// 2