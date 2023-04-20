console.log('1.js')
// const date = Date.now();
// while (Date.now() - date < 2000);
const getStyle = () => console.log(document.styleSheets);
getStyle();
window.onload = () => getStyle();