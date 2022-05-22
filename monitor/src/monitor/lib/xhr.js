import { KIND, TYPE } from '../utils/constants';
import tracker from '../utils/tracker';
export function injectXHR() {
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
}