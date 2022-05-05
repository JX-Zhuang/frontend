function test1(element) {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent('myClick', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(event);
}
function allElementAddEvent() {
    const body = document.body;
    const helper = function (element) {
        if (!element) return null;
        if (element.nodeType === 1) {
            element.addEventListener('click', function () {
                console.log(this);
            });
        };
        element.childNodes.forEach(element => helper(element));
    }
    helper(body);
}
allElementAddEvent();