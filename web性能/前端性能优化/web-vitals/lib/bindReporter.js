const getRating = (
    value,
    thresholds
) => {
    if (value > thresholds[1]) {
        return 'poor';
    }
    if (value > thresholds[0]) {
        return 'needs-improvement';
    }
    return 'good';
};

export const bindReporter = (callback, metric, thresholds, reportAllChanges) => {
    let prevValue, delta;
    return (forceReport) => {
        if (metric.value >= 0) {
            if (forceReport || reportAllChanges) {
                delta = metric.value - (prevValue || 0);
                if (delta || prevValue === undefined) {
                    prevValue = metric.value;
                    metric.delta = delta;
                    metric.rating = getRating(metric.value, thresholds);
                    callback(metric);
                }
            }
        }
    }
};