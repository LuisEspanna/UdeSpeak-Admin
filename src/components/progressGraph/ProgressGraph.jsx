import React from 'react';
import './styles.scss';

/**
 * 
 * @param {object} param0 
 * @param {string} param0.labelLeft
 * @param {string} param0.labelRight
 * @param {number} param0.value
 * @returns 
 */
export default function ProgressGraph({labelLeft, labelRight, value}) {
  return (
    <div className='progress-graph-container'>
        <div className='labels-area'>
            <span>{labelLeft}</span>
            <span>{labelRight}</span>
        </div>
        <div className='graph-bg'>
            <div className='indicator' style={{width: `${value*100}%`}}></div>
        </div>
    </div>
  )
}
