const row = 10000, col = 10000;
var arr = [];
var a = 0;
for (var i = 0; i < row; i++) {
    arr[i] = [];
    for (var j = 0; j < col; j++) {
        arr[i][j] = j;
    }
}
var rowForEach = () => {
    console.time('rowForEach');
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            a = arr[i][j];
        }
    }
    console.timeEnd('rowForEach');
}
var colForEach = () => {
    console.time('colForEach');
    for (var j = 0; j < col; j++) {
        for (var i = 0; i < row; i++) {
            a = arr[i][j];
        }
    }
    console.timeEnd('colForEach');
}
var bigArr = () => {
    var l = row * col;
    console.time('bigArrCreate');
    var arr = new Array(l).fill(0).map((_, index) => index);
    console.timeEnd('bigArrCreate');

    console.time('bigArr');
    // for (var i = 0; i < l; i++) {
    //     a = arr[i];
    // }
    console.timeEnd('bigArr');
}
colForEach();
rowForEach();
// bigArr();

//10000*10000   rowForEach: 100.415ms   colForEach: 2.296s   bigArr: 5:05.363 (m:ss.mmm)