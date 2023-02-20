### 需求
* 一个页面，多个组件用到同一个接口，每个组件分别请求该接口，浪费请求。如何缓存数据。
* 数据缓存后，如果重新请求数据，通知组件重新渲染。
* 期望提供一种机制，可以请求数据，缓存数据，手动请求数据，尽量解耦。
* 老代码怎么办，如何更新老代码。
* 数据流向：api->store->component
#### 使用context
* 会导致子组件渲染，需要用React.memo优化
#### swr
* swr能满足大部分的需求，而且自动返回请求函数的状态，但是有下面的问题。
* 深度绑定React。
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