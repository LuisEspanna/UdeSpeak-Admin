import React from 'react'
import './button.scss';
import PropTypes from 'prop-types';

export default function Button({className, title, onClick, children, active, type}) {
  return (
    <button
        className={`button-${type} ${className ? className : ''} ${active ? `button-${type}-active` : ''}`}
        onClick={onClick}
    >
        {
            children ? children : <div className='title'>{title}</div>
        }
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired
};