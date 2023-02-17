import useSWR, { useSWRConfig } from 'swr';
import getList from '../api/list';
const useList = () => {
    debugger
    const { data, isLoading, error, mutate } = useSWR('/list', getList, {
        dedupingInterval: 1000000
    });
    return {
        data,
        isLoading,
        isError: error,
        getList: mutate
    }
};
const useGetList = () => {
    const { mutate } = useSWRConfig();
    return {
        getList: () => mutate('/list')
    }
};
export { useGetList };
export default useList;