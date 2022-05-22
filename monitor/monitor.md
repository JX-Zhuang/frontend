# 前端监控
## 前端监控目标
### 稳定性
* JS错误
* 资源异常
* 接口异常
* 白屏
### 用户体验
* 加载时间
* TTFB:首字节时间
* FP:首次绘制
* FCP:首次绘制内容
* FMP:首次绘制有意义的内容
* FID:首次输入延迟
* 卡顿:超过50ms的长任务
### 业务
* PV
* UV
* 页面停留时间
## 错误监控
### 资源和同步JS错误
```
window.addEventListener('error', function (event) {
    let lastEvent = getLastEvent();
    if (event.target && (event.target.src || event.target.href)) {
        // 资源异常
        tracker.send({
            kind: KIND.STABILITY,
            type: TYPE.ERROR,
            errorType: ERROR_TYPE.RESOURCE,
            filename: event.target.src || event.target.href,
            tagName: event.target.tagName,
            selector: getSelector(event.target)  //最后一个操作的元素
        });
    } else {
        // JS错误
        tracker.send({
            kind: KIND.STABILITY,
            type: TYPE.ERROR,
            errorType: ERROR_TYPE.JS,
            message: event.message,
            filename: event.filename,
            position: `${event.lineno}:${event.colno}`,
            stack: getLines(event.error.stack),
            selector: lastEvent ? getSelector(lastEvent.path) : ''   //最后一个操作的元素
        });
    }
}, true);
```
### Promise错误
```
window.addEventListener('unhandledrejection', function (event) {
    let lastEvent = getLastEvent();
    let message, reason = event.reason, filename,
        line = 0, column = 0, stack = '';
    if (typeof reason === 'string') {
        message = reason;
    } else if (typeof reason === 'object') {
        if (reason.stack) {
            let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
            filename = matchResult[1];
            line = matchResult[2];
            column = matchResult[3];
        }
        message = reason.message;
        stack = getLines(reason.stack);
    }
    tracker.send({
        kind: KIND.STABILITY,
        type: TYPE.ERROR,
        errorType: ERROR_TYPE.PROMISE,
        message,
        filename,
        position: `${line}:${column}`,
        stack,
        selector: lastEvent ? getSelector(lastEvent.path) : ''   //最后一个操作的元素
    });
}, true);
```
### 接口数据异常
```
//以ajax为例
const XMLHttpRequest = window.XMLHttpRequest;
const oldOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url, async) {
    if (!url.match(/log/)) {
        this.logData = {
            method,
            url,
            async
        };
    }
    return oldOpen.apply(this, arguments);
}
const oldSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
        const startTime = Date.now();
        const handler = (type) => (event) => {
            const duration = Date.now() - startTime;
            const status = this.status;
            const statusText = this.statusText;
            tracker.send({
                kind: KIND.STABILITY,
                type: TYPE.XHR,
                eventType: type,
                pathname: this.logData.url,
                status: `${status}-${statusText}`,
                duration,
                response: this.response ? JSON.stringify(this.response) : '',
                params: body || ''
            });
        };
        this.addEventListener('load', handler('load'), false);
        this.addEventListener('error', handler('error'), false);
        this.addEventListener('abort', handler('abort'), false);
    }
    return oldSend.apply(this, arguments);
}
```
### 白屏
* 水平线：页面水平方向的中心线
* 垂直线：页面垂直方向的中心线
* 判断水平线和垂直线的命中元素个数小于某个数值，判断为白屏
```
const wrapperSelectors = ['html', 'body', '#container', '.content'];
let emptyPoints = 0;
function isWrapper(element) {
    let selector = getSelector(element);
    if (wrapperSelectors.indexOf(selector) >= 0) {
        emptyPoints++;
    }
}
onload(function () {
    for (let i = 1; i <= 9; i++) {
        let xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
        let yElements = document.elementFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);
        isWrapper(xElements[0]);
        isWrapper(yElements[0]);
    }
    if (emptyPoints < 10) {
        const centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        tracker.send({
            kind: KIND.STABILITY,
            type: TYPE.BLANK,
            emptyPoints,
            screen: window.screen.width + 'x' + window.screen.height,
            viewPoint: window.innerWidth + 'x' + window.innerHeight,
            selector: getSelector(centerElements[0])
        })
    }
});
```
## 用户体验
### 加载时间
```
onload(function () {
    setTimeout(() => {
        const {
            fetchStart,
            connectStart,
            connectEnd,
            requestStart,
            responseStart,
            responseEnd,
            domLoading,
            domInteractive,
            domContentLoadedEventStart,
            domContentLoadedEventEnd,
            loadEventStart
        } = performance.timing;
        tracker.send({
            kind: KIND.EXPERIENCE,
            type: TYPE.TIMING,
            connectTime: connectEnd - connectStart,
            ttfbTime: responseStart - requestStart,  //首字节到达时间
            responseTime: responseEnd - responseStart,  //响应的读取时间
            parseDOMTime: loadEventStart - domLoading,  //DOM解析时间
            domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
            // DOMContentLoad事件耗时
            timeToInteractive: domInteractive - fetchStart,  //首次可交互时间
            loadTime: loadEventStart - fetchStart   //完整的加载时间
        });
    }, 3000);
})
```
### 性能指标
* FMP:需要开发人员标注首次有意义的元素
```
const h1 = document.createElement('h1');
h1.innerHTML = '最有意义的内容';
h1.setAttribute('elementtiming', 'meaning');
```

