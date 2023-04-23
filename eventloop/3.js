console.log(2)
let doit;
const prom = new Promise((resolve, reject) => {
    console.log(3)
    doit = resolve;
    console.log(6)
});
prom.then(n => console.log(4));
async function s1() {
    console.log(7)
    await s2()
    doit();
    console.log(8);
}
async function s2() {
    console.log(9)
}
s1()
console.log(5);
prom.then(n => console.log(10));

/**
 * 2
 * 3
 * 6
 * 7
 * 9
 * 5
 * 8
 * 4
 * 10
 */