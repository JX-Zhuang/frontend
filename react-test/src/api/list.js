const getList = (id) => Array.from(new Array(10)).map((_, index) => ({
    name: new Date().toLocaleString() + ',' + index + ',id:' + id,
    id: index
}));
export default async (id) => {
    console.log('请求list,id:', id);
    const res = await fetch('/123');
    return new Promise((resolve, reject) => {
        const time = 2000//Math.random() * 5000;
        // console.log('thisId:', thisId, time);
        // setTimeout(() => {
            // if (id % 5 === 0) {
                const list = getList(id);
                resolve(list);
            // } else {
                // reject(`error:${id}`);
            // }
        // }, time);
    });
}