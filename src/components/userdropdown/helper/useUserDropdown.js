import { useState, useEffect } from 'react';
import useGoogleLogin from '../../../hooks/useGoogleLogin';
import { getDisplayName } from '../../../functions';

export default function useUserDropdown(user) {

    const [show, setShow] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const {logout} = useGoogleLogin()

    useEffect(() => {
        if(user?.displayName) setDisplayName(getDisplayName(user.displayName));
    }, [user?.displayName])
    

    const handleShow = () => {
        setShow(!show);
    };

    const handleLogout = () => {
        logout();
    };

    return {
        show,
        displayName,
        handleShow,
        handleLogout,
        setShow
    }
}
