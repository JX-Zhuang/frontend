import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './myReact';
// let stateIndex = 0;
// const createUseState = () => {
//   const store = [];
//   const createSetter = (index) => {
//     return function (newState) {
//       store[index][0] = newState;
//       render();
//     }
//   }
//   // let index = 0;
//   const useState = (initial) => {
//     if (store[stateIndex] === undefined) {
//       store[stateIndex] = [initial, createSetter(stateIndex)];
//     }
//     return [store[stateIndex][0], store[stateIndex++][1]];
//   };
//   return useState;
// }
// const useState = createUseState();
// let effectIndex = 0;
// const createUseEffect = () => {
//   const store = [];
//   const useEffect = (dispatch, deps) => {
//     let update = false;
//     let prevDeps = store[effectIndex];
//     if (prevDeps === undefined) {
//       update = true;
//     } else {
//       for (const i in prevDeps) {
//         if (deps[i] !== prevDeps[i]) {
//           update = true;
//           break;
//         }
//       }
//     }
//     if (update) {
//       dispatch();
//     }
//     store[effectIndex++] = deps;
//   };
//   return useEffect;
// };
// const useEffect = createUseEffect();
// const App = () => {
//   const [i, setI] = useState(0);
//   const [j, setJ] = useState(1);
//   useEffect(() => {
//     console.log('mount');
//   }, []);
//   useEffect(() => {
//     console.log('effect')
//     setI(j + 1);
//   }, [j]);
//   return <div>
//     <button onClick={() => setI(i + 1)}>i:{i}</button>
//     <br />
//     <button onClick={() => setJ(j + 1)}>j:{j}</button>
//   </div>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);