import React, { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import GearIcon from '../icons/GearIcon';
import './userDropdown.scss';
import Button from '../button/Button';
import LogoutIcon from '../icons/LogoutIcon';
import useUserDropdown from './helper/useUserDropdown';
import UserIcon from '../icons/UserIcon';
import Avatar from '../avatar/Avatar';


function UserDropDown({ className, xWPos, yWpos, user }) {
    const ref = useRef()
    const {show, displayName, setShow, handleShow, handleLogout} = useUserDropdown(user);
    useOnClickOutside(ref, () => setShow(false));

    return (
        <div
            ref={ref}
            className={`user-dropdown ${className} ${show ? 'user-dropdown-active' : ''} `}
        >
            <div className='cover' onClick={handleShow}/>
            <Avatar photoURL={user.photoURL}/>
            <GearIcon/>
        {
            show &&
            <div className='dropdown-window' style={{ left: xWPos, top: yWpos }}>
                <p className='title'><b>Buenos días, </b> {displayName} </p>
                <Button
                   type={'primary'}
                >
                    <GearIcon/>
                    Ajustes de cuenta
                </Button>
                <Button
                   type={'primary'}
                >
                    <UserIcon/>
                    Perfil social
                </Button>
                <Button                    
                    type={'primary'}
                    onClick={handleLogout}
                >
                    <LogoutIcon/>
                    Cerrar sesión
                </Button>
            </div>
        }
        </div>
    )
}

UserDropDown.defaultProps = {
    left: '-50px'
};

export default UserDropDown;