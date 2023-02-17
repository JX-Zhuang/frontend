import React, { useState } from 'react';
import getList from '../api/list';
const DataContext = React.createContext();
const useDataContext = () => {
    const [list, setList] = useState([]);
    const [flag,setFlag]  = useState(false);
    return {
        getList:()=>{
            if(flag) return list;
            getList().then()
        }
    }
};
export default DataContext;
export useDataContext;