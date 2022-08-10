import { useSelector, useDispatch } from 'react-redux';
import { setText } from '../state/reducers/searchSlice';

export default function useSearch() {

    const search = useSelector((state) => state.search.text);
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        dispatch(setText(event.target.value));
    }

    return {
        search,
        handleSearch
    }
}
