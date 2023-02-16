const http = require('http');
const options = {
    port: 80,
    method: 'GET'
};
let count = 0;
const run = () => {
    const req = http.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
    });
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    req.end();
};
const start = Date.now();
while (Date.now() - start < 100) run();