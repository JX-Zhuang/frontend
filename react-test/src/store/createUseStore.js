import { useCallback, useEffect, useRef, useState } from 'react';
import getList from '../api/list';
import CreateStore from './CreateStore';
const createUseStore = (fetch) => {
    const store = new CreateStore(fetch);
    const useStore = (props = {}) => {
        const [state, setSate] = useState(() => store.getState(props.initParams));
        useEffect(() => {
            const { unsubscribe } = store.init(setSate);
            return () => {
                unsubscribe();
            }
        }, []);
        return state;
    }
    return useStore;
};
export default createUseStore;