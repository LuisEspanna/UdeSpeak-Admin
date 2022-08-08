import React from 'react';
import './styles.scss';

const InfoCard = ({title, description, type, onClick}) => {
  return (
    <div
        className={`info-card-${type}`}
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