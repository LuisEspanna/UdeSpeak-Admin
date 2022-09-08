import React from 'react';
import { getHour } from '../../../../../functions';
import HeaderIcons from './HeaderIcons';
import defaultImage from '../../../../../assets/images/image.png';
import MicrophoneIcon from '../../../../../components/icons/MicrophoneIcon'

export default function PreviewSpeaking({ image, question }) {
    return (
        <div className='phone-preview'>
            <div className='phone-header'>
                <div>{getHour()}</div>
                <HeaderIcons />
            </div>
            <div className='phone-container'>
                <div className='phone-question-index'>Question 5</div>
                <div className='phone-title'>{question?.title}</div>
                {
                    image && typeof (image) === 'object' ?
                        <img src={URL.createObjectURL(image)} id="output" alt='' /> :
                        <img src={image || defaultImage} alt='' />
                }
                <div className='phone-description'>{question?.description}</div>
            </div>
            <div className='phone-microphone'>
                <MicrophoneIcon />
            </div>
        </div>
    )
}
