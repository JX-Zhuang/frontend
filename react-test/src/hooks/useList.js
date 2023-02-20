import { useCallback, useEffect, useRef, useState } from 'react';
import getList from '../api/list';
import UserList from '../store/UserList';
const createGlobalState = (initState, initRef) => {
    let globalState = initState, globalRef = initRef;
    const listeners = [];
    const broadcastState = (payload) => {
        if (typeof payload === 'function') {
            globalState = payload(globalState);
        } else {
            globalState = {
                ...globalState,
                ...payload
            };
        }
        listeners.forEach(listener => listener(globalState));
    };
    const useGlobalState = () => {
        const [state, setState] = useState(globalState);
        const setStateListen = useCallback(payload => {
            setState(state => ({
                ...state,
                ...payload
            }));
        }, []);
        const setStateHandler = useCallback((payload) => {
            broadcastState(payload);
        }, []);
        useEffect(() => {
            listeners.push(setStateListen);
            return () => {
                listeners.splice(listeners.indexOf(setStateListen), 1);
            }
        }, []);
        return [state, setStateHandler, globalRef];
    };
    return useGlobalState;
};
const useGlobalState = createGlobalState({
    data: undefined,
    isLoading: true
}, { isFetching: false });
const userList = new UserList();
const useList = () => {
    const [state, setSate] = useState(userList.getState());
    useEffect(() => {
        userList.initGetList();
        userList.subscribe(setSate);
    }, []);
    return {
        ...state,
        getList: userList.getList
    }
};
export default useList;