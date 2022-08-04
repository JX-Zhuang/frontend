//防抖
function debounce(func, wait, options = { leading: false }) {
    const { leading } = options;
    let timer, leadingInvoked = false;
    const debouncedFn = function () {
        clearTimeout(timer);
        timer = null;
        if (leading && !leadingInvoked) {
            func.apply(this, arguments);
            leadingInvoked = true;
        } else {
            timer = setTimeout(() => {
                func.apply(this, arguments);
                leadingInvoked = false;
            }, wait);
        }
    }
    debouncedFn.cancel = function () {
        clearTimeout(timer);
        timer = null;
        leadingInvoked = false;
    };
    return debouncedFn;
}
module.exports = debounce;