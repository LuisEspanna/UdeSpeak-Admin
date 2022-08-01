import React from 'react';
import userImg from '../../assets/images/userImg.png';
import './styles.scss';


export default function Avatar({photoURL}) {
  return (
    <div className='avatar'>
        <img 
            src={photoURL !== 'null' ? photoURL : userImg}
            referrerPolicy="no-referrer" alt=''
        />
    </div>
  )
}
