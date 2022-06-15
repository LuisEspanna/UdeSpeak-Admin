import React from 'react'
import Button from '../button/Button'
import SearchIcon from '../icons/SearchIcon'
import SettingsIcon from '../icons/SettingsIcon'
import './searchBar.scss'

export default function SearchBar() {
  return (
    <div className='search-bar'>

        <SearchIcon className='search-icon'/>

        <input type='text' className='input-text me-auto' placeholder='Search'/>
        <Button className='mx-2'>
            <SettingsIcon className='icon'/>
        </Button>
    </div>
  )
}
