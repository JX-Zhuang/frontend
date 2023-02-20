import React, { useEffect, useState, Suspense } from 'react';
import useList from './hooks/useList';
// import useList from './hooks/useListSWR';
const List = React.lazy(() => import('./components/List'));
function App() {
  const [show, setShow] = useState(false);
  const { getList } = useList();
  console.log('app render');
  return (
    <div className="App">
      <Suspense fallback={<div>loading</div>}>
        <List />
      </Suspense>
      <button onClick={() => getList()}>force update</button>
    </div>
  );
}

export default App;
