import React, { useLayoutEffect, useState } from 'react';
const states = [];
let id = -1;
const useMyState = (defaultValue) => {
  
}
// React 18 之前
const App = () => {
  // useLayoutEffect(() => {
  //   let start = Date.now();
  //   while (Date.now() - start < 5000);
  //   console.log('useLayoutEffect', start);
  // })
  // console.log('after');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(1);
  return (
    <button
      onClick={() => {
        setCount1(count1 + 1);
        setCount2(count2 + 1);
      }}
    >
      {`count1 is ${count1}, count2 is ${count2}`}
    </button>
  );
};

export default App;