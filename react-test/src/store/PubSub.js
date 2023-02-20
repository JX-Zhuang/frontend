class PubSub {
    events = {};
    checkEvent(event) {
        const subscribedEvents = this.events[event];
        return subscribedEvents && subscribedEvents.length;
    }
    constructor() {
        this.events = {};
    }
    subscribe(event, callback) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return {
            unsubscribe: () => this.unsubscribe(event, callback)
        };
    }
    unsubscribe(event, callback) {
        if (!this.checkEvent(event)) return false;
        this.events[event] = this.events[event].filter(
            subscribe => subscribe !== callback
        );
        return true;
    }
    publish(event, ...args) {
        if (!this.checkEvent(event)) return false;
        this.events[event].forEach(subscribe => {
            subscribe.call(this, ...args);
        });
    }
    clear(event) {
        if (this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }
        return true;
    }
    clearAll() {
        for (const event in this.events) {
            this.clear(event);
        }
    }
}
export default PubSub;
