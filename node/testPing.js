const ping = require('ping');

var hosts = ['google.com','baidu.com'];

(async () => {
    for (let host of hosts) {
        let res = await ping.promise.probe(host);
        console.log(res);
    }
})();