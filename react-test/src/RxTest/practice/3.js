import { ajax } from 'rxjs/ajax';
import { map, catchError, of, from } from "rxjs";
const obs$ = ajax.getJSON('https://api.github.com/users?per_page=5').pipe(
    map(user => console.log('user:', user)),
    catchError(error => {
        console.log('error:', error);
        return of(error);
    })
);
obs$.subscribe({
    next: value => console.log(value),
    error: err => console.log(err)
});

const users = ajax({
    url: 'https://httpbin.org/delay/2',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs'
    },
    body: {
        rxjs: 'Hello World!'
    }
}).pipe(
    map(response => console.log('response: ', response)),
    catchError(error => {
        console.log('error: ', error);
        return of(error);
    })
);

users.subscribe({
    next: value => console.log(value),
    error: err => console.log(err)
});

const obsError = ajax('https://api.github.com/404').pipe(
  map(userResponse => console.log('users: ', userResponse)),
  catchError(error => {
    console.log('error: ', error);
    return of(error);
  })
);
 
obsError.subscribe({
  next: value => console.log(value),
  error: err => console.log(err)
});