import React from 'react'
import Button from '../button/Button'
import SearchIcon from '../icons/SearchIcon'
import SettingsIcon from '../icons/SettingsIcon'
import './searchbar.scss'

export default function Searchbar({className}) {
  return (
    <div className={`search-bar ${className ? className : ''}`}>

        <SearchIcon className='search-icon'/> 

        <input type='text' className='input-text me-auto' placeholder='Search'/>
        <Button className='mx-2'>
            <SettingsIcon className='icon'/>
        </Button>
    </div>
  )
}
