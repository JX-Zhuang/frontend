import { of, map, first, last, interval, take, scan } from "rxjs";
of(1, 2, 3)
    .pipe(map(x => x * x))
    .subscribe(v => console.log(`value:${v}`));

of(1, 2, 3)
    .pipe(map(x => x * x), first())
    .subscribe(v => console.log(`value:${v}`));

interval(1000).pipe(scan(v => v + 2, 3), take(11)).subscribe(v => console.log('interval2', v));