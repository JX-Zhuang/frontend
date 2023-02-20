const getList = (id) => Array.from(new Array(10)).map((_, index) => ({
    name: 'card:' + new Date().toLocaleString() + ',' + index ,
    id: index
}));
export default async () => {
    return new Promise((resolve, reject) => {
        resolve(getList());
    });
}