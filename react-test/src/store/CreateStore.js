import PubSub from "./PubSub";
const sleep = (time = 2000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, time);
});
class FetchQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(fetch) {
        this.queue.push(fetch);
    }
    dequeue() {
        return this.queue.slice(0, 1)[0];
    }
    get tail() {
        return this.queue[this.queue.length - 1];
    }
}
const EVENTS = {
    GET_DATA: "GET_DATA"
};
class CreateStore {
    constructor(fetch) {
        this.fetch = fetch;
        this.fetchQueue = new FetchQueue();
        this.pubSub = new PubSub();
        this.firstGetData = false;
        this.state = {
            data: undefined,
            error: undefined,
            isLoading: true,
            isValidating: true
        };
    }
    init(setState, params) {
        const { unsubscribe } = this.subscribe(setState);
        return {
            unsubscribe
        };
    }
    enqueue(params) {
        const thisFetch = async () => {
            let data, error;
            try {
                data = await this.fetch(params);
            } catch (e) {
                error = e;
            }
            if (thisFetch === this.fetchQueue.tail) {
                this.setState(state => ({
                    ...state,
                    data,
                    isValidating: false,
                    isLoading: false,
                    error
                }));
                if (error) {
                    sleep();
                    this.mutate(params);
                }
            }
        };
        this.fetchQueue.enqueue(thisFetch);
    }
    mutate = async (params) => {
        this.enqueue(params);
        //todo 不设置state
        this.setState(state => ({
            ...state,
            isValidating: true
        }));
        const lastFetch = this.fetchQueue.tail;
        lastFetch();
    }
    subscribe = (callback) => {
        return this.pubSub.subscribe(EVENTS.GET_DATA, callback);
    }
    setState(payload) {
        let state = payload;
        if (typeof payload === 'function') {
            state = payload(this.state);
        }
        for (const key in this.state) {
            if (this.state[key] !== state[key]) {
                this.state = state;
                this.pubSub.publish(EVENTS.GET_DATA, this.getState());
                return;
            }
        }
    }
    getState(params) {
        const instance = this;
        const { state } = instance;
        return {
            get data() {
                if (!instance.firstGetData) {
                    instance.firstGetData = true;
                    instance.mutate(params);
                }
                return state.data;
            },
            get error() {
                return state.error;
            },
            get isLoading() {
                return state.isLoading;
            },
            get isValidating() {
                return state.isValidating;
            },
            mutate: this.mutate
        };
    }
}
export default CreateStore;
