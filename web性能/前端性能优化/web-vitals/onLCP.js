import { whenActivated } from './lib/whenActivated.js';
import { observe } from './lib/observe.js';
import { initMetric } from './lib/initMetric.js';
import { bindReporter } from './lib/bindReporter.js';
const LCPThresholds = [2500, 4000];
export const onLCP = (onReport, opts) => {
    opts = opts || {};
    whenActivated(() => {
        let report;
        let metric = initMetric('LCP');
        const handleEntries = (entries) => {
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
                metric.value = lastEntry.startTime;
                metric.entries = [lastEntry];
                report();
            }

        }
        const po = observe('largest-contentful-paint', handleEntries);
        if (po) {
            report = bindReporter(onReport, metric, LCPThresholds, opts.reportAllChanges);
        }
        const stopListening = () => {
            po.disconnect();
            report(true);
        }
        ['keydown', 'click'].forEach((type) => {
            addEventListener(type, stopListening, true);
        });
    });
}