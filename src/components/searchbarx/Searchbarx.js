import React, { useState } from 'react'
import Button from '../button/Button'
import SearchIcon from '../icons/SearchIcon'
import SettingsIcon from '../icons/SettingsIcon'
import CloseIcon from '../icons/CloseIcon'
import './searchbarx.scss'

export default function Searchbar({className, onChange, value}) {
  const [active, setActive] = useState(false)

  return (
    <>
      <Button
          type={'primary'}
          className='header-search-btn'
          active={active}
          onClick={() => setActive(!active)}
        >
          <SearchIcon className='icon' />
      </Button>
      <div className={`search-bar-desktop mx-2 ${className ? className : ''}`}>
        <SearchIcon className='search-icon' />
        <input type='text' className='input-text me-auto' placeholder='Buscar' value={value} onChange={onChange}/>
        <Button type={'primary'} className='mx-2'>
          <SettingsIcon className='icon' />
        </Button>
      </div>
      {
        active &&
        <div className='win-searchbar'>
          <div className='search-bar'>
            <SearchIcon className='search-icon' />
            <input type='text' className='input-text me-auto' placeholder='Buscar' value={value} onChange={onChange}/>
            <Button type={'primary'} className='mx-2'>
              <SettingsIcon className='icon' />
            </Button>
            <Button
              type={'danger'}
              className='me-2'
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