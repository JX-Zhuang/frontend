export const whenActivated = (callback) => {
    if (document.prerendering) {
        addEventListener('prerenderingchange', () => callback(), true);
    } else {
        callback();
    }
};