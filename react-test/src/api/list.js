const getList = () => Array.from(new Array(10)).map((_, index) => ({
    name: new Date().toLocaleString() + ',' + index,
    id: index
}));
export default () => {
    return new Promise(resolve => {
        resolve(getList());
    })
}