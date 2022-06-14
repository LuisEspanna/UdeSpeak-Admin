import React from 'react'
import './button.scss';

export default function Button({className, value, onClick, children, active}) {
  return (
    <button
        className={`button-primary ${className ? className : ''} ${active ? 'button-primary-active' : ''}`}
        onClick={onClick}
    >
        {
            children ? children : value
        }
    </button>
  )
}
