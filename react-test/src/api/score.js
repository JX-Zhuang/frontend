export default Array.from(new Array(100)).map((_, index) => ({
    name: 'score' + index,
    id: index
}));