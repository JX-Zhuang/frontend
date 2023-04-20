import React, { useEffect, useState, useId, useRef, useTransition, useDeferredValue, useSyncExternalStore, useLayoutEffect } from 'react';
const data = new Array(10000).fill(0).map((_, index) => index + 1);
let state = {
    count: 0
};
let listeners = [];
function emitChange() {
    for (let listener of listeners) {
        listener();
    }
}

const store = {
    add() {
        state = {
            ...state,
            count: state.count + 1
        };
        emitChange();
    },
    subscribe(listener) {
        listeners = [...listeners, listener];
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    },
    getSnapshot() {
        return state;
    }
}
const TestTransition = () => {
    const [value, setValue] = useState('');
    const [isPending, startTransition] = useTransition();
    const [list, setList] = useState([]);
    const onChange = (e) => {
        const value = e.target.value;
        setValue(value);
        startTransition(() => {
            setList(() => {
                let startTime = Date.now();
                while (Date.now() - startTime < 100) {
                    // Do nothing for 1 ms per item to emulate extremely slow code
                }
                return data.filter(item => {
                    return Number(value) % item === 0
                });
            });
        });
    }
    useEffect(() => {
        setList(data);
    }, []);
    return <div>
        <div>search:{value}</div>
        {/* {isPending && <div>loading</div>} */}
        <input value={value} onChange={onChange} />
        {list.map(i => <div key={i}>{i}</div>)}
    </div>
};
const TestNewHooks = () => {
    const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
    const id1 = useId();
    const id2 = useId();
    const [value, setValue] = useState('');
    const deferredValue = useDeferredValue(value);
    const onChange = (e) => {
        const value = e.target.value;
        setValue(value);
    };
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;
    return <div>
        <div>search:{value}</div>
        <div style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
        }}>deferredValue:{deferredValue}</div>
        <input value={value} onChange={onChange} />
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <div style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
        }}>
            {deferredQuery}
        </div>
        <div>id1:{id1}</div>
        <div>id2:{id2}</div>
        <div>state.count:{state.count}</div>
        <button onClick={() => store.add()}>click</button>
    </div>
};
const TestNewHooks2 = () => {
    const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
    return <div>
        <div>state.count:{state.count}</div>
    </div>
};
const App = () => {
    const ref = useRef(null);
    const [tooltipHeight1, setTooltipHeight1] = useState(0);
    const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet
    useLayoutEffect(() => {
        const { height } = ref.current.getBoundingClientRect();
        console.log(height)
        setTooltipHeight(height); // Re-render now that you know the real height
    }, []);

    useEffect(() => {
        const { height } = ref.current.getBoundingClientRect();
        console.log(height)
        setTooltipHeight1(height); // Re-render now that you know the real height
    }, []);


    const [state1, setState1] = useState("hello world");
    const [state2, setState2] = useState("hello world");
    useEffect(() => {
        let i = 0;
        while (i <= 100000000) {
            i++;
        };
        setState1("world hello");
    }, []);
    useLayoutEffect(() => {
        let i = 0;
        while (i <= 100000000) {
            i++;
        };
        setState2("world hello");
    }, []);
    return <div ref={ref}>
        <div>{tooltipHeight}</div>
        <div>tooltipHeight1:{tooltipHeight1}</div>
        <TestNewHooks />
        <TestNewHooks2 />
    </div>
};
export default App;