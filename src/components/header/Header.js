import React from 'react';
import Button from '../button/Button';
import HamburguerIcon from '../icons/HamburguerIcon';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { click } 
from '../../state/reducers/sidebarSlice'
import UdespeakLogo from '../icons/UdespeakLogo';
import Searchbar from '../searchbarx/Searchbarx';
import UserDropDown from '../userdropdown/UserDropdown';
import NotifDropdown from '../notifdropdown/NotifDropdown';
//import useSearch from '../../hooks/useSearch';
import { useDashboard } from '../../context/dashboard-context';


export default function Header() {
    const dispatch = useDispatch();
    const sidebarState = useSelector((state) => state.sidebar.isOpen);
    const user = useSelector((state) => state.user);
    //const { search, handleSearch } = useSearch();
    const { searchAction } = useDashboard();
    
    const handleSearch = (event) => {
        if(searchAction.function !== undefined && searchAction.function !== null)searchAction.function(event.target.value);
    }
    
    return (
        <div className='header d-flex'>
            <div className='udespeak-logo'>
                <UdespeakLogo />
            </div>
            
            <Button
                type={'primary'}
                active={sidebarState}
                className='me-3'
                onClick={() => dispatch(click())}
            >
                <HamburguerIcon />
            </Button>

            <Searchbar onChange={handleSearch}/>
            <NotifDropdown/>
            <UserDropDown xWPos={-172} user={user}/>
        </div>
    )
}
