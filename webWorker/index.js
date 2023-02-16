var myWorker = new Worker('worker.js');
const longTask = () => {
    const start = Date.now();
    while (Date.now() - start < 5000);
    return Date.now();
};
let a = { temp: {} };
myWorker.onmessage = function (event) {
    console.log(a, event.data, a.temp === event.data.temp,event);
    a = event.data;
    console.log(event.data);
};
const button = document.getElementById('button');
const initButton = document.getElementById('init');
const content = document.getElementById('content');
initButton.onclick = function () {
    myWorker.postMessage('init');
}
button.onclick = function () {
    content.innerHTML = Number(content.innerHTML) + 1;
}
// myWorker.postMessage("ali");
