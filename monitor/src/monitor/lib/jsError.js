import { KIND, TYPE, ERROR_TYPE } from '../utils/constants';
import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker';
export function injectJsError() {
    //监听全局未捕获的错误
    window.addEventListener('error', function (event) {
        let lastEvent = getLastEvent();
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({
                kind: KIND.STABILITY,
                type: TYPE.ERROR,
                errorType: ERROR_TYPE.RESOURCE,
                filename: event.target.src || event.target.href,
                tagName: event.target.tagName,
                selector: getSelector(event.target)  //最后一个操作的元素
            });
        } else {
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
}
function getLines(stack) {
    if (!stack) {
        return '';
    }
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
}