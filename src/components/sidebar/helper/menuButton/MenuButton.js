import React from 'react'
import './menu-button.scss';

export default function MenuButton({label, icon}) {
  return (
    <button className='menuButton'>
        <div>{icon}</div>
        <div>{label}</div>
    </button>
  )
}
