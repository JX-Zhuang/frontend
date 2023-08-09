import React, { useLayoutEffect, useState } from 'react';

// React 18 之前
const App = () => {
  console.log('App组件渲染了！');
  // useLayoutEffect(() => {
  //   let start = Date.now();
  //   while (Date.now() - start < 5000);
  //   console.log('useLayoutEffect', start);
  // })
  // console.log('after');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <button
      onClick={() => {
        Promise.resolve().then(() => {
          setCount1(count => count + 1);
          setCount2(count => {
            console.log(count)
            return count + 1;
          });
        });
      }}
    >
      {`count1 is ${count1}, count2 is ${count2}`}
    </button>
  );
};

export default App;