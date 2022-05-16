console.log(1);
new Promise((resolve, reject) => {
    // resolve(1);
    resolve(122);
}).then(r => console.log(r), r => console.log(r));
console.log('1js');