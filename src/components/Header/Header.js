import React from 'react'
import Button from '../Button/Button'
import HamburguerIcon from '../icons/HamburguerIcon'
import './header.scss'

export default function Header() {
  return (
    <div className='header d-flex'>
        <Button className='me-3'>
            <HamburguerIcon/>
        </Button>
        <Button className='me-auto'>
            <HamburguerIcon/>
        </Button>
        <Button className='mx-3'>
            <HamburguerIcon/>
        </Button>
        <Button className=''>
            <HamburguerIcon/>
        </Button>
    </div>
  )
}
