import tracker from '../utils/tracker';
import { KIND, TYPE } from '../utils/constants';
export function pv() {
    const { connection } = navigator;
    tracker.send({
        kind: KIND.BUSINESS,
        type: TYPE.PV,
        effectiveType: connection.effectiveType,
        rtt: connection.rtt
    });
    const startTime = Date.now();
    window.addEventListener('unload', () => {
        const stayTime = Date.now() - startTime;
        tracker.send({
            kind: KIND.BUSINESS,
            type: TYPE.STAY_TIME,
            stayTime
        });
    })
}