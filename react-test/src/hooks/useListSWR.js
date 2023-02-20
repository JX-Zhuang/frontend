import useSWR, { useSWRConfig } from 'swr';
import getList from '../api/list';
const useList = ({ id } = { id: 1 }) => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(['/list', id], () => getList(id), {
        dedupingInterval: 1000000
    });
    return {
        data,
        isLoading,
        error,
        getList: mutate,
        isValidating
    }
};
const useGetList = () => {
    const { mutate } = useSWRConfig();
    return {
        getList: ({ id } = { id: 1 }) => mutate(['/list', id])
    }
};
export { useGetList };
export default useList;