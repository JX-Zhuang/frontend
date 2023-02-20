import React, { useEffect, useState, Suspense } from 'react';
import CardList from './components/CardList';
import UserList from './components/UserList';
import UserListSWR from './components/UserListSWR';
import useList from './hooks/useList';
function App() {
  return (
    <div className="App">
      <UserList />
      {/* <UserList /> */}
      {/* <CardList /> */}
      {/* <UserListSWR /> */}
      {/* <UserListSWR /> */}
    </div>
  );
}

export default App;
