import userAgent from 'user-agent';
function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent)
    }
}
class SendTracker {
    constructor() {
        this.url = '';
        this.xhr = new XMLHttpRequest;
    }
    send(data = {}) {
        let extraData = getExtraData();
        let log = {
            ...extraData,
            ...data
        };
        console.log(log)
        // this.xhr.open('POST', this.url, true);
        // let body = JSON.stringify(log);
        // this.xhr.setRequestHeader('', '');
        // this.xhr.onload = function () {

        // };
        // this.xhr.onerror = function (error) {

        // };
        // this.xhr.send(body);
    }
}
export default new SendTracker();