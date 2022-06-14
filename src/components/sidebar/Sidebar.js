import React from 'react'
import './sidebar.scss'


export default function Sidebar({className, isOpen}) {
  return (
    <nav className={`sidebar ${className ? className : ''} sidebar${isOpen ? '-open' : '-close'}`}>

    </nav>
  )
}
