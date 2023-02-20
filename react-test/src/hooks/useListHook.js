import { useCallback, useEffect, useRef, useState } from 'react';
import getList from '../api/list';
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
const useFetcher = (fetcher, init = true) => {
    const [state, setState, globalRef] = useGlobalState();
    const ref = useRef();
    ref.current = {
        async mutate() {
            if (globalRef.isFetching) return;
            globalRef.isFetching = true;
            const data = await fetcher();
            globalRef.isFetching = false;
            setState(state => ({
                ...state,
                isLoading: false,
                data
            }));
        }
    };
    useEffect(() => {
        init && ref.current.mutate();
    }, []);
    return {
        ...state,
        mutate: ref.current.mutate
    }
};
const useList = (init) => {
    const { data, isLoading, error, mutate, isValidating } = useFetcher(getList, init);
    debugger
    return {
        data,
        isLoading,
        error,
        getList: mutate,
        isValidating
    }
};
export default useList;