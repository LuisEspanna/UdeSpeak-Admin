import React from 'react'
import './button.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {"danger" | "primary"} MetricFormat
 */

/**
 * @param {object} param0
 * @param {string} param0.className
 * @param {string} param0.title
 * @param {function} param0.onClick
 * @param {node} param0.children
 * @param {boolean} param0.active
 * @param {MetricFormat} param0.type
 * @param {object} param0.style
 * @returns 
 */

export default function Button({className, title, onClick, children, active, type, style}) {
  return (
    <button
        style={style}
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