const row = 100, col = 100;
var arr = new Array(row).fill(0).map(() => new Array(col).fill(0).map((_,index)=>index));
var rowForEach = () => {
    console.time('rowForEach');
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            console.log(arr[i][j]);
        }
    }
    console.timeEnd('rowForEach');
}
var colForEach = ()=>{
    console.time('colForEach');
    for(var j = 0;j<col;j++){
        for(var i = 0;i<row;i++){
            console.log(arr[i][j]);
        }
    }
    console.timeEnd('colForEach');
}
rowForEach();   
colForEach(); 
//100*100   rowForEach: 143.492ms   colForEach: 163.987ms
//500*500   rowForEach: 3.184s      colForEach: 3.145s
//1000*1000 rowForEach: 11.426s     colForEach: 11.470s