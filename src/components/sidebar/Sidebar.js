import React from 'react'
import './sidebar.scss'
import menu from '../../config/menu.json'
import MenuButton from './helper/menuButton/MenuButton'

export default function Sidebar({className, isOpen}) {
  return (
    <nav className={`sidebar ${className ? className : ''} sidebar${isOpen ? '-open' : '-close'}`}>
      {
        menu.map((item, i) =>  
          <div key={i}>
            <span>{item.title}</span>
            {
              item.children.map((btn, j) => 
                <MenuButton key={`${j}${i}`} icon={btn.title}/>
              )
            }
          </div>
        )
      }
    </nav>
  )
}
