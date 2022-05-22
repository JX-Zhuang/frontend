import { KIND, TYPE } from '../utils/constants';
import tracker from '../utils/tracker';
import onload from '../utils/onload';
import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import formatTime from '../utils/formatTime';
export function timing() {
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
}