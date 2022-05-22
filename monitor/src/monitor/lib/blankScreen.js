import { KIND, TYPE } from '../utils/constants';
import tracker from '../utils/tracker';
import onload from '../utils/onload';
function getSelector(element) {
    if (!element) return '';
    if (element.id) {
        return '#' + element.id;
    } else if (element.className) {
        return '.' + element.className.split(' ').filter(item => !!item).join('.');
    } else {
        return element.nodeName.toLowerCase();
    }
}
export function blankScreen() {
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
}