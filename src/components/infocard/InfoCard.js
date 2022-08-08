import React from 'react';
import './styles.scss';

const InfoCard = ({title, description, type}) => {
  return (
    <div
        className={`info-card-${type}`}
    >
        <div>
          <span className='dot2'/>
          <span className='dot1'/>
        </div>

        <div className='p-4 text-align-center'>
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