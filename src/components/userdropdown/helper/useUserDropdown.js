import { useState, useEffect } from 'react'
import useGoogleLogin from '../../../hooks/useGoogleLogin'

export default function useUserDropdown(user) {

    const [show, setShow] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const {logout} = useGoogleLogin()

    useEffect(() => {
        if(user?.displayName) setDisplayName(user.displayName.split(" ")[0] + " " + user.displayName.split(" ")[1]);
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
