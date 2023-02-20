import React, { useEffect, useState, Suspense } from 'react';
function CreateUserList({ hook, name }) {
  const [show, setShow] = useState(false);
  const state = hook();
  const { data, error, isLoading, mutate, isValidating } = state;
  console.log(state, data, error, isLoading, isValidating);
  return (
    <div>
      <h2>{name}</h2>
      {isLoading ? 'loading' : error ? <div>{error}</div> : <ul>
        {data.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>}
      <button onClick={() => mutate()}>force update</button>
    </div>
  );
}
export default CreateUserList;
