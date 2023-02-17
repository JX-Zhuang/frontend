const getList = (id) => Array.from(new Array(10)).map((_, index) => ({
    name: new Date().toLocaleString() + ',' + index + ',id:' + id,
    id: index
}));
export default (id) => {
    return new Promise(resolve => {
        resolve(getList(id));
    })
}