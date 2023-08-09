## react版本主要对比
### [React 17](https://legacy.reactjs.org/blog/2020/10/20/react-v17.html)
* 事件委托在根组件上，不委托在document上。在React 16里，如果用`document.body.addEventListener('click', ...)`，在组件里无法用`e.stopPropagation()`停止冒泡。因为原生事件在react之前触发。
* 新的JSX转化。
### [React 18](https://legacy.reactjs.org/blog/2022/03/29/react-v18.html)
* [自动批处理](https://github.com/reactwg/react-18/discussions/21)。
    * react17里只有在浏览器事件（click）里会有批处理，在 `promises`、`setTimeout`, `native event`里是不会批处理的。
    * react18里使用`ReactDOM.createRoot`会自动批处理（包括`promises`、`setTimeout`, `native event`)，`ReactDOM.render`保持之前的行为。如果不用批处理，使用`ReactDOM.flushSync`。
* Transitions，并发执行，用于区分紧急更新和非紧急更新。用于非紧急的更新。
    * useTransition
    * startTransition
* Suspense服务端渲染
* 新hooks
    * [useId](https://react.dev/reference/react/useId)：生成唯一的id
    * [useTransition](https://react.dev/reference/react/useTransition)
    * [useDeferredValue](https://react.dev/reference/react/useDeferredValue)：延迟渲染
    * [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)：可以传入外部的store
    * [useInsertionEffect](https://react.dev/reference/react/useInsertionEffect)：用于JS库作者中的CSS。除非你正在JS库中处理CSS，并且需要一个注入样式的地方，否则你可能需要useEffect或useLayoutEffect。
## 实现react hooks
### useState
### useEffect
## 需求
* 一个页面，多个组件用到同一个接口，每个组件分别请求该接口，浪费请求。如何缓存数据。
* 数据缓存后，如果重新请求数据，通知组件重新渲染。
* 期望提供一种机制，可以请求数据，缓存数据，手动请求数据，尽量解耦。
* 老代码怎么办，如何更新老代码。
* 数据流向：api->store->component
#### 使用context
* 会导致子组件渲染，需要用React.memo优化
#### 使用hooks
* 需要有改变全局的hook函数，多个地方使用state，setState后每个使用state的地方都要更新
#### swr
* swr能满足大部分的需求，而且自动返回请求函数的状态，但是有下面的问题。
* 深度绑定React。
* 只能用hooks，不支持class组件
* 需要维护key。
* 如果渲染数据和刷新数据是在两个不同的组件里。期望在渲染数据的组件里挂载后请求数据（如异步组件）。需要单独提供一个刷新的方法，代码如下。如果`Button`里使用`useData`里的`mutate`，那么会在`Button`里请求数据。
``` javascript
const Data = React.lazy(()=>import('Data'));
const App = ()=>{
    return <div>
    <Button />
    <Suspense fallback={<div>loading...</div>}>
        <Data />
    </Suspense>
    </div>
}
//渲染数据组件
const Data = ()=>{
    const {data} = useData();
    return <div>{data}</div>
};
//更新数据的按钮
const Button = ()=>{
    const {fetch} = useFetchData();
    return <div onClick={fetch}>刷新</div>
};
const useData = () => {
    const { data, isLoading, error, mutate } = useSWR('/data', fetchData);
    return {
        data,
        isLoading,
        isError: error,
        mutate
    }
};
//或者是用swr提供的mutate直接更新
const useFetchData = () => {
    const { mutate } = useSWRConfig();
    return {
        fetch: () => mutate('/data')
    }
};
```
#### 自研
* 核心代码在`react-test/src/store`
* `createUseStore`创建hook
* 如果要支持类组件，需要自己扩展一个高阶组件，类似`createUseStore`