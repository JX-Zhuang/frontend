// var span = document.getElementsByTagName('span')[0];
// span.textContent = 'interactive'; // change DOM text content
// span.style.display = 'inline'; // change CSSOM property
// // create a new element, style it, and append it to the DOM
// var loadTime = document.createElement('div');
// loadTime.textContent = 'You loaded this page on: ' + new Date();
// loadTime.style.color = 'blue';
// document.body.appendChild(loadTime);
// const sleep = () => {
//     const now = Date.now();
//     while (now + 2000 > Date.now());
//     console.log('end');
// };
// sleep();
function measureCRP() {
    var span = document.getElementsByTagName('span')[0];
    span.textContent = 'interactive'; // Change DOM text content.
    span.style.display = 'inline';  // Change CSSOM property.
    // Create a new element, style it, and append it to the DOM.
    var loadTime = document.createElement('div');
    loadTime.textContent = 'You loaded this page on: ' + new Date();
    loadTime.style.color = 'blue';
    document.body.appendChild(loadTime);
}