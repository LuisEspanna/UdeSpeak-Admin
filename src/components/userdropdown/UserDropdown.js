import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import useGoogleLogin from '../../hooks/useGoogleLogin';
import useOnClickOutside from '../../hooks/useOnClickOutside'
import GearIcon from '../icons/GearIcon';
import './userDropdown.scss';


function UserDropDown({ className, xWPos, yWpos, user }) {
    const [show, setShow] = useState(false)
    const ref = useRef()
    const {logout} = useGoogleLogin()
    const dispatch = useDispatch()

    useOnClickOutside(ref, () => setShow(false));

    const handleClick = () => {
        setShow(!show);
    };

    return (
        <div
            ref={ref}
            className={`user-dropdown ${className}`}
        >
            <div className='cover' onClick={handleClick}/>
            <div className='avatar'>
                <img src={user.photoURL} alt=''/>
            </div>
            <GearIcon/>
        {
            show &&
            <div className='dropdown-window' style={{ left: xWPos, top: yWpos }}>
                <button onClick={() => dispatch(logout())}>Cerrar sesión</button>
            </div>
        }
        </div>
    )
}

UserDropDown.defaultProps = {
    left: '-50px'
};

export default UserDropDown;