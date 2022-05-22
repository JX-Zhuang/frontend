import tracker from '../utils/tracker';
import formatTime from '../utils/formatTime';
import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import { KIND, TYPE } from '../utils/constants';
export function longTask() {
    new PerformanceObserver((entryList, observer) => {
        entryList.getEntries().forEach(entry => {
            if (entry.duration > 100) {
                const lastEvent = getLastEvent();
                if (lastEvent) {
                    console.log(lastEvent)
                    requestIdleCallback(() => {
                        tracker.send({
                            kind: KIND.EXPERIENCE,
                            type: TYPE.LONG_TASK,
                            eventType: lastEvent.type,
                            startTime: formatTime(entry.startTime),// 开始时间
                            duration: formatTime(entry.duration),// 持续时间
                            selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
                        });
                    });
                }
            }
        })
    }).observe({ entryTypes: ['longtask'] });

}