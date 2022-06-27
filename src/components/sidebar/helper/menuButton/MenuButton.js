import React from 'react'
import './menu-button.scss';

export default function MenuButton({label, icon}) {
  return (
    <button className='menuButton'>
        <div className='icon'>{icon}</div>
        <div className='label'>{label}</div>
    </button>
  )
}
