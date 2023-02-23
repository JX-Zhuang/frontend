import { useEffect, useState } from 'react';
import list from '../modals/list';
const List = () => {
    const [data, setData] = useState([]);
    const getList = () => {
        list.subscribe(data => setData(data));
    };
    useEffect(() => {
        getList();
    }, []);
    return <div>
        <ul>
            {data.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
    </div>;
}
const Test = () => {
    const [data, setData] = useState([]);
    const getList = () => {
        list.getList();
    };
    return <div>
        {/* <ul>
            {data.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul> */}
        <List />
        <button onClick={() => getList()}>click</button>
    </div>;
};
export default Test;