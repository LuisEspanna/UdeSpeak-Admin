import React from 'react'
import './sidebar.scss'
import menuContent from '../../config/menu'
import MenuButton from './helper/menuButton/MenuButton'

export default function Sidebar({className, isOpen}) {
  const menu = menuContent();
  return (
    <nav className={`sidebar ${className ? className : ''} sidebar${isOpen ? '-open' : '-close'}`}>
      <div className='content-sidebar'>
      {
        menu.map((item, i) =>  
          <div key={i}>
            <span className='title ms-3'>{item.title}</span>
            {
              item.children.map((btn, j) => 
                <MenuButton key={`${j}${i}`} icon={btn.icon} label={btn.title}/>
              )
            }
          </div>
        )
      }
      </div>
    </nav>
  )
}
