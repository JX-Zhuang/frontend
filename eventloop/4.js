console.log(1);
new Promise((resolve, reject) => {
    const s = Date.now();
    while (Date.now() - s < 2000);
    resolve(2);
}).then(r => {
    console.log(r);
});
setTimeout(() => {
    console.log(3);
    new Promise((resolve, reject) => {
        const s = Date.now();
        while (Date.now() - s < 2000);
        resolve(4);
    }).then(r => {
        console.log(r);
    });
}, 1000);
setTimeout(() => {
    console.log(5);
}, 1000);