import React from 'react';
import './menu-button.scss';
import useMyNavigation from '../../../../hooks/useMyNavigation';

export default function MenuButton({label, icon, route}) {

  let { navigateTo } = useMyNavigation();

  function handleClick() {
    if(route)
      navigateTo(route);
  }

  return (
    <button className='menuButton' onClick={handleClick}>
        <div className='icon'>{icon}</div>
        <div className='label'>{label}</div>
    </button>
  )
}
