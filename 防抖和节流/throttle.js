//节流
function throttle(func, wait, options = { leading: true, trailing: true }) {
    const { leading, trailing } = options;
    let lastTime = 0, timer;
    return function () {
        clearTimeout(timer);
        timer = null;
        const currentTime = Date.now();
        if (lastTime === 0 && !leading) {
            lastTime = currentTime;
        }
        const nextTime = lastTime + wait;
        if (currentTime >= nextTime) {
            func.apply(this, arguments);
            lastTime = currentTime;
        } else {
            if (trailing) {
                timer = setTimeout(() => {
                    func.apply(this, arguments);
                    lastTime = Date.now();
                }, nextTime - currentTime);
            }
        }
    }
}
function throttle(func,wait){
    let lastTime = 0;
    return function(){
        const currentTime = Date.now();
        if(currentTime-lastTime>=wait){
            func.apply(this,arguments);
            lastTime = currentTime;
        }
    }
}
module.exports = throttle;