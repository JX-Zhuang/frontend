import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './myReact';
import reportWebVitals from './reportWebVitals';


const store = [];
let index = 0;
const useState = (initial) => {
  const currentIndex = index;
  if (store[index] === undefined) {
    store[index] = [initial, (state) => {
      store[currentIndex][0] = state;
      index = 0;
      root.render(<App />);
    }];
  }
  return [store[index][0], store[index++][1]];
};
const App = () => {
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  useEffect(() => {
    setI(j + 1);
  }, [j]);
  return <div>
    <button onClick={() => setI(i + 1)}>i:{i}</button>
    <br />
    <button onClick={() => setJ(j + 1)}>j:{j}</button>
  </div>
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
