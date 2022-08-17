import React from 'react';
import './menu-button.scss';
import { useNavigate } from 'react-router-dom';

export default function MenuButton({label, icon, route}) {

  let navigate = useNavigate();

  function handleClick() {
    console.log(route)
    if(route)
      navigate(route, {replace: true});
  }

  return (
    <button className='menuButton' onClick={handleClick}>
        <div className='icon'>{icon}</div>
        <div className='label'>{label}</div>
    </button>
  )
}
