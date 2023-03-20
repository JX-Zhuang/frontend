// import helloWorld, { create, createReportList } from './modules/canvas.js';
// import helloWorld ,{create,createReportList} from 'http://localhost.hrtps.com:3000/canvas.js';
import helloWorld, { create, createReportList } from 'canvas';
import randomSquare, { draw, reportArea, reportPerimeter } from 'square';

let myCanvas = create('myCanvas', document.body, 480, 320);
let reportList = createReportList(myCanvas.id);

let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
let square2 = randomSquare(myCanvas.ctx);
helloWorld();