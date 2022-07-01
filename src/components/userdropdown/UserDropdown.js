import React, { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import GearIcon from '../icons/GearIcon';
import './userDropdown.scss';
import Button from '../button/Button';
import LogoutIcon from '../icons/LogoutIcon';
import useUserDropdown from './helper/useUserDropdown';
import UserIcon from '../icons/UserIcon';
import userImg from '../../assets/images/userImg.png';


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
            <div className='avatar'>
                <img 
                    src={user.photoURL !== 'null' ? user.photoURL : userImg}
                    referrerPolicy="no-referrer" alt=''
                />
            </div>
            <GearIcon/>
        {
            show &&
            <div className='dropdown-window' style={{ left: xWPos, top: yWpos }}>
                <p className='title'><b>Buenos días, </b> {displayName} </p>
                <Button
                   
                >
                    <GearIcon/>
                    Ajustes de cuenta
                </Button>
                <Button
                   
                >
                    <UserIcon/>
                    Perfil social
                </Button>
                <Button
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