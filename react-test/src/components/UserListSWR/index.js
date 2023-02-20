import React, { useEffect, useState, Suspense } from 'react';
import useListSWR from '../../hooks/useListSWR';
import CreateUserList from '../CreateUserList';
function UserListSWR() {
    const [show, setShow] = useState(false);
    return <div>
        <CreateUserList name="UseListSWR" hook={useListSWR} />
        <button onClick={() => setShow(!show)}>click</button>
    </div>;
}
export default UserListSWR;
