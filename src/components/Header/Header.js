import React from 'react'
import Button from '../Button/Button'
import HamburguerIcon from '../icons/HamburguerIcon'
import './header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { click } 
from '../../state/reducers/sidebarSlice'

export default function Header() {
    const dispatch = useDispatch()
    const sidebarState = useSelector((state) => state.sidebar.isOpen)
    
    return (
        <div className='header d-flex'>
            <Button
                active = {sidebarState}
                className='me-3' 
                onClick={() => dispatch(click())}
            >
                <HamburguerIcon />
            </Button>
            <Button className='me-auto'>
                <HamburguerIcon />
            </Button>
            <Button className='mx-3'>
                <HamburguerIcon />
            </Button>
            <Button className=''>
                <HamburguerIcon />
            </Button>
        </div>
    )
}
