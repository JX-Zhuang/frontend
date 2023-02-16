const a = { time: Date.now(), temp: {
    a:1
} };
const longTask = () => {
    const start = Date.now();
    // return [3]
    // while (Date.now() - start < 5000);
    a.time = start;
    return a;
};
this.onmessage = function (e) {
    if (e.data === 'init') {
        postMessage(longTask());
    }
    console.log(e)
}