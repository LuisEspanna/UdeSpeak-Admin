import React from 'react'
import './sidebar.scss'
import menuContent from '../../config/menu'
import MenuButton from './helper/menuButton/MenuButton'
import usePermissions from '../../hooks/usePermissions'

export default function Sidebar({className, isOpen}) {
  const menu = menuContent();
  const { user } = usePermissions();

  return (
    <nav className={`sidebar ${className ? className : ''} sidebar${isOpen ? '-open' : '-close'}`}>
      <div className='content-sidebar'>
      {
        menu.map((item, i) =>  
          item.permissions.includes(user.permission) &&
          <div key={i}>
            <span className='title ms-3'>{item.title}</span>
            {
              item.children.map((btn, j) => 
                btn.permissions.includes(user.permission) &&
                <MenuButton key={`${j}${i}`} icon={btn.icon} label={btn.title} route={btn.url}/>
              )
            }
          </div>        
        )
      }
      </div>
    </nav>
  )
}
