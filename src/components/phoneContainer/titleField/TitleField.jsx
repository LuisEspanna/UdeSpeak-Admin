import React from 'react';
import './styles.scss';

/**
 * @param {object} param0
 * @param {string} param0.placeholder
 * @param {string} param0.className
 * @param {function} param0.onChange
 * @returns 
 */

export default function TitleEditor({placeholder, className, onChange, value}) {
  return (
    <div className={`title-container ${className ? className : ''}`}>
        <p>{placeholder || 'Título'}</p>
        <textarea rows={1}  type="text"  onChange={onChange} value={value}/>
    </div>
  )
}
