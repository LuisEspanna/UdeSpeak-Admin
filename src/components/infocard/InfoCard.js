import React from 'react';
import './styles.scss';

/**
 * @typedef {"dark" | "primary"} MetricFormat
 */

/**
 * @param {object} param0
 * @param {MetricFormat} param0.type
 * @param {string} param0.className
 * @param {string} param0.title
 * @param {string} param0.description
 * @param {function} param0.onClick
 * @returns 
 */
const InfoCard = ({title, description, type, onClick, className}) => {
  return (
    <div
        className={`info-card-${type} ${className ? className : ''}`}
        onClick={onClick}
    >
        <div>
          <span className='dot2'/>
          <span className='dot1'/>
        </div>

        <div className='p-4 text-container'>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    </div>
  )
}

InfoCard.defaultProps = {
    title: "Title",
    description: "Description"
}

export default InfoCard;