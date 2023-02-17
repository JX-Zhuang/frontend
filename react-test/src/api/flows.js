export default Array.from(new Array(100)).map((_, index) => ({
    name: 'flow' + index,
    id: index
}));