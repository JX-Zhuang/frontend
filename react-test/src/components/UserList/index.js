// import React, { useEffect, useState, Suspense } from 'react';
// import useList from '../../hooks/useList';
// import CreateUserList from '../CreateUserList';
// function UserList() {
//     return <CreateUserList name="UseList" hook={useList} />;
// }
// export default UserList;
import React, { useEffect, useState, Suspense } from 'react';
import useList from '../../hooks/useList';
let id = 0;
const List = () => {
    const state = useList({
        initParams: id
    });
    const { data, error, isLoading, isValidating } = state;
    console.log(state, data, error, isLoading, isValidating);
    return isLoading ? 'loading' : error ? <div>{error}</div> : <ul>
        {data.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
}

function UserList() {
    const [show, setShow] = useState(true);
    const { mutate } = useList();
    return (
        <div>
            <h2>UserList</h2>
            {show && <List />}
            <button onClick={() => setShow(!show)}>click</button>
            <button onClick={() => mutate(++id)}>force update</button>
        </div>
    );
}
export default UserList;
