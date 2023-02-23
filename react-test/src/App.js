import React, { useEffect, useState, Suspense } from 'react';
import CardList from './components/CardList';
import UserList from './components/UserList';
import UserListSWR from './components/UserListSWR';
import useList from './hooks/useList';
import Test from './RxTest/components';
function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      <Test />
      {/* <UserList /> */}
      {/* {show && <UserList />} */}
      {/* <button onClick={() => setShow(!show)}>click</button> */}
      {/* <CardList /> */}
      {/* <UserListSWR /> */}
      {/* <UserListSWR /> */}
    </div>
  );
}

export default App;
