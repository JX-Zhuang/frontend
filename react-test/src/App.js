import { useEffect, useState } from 'react';
import List from './components/List';
import useList, { useGetList } from './hooks/useList';
function App() {
  const [show, setShow] = useState(false);
  const { getList } = useGetList();

  return (
    <div className="App">
      <List />
      {show && <List />}
      <button onClick={() => setShow(!show)}>trigger show list</button>
      <button onClick={() => getList()}>force update</button>
      {/* <List list={state.score} />
      <List list={state.users} />
      <List list={state.flows} /> */}
    </div>
  );
}

export default App;
