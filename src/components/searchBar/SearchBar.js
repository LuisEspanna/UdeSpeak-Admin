import React, { useState } from 'react'
import Button from '../button/Button'
import SearchIcon from '../icons/SearchIcon'
import SettingsIcon from '../icons/SettingsIcon'
import CloseIcon from '../icons/CloseIcon'
import './searchbar.scss'

export default function Searchbar({className}) {
  const [active, setActive] = useState(false)

  return (
    <>
      <Button
          className='button-primary header-search-btn'
          active={active}
          onClick={() => setActive(!active)}
        >
          <SearchIcon className='icon' />
      </Button>
      <div className={`search-bar-desktop  ${className ? className : ''}`}>
        <SearchIcon className='search-icon' />
        <input type='text' className='input-text me-auto' placeholder='Search' />
        <Button className='mx-2'>
          <SettingsIcon className='icon' />
        </Button>
      </div>
      {
        active &&
        <div className='win-searchbar'>
          <div className='search-bar'>
            <SearchIcon className='search-icon' />
            <input type='text' className='input-text me-auto' placeholder='Search' />
            <Button className='mx-2'>
              <SettingsIcon className='icon' />
            </Button>
            <Button
              className='button-danger me-2'
              onClick={() => setActive(false)}
            >
              <CloseIcon/>
            </Button>
          </div>
        </div>
      }
    </>
  )
}