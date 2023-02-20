import { useCallback, useEffect, useRef, useState } from 'react';
import getList from '../api/list';
import CreateStore from './CreateStore';
const createUseStore = (fetch, initParams) => {
    const store = new CreateStore(fetch);
    const useStore = (props = {}) => {
        const [state, setSate] = useState(() => {
            console.log(999)
            return store.getState();
        });
        useEffect(() => {
            store.init(setSate, {
                ...initParams,
                ...props.initParams
            });
        }, []);
        return {
            ...state
        };
    }
    return useStore;
};
export default createUseStore;