function init() {
    performance.mark('startTask1');
    run();
    performance.mark('endTask1');
    logPerformance();
}
function logPerformance() {
    const perfEntries = performance.getEntriesByType('mark');
    for (const entry of perfEntries) {
        console.log(`Name:${entry.name},Entry Type:${entry.entryType},Start Time:${entry.startTime},Duration:${entry.duration}`);
    }
    console.log(performance.timing);
}
function run() {
    let i = 0;
    while (i < 10000000000) i++;
}
init();
function timing1() {
    const [entry] = performance.getEntriesByType("navigation");
    // const entry = performance.timing;
    const { navigationStart, redirectStart, redirectEnd, fetchStart, domainLookupStart, domainLookupEnd, connectStart, connectEnd,
        requestStart, responseStart, responseEnd, domLoading, domInteractive, domContentLoadedEventStart, domContentLoadedEventEnd,
        domComplete, loadEventStart, loadEventEnd, unloadEventStart, unloadEventEnd } = entry;
    console.log(`重定向：${redirectEnd - redirectStart}`);
    console.log(`应用缓存：${domainLookupStart - fetchStart}`);
    console.log(`DNS：${domainLookupEnd - domainLookupStart}`);
    console.log(`TCP：${connectEnd - connectStart}`);
    console.log(`请求：${responseStart - requestStart}`);
    console.log(`响应：${responseEnd - responseStart}`);
    console.log(`处理：${domComplete - domLoading}`);
    console.log(`加载：${loadEventEnd - loadEventStart}`);
    console.log(`DOMContentLoaded：${domContentLoadedEventEnd - domContentLoadedEventStart}`);
    console.log(`卸载：${unloadEventEnd - unloadEventStart}`);
}