export const initMetric = (name, value) => {
    return {
        name,
        value: typeof value === 'undefined' ? -1 : value,
        entries: [],
        rating: 'good',
        delta: 0
    }
};