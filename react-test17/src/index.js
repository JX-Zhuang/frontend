import React from 'react';
import ReactDOM from 'react-dom';
let id = -1;
const states = [];
const useState = (defaultValue) => {
    id++;
    const callId = id;
    if (!states[callId]) {
        const update = (value) => {
            states[callId][0] = value;
            render();
        }
        states[callId] = [defaultValue, update];
    }
    return states[callId];
}
const App = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(1);
    return (
        <div>
            <button
                onClick={() => {
                    setCount1(count1 + 1);
                }}
            >
                {`count1 is ${count1}`}
            </button>
            <button
                onClick={() => {
                    setCount2(count2 + 1);
                }}
            >
                {`count2 is ${count2}`}
            </button>
        </div>

    );
};
const root = document.getElementById('root');
const render = () => {
    id = -1;
    ReactDOM.render(<App />, root);
}
render();


