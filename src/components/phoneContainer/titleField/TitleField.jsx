import React from 'react';
import './styles.scss';

/**
 * @param {object} param0
 * @param {string} param0.placeholder
 * @param {string} param0.name
 * @param {string} param0.className
 * @param {function} param0.onChange
 * @returns 
 */

export default function TitleEditor({placeholder, className, onChange, value, name}) {
  return (
    <div className={`title-container ${className ? className : ''}`}>
        <p className='label'>{placeholder || 'Título'}</p>
        <textarea rows={1}  type="text"  onChange={onChange} value={value} name={name}/>
    </div>
  )
}
