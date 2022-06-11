import React from 'react'
import './button.scss';

export default function Button({className, value, onClick, children}) {
  return (
    <button
        className={`button-primary ${className ? className : ''}`}
        onClick={onClick}
    >
        {
            children ? children : value
        }
    </button>
  )
}
