const getList = (id) => Array.from(new Array(10)).map((_, index) => ({
    name: new Date().toLocaleString() + ',' + index + ',id:' + id,
    id: index
}));
export default (id) => {
    console.log('请求list,id:', id);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getList(id));
        }, 2000);
    })
}