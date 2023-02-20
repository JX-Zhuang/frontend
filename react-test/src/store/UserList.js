import PubSub from "./PubSub";
import getList from '../api/list';
class UserList {
    constructor() {
        this.pubSub = new PubSub();
        this.state = {
            data: undefined,
            isLoading: true
        };
        this.isFetching = false;
        // data error, isLoading, isValidating
    }
    getList = async () => {
        const res = await getList();
        const state = {
            data: res,
            isLoading: false
        };
        this.setState(state);
        this.pubSub.publish('getList', state);
        return state;
    }
    initGetList = async () => {
        if (this.state.data || this.isFetching) return this.state;
        this.isFetching = true;
        const state = await this.getList();
        this.isFetching = false;
        return state;
    }
    subscribe = (callback) => {
        return this.pubSub.subscribe('getList', callback);
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
}
export default UserList;
