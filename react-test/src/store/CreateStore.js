import PubSub from "./PubSub";
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
class CreateStore {
    constructor(fetch) {
        this.fetch = fetch;
        this.fetchQueue = new FetchQueue();
        this.pubSub = new PubSub();
        this.initFlag = false;
        this.firstGetData = false;
        this.innerState = {
            data: undefined
        };
        this.state = {
            data: undefined,
            error: undefined,
            isLoading: true,
            isValidating: true,
            mutate: this.mutate
        };
    }
    init(setState, params) {
        this.subscribe(setState);
        // this.initMutate(params);
        this.initFlag = true;
    }
    enqueue(fetch) {
        const thisFetch = async () => {
            let data, error;
            try {
                data = await fetch();
            } catch (e) {
                error = e;
            }
            this.firstGetData = true;
            if (thisFetch === this.fetchQueue.tail) {
                this.setState(state => ({
                    ...state,
                    data,
                    isValidating: false,
                    isLoading: false,
                    error
                }));
            }
        };
        this.fetchQueue.enqueue(thisFetch);
    }
    mutate = async (params) => {
        this.enqueue(() => this.fetch(params));
        //todo 不设置state
        this.setState(state => ({
            ...state,
            isValidating: true
        }));
        const lastFetch = this.fetchQueue.tail;
        lastFetch();
    }
    initMutate = async (params) => {
        if (this.state.data || this.initFlag) return this.state;
        const state = await this.mutate(params);
        return state;
    }
    subscribe = (callback) => {
        return this.pubSub.subscribe('getList', callback);
    }
    setState(payload) {
        let state = payload;
        if (typeof payload === 'function') {
            state = payload(this.state);
        }
        for (const key in this.state) {
            if (this.state[key] !== state[key]) {
                this.state = state;
                this.pubSub.publish('getList', this.state);
                return;
            }
        }
    }
    getState() {
        const instance = this;
        console.log('getState')
        return {
            get data() {
                console.log('getState,data')
                if (!instance.firstGetData) {
                    instance.mutate();
                }
                return instance.state.data;
            },
            error: undefined,
            isLoading: true,
            isValidating: true,
            mutate: this.mutate
        };
    }
}
export default CreateStore;
