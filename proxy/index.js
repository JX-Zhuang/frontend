const target = {
    notProxied: "original value",
    proxied: "original value"
};
const handler = {
    get(target, prop, value) {
        if (prop === "proxied") {
            return "replaced value";
        }
        return Reflect.get(...arguments);
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.notProxied); // "original value"
console.log(proxy.proxied);    // "replaced value"