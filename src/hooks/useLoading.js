

import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../state/reducers/loadingSlice';

export default function useLoading() {
    const { isLoading } = useSelector((state) => state.loading.isLoading);
    const dispatch = useDispatch();

    /**
     * 
     * @param {boolean} loading 
     */
    const setLoading = (loading) => {
        dispatch(setIsLoading(loading));
    }

    return {
        isLoading,
        setLoading,
    }
}
