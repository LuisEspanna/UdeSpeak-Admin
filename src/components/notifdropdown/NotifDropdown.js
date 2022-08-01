import React, { useState, useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import Button from '../button/Button';
import NotificationIcon from '../icons/NotificationIcon';
import './notifDropdown.scss';

export default function NotifDropdown({ className, xWPos, yWpos }) {
    const [show, setShow] = useState(false)
    const ref = useRef();

    useOnClickOutside(ref, () => setShow(false));

    const handleClick = () => {
        setShow(false);
    };

    return (
        <div
            ref={ref}
            className={`notif-dropdown ${className}`}
        >
            <Button onClick={handleClick} type={'primary'}>
                <NotificationIcon/>
            </Button>
        {
            show &&
            <div className='dropdown-window' style={{ left: xWPos, top: yWpos }}>
                <button>Notificaciones</button>
            </div>
        }
        </div>
    )
}
