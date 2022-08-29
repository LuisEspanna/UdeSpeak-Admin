

import { useDispatch, useSelector } from 'react-redux';
import { goNext, goPrev, addNavigation, clear } from '../state/reducers/navigationSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export default function useMyNavigation() {
    const { index, routes } = useSelector((state) => state.navigation);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNext = () => {
        dispatch(goNext());
        navigate(routes[index+1], {replace: true});
    }

    const handlePrevius = () => {
        dispatch(goPrev());
        navigate(routes[index-1], {replace: true});
    }

    const navigateTo = (route) => {
        if(route !== `/${ROUTES.DASHBOARD}`)
            dispatch(addNavigation(route));
        else {
            dispatch(clear());
        }
        navigate(route);
    }

    return {
        handleNext,
        handlePrevius,
        navigateTo,
        index, 
        routes
    }
}
