import React from 'react'
import Button from '../button/Button'
import HamburguerIcon from '../icons/HamburguerIcon'
import './header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { click } 
from '../../state/reducers/sidebarSlice'
import UdespeakLogo from '../icons/UdespeakLogo'
import Searchbar from '../searchbarx/Searchbarx'

export default function Header() {
    const dispatch = useDispatch()
    const sidebarState = useSelector((state) => state.sidebar.isOpen)
    
    return (
        <div className='header d-flex'>
            <div className='udespeak-logo'>
                <UdespeakLogo />
            </div>
            
            <Button
                active={sidebarState}
                className='me-3'
                onClick={() => dispatch(click())}
            >
                <HamburguerIcon />
            </Button>

            <Searchbar/>
        </div>
    )
}