```
let FMP, LCP;
// 增加一个性能条目的观察者
new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect();
}).observe({ entryTypes: ['element'] });    //观察页面中有意义的元素

new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries();
    LCP = perfEntries[0];
    observer.disconnect();
}).observe({ entryTypes: ['largest-contentful-paint'] });    //观察页面中最大的元素

new PerformanceObserver((entryList, observer) => {
    let lastEvent = getLastEvent();
    let firstInput = entryList.getEntries()[0];
    console.log('firstInput', firstInput);
    if (firstInput) {
        // processingStart开始处理的时间，startTime开始点击的时间
        const inputDelay = firstInput.processingStart - firstInput.startTime;
        const duration = firstInput.duration;   //处理延时
        if (inputDelay > 0 || duration > 0) {
            tracker.send({
                kind: KIND.EXPERIENCE,
                type: TYPE.FIRST_INPUT_DELAY,//首次输入延迟
                inputDelay,
                duration,
                startTime: firstInput.startTime,
                selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
            });
        }
    }
    observer.disconnect();
}).observe({ type: 'first-input', buffered: true });
//用户的第一次交互，点击页面，输入

onload(function () {
    setTimeout(() => {
        let FP = performance.getEntriesByName('first-paint')[0];
        let FCP = performance.getEntriesByName('first-contentful-paint')[0];
        //发送性能指标
        console.log('FP', FP);
        console.log('FCP', FCP);
        console.log('FMP', FMP);
        console.log('LCP', LCP);
        tracker.send({
            kind: KIND.EXPERIENCE,
            type: TYPE.PAINT,
            firstPaint: FP ? formatTime(FP.startTime) : 0,
            firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
            firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
            largestContentfulPaint: LCP ? formatTime(LCP.renderTime || LCP.loadTime) : 0
        });
    }, 3000);
})
```
## 业务统计
```
const { connection } = navigator;
tracker.send({
    kind: KIND.BUSINESS,
    type: TYPE.PV,
    effectiveType: connection.effectiveType,
    rtt: connection.rtt
});
const startTime = Date.now();
window.addEventListener('unload', () => {
    const stayTime = Date.now() - startTime;
    tracker.send({
        kind: KIND.BUSINESS,
        type: TYPE.STAY_TIME,
        stayTime
    });
})
```