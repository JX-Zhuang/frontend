import React, { useState, useEffect } from 'react';
import getList from '../../api/list';
import useList from '../../hooks/useList';
// import useList from '../../hooks/useListSWR';
const List = props => {
    const { data, error, isLoading, isValidating } = useList();
    console.log('List:', data, error, isLoading, isValidating);
    if (isLoading) return 'loading';
    return <ul>
        {data.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
};
export default List;