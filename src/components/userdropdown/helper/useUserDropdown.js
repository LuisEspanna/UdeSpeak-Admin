import { useState, useEffect } from 'react';
import useGoogleLogin from '../../../hooks/useGoogleLogin';
import { getDisplayName } from '../../../functions';
import useMyNavigation from '../../../hooks/useMyNavigation';

export default function useUserDropdown(user) {

    const [show, setShow] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const {logout} = useGoogleLogin()
    const { navigateTo } = useMyNavigation()

    useEffect(() => {
        if(user?.displayName) setDisplayName(getDisplayName(user.displayName));
    }, [user?.displayName])
    

    const handleShow = () => {
        setShow(!show);
    };

    const handleLogout = () => {
        logout();
    };

    function handleNavigate(route) {
        navigateTo(route);
    }

    return {
        show,
        displayName,
        handleShow,
        handleLogout,
        setShow,
        handleNavigate
    }
}
