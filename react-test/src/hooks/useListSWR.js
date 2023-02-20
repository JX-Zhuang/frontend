import useSWR, { useSWRConfig } from 'swr';
import getList from '../api/list';
const useList = () => {
    const state = useSWR('/list', (id) => getList(id), {
        dedupingInterval: 1000000
    });
    const { isLoading, error, isValidating, data, mutate } = state;
    return state;
    return {
        data,
        isLoading,
        error,
        mutate,
        isValidating
    }
};
const useGetList = () => {
    const { mutate } = useSWRConfig();
    return {
        mutate: () => mutate('/list')
    }
};
export { useGetList };
export default useList;