import React, { useState, useEffect } from 'react';
import getList from '../../api/list';
import useList from '../../hooks/useList';

const List = props => {
    const { data, isLoading } = useList();
    if (isLoading) return 'loading';
    return <ul>
        {data.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
};
export default List;