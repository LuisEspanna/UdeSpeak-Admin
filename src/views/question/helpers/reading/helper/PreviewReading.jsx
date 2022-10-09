import React, { useState, useEffect } from 'react';
import { getHour } from '../../../../../functions';
import HeaderIcons from './HeaderIcons';
import defaultImage from '../../../../../assets/images/image.png';
import NextIcon from '../../../../../components/icons/NextIcon';

export default function PreviewSpeaking({ image, question }) {
    const [state, setState] = useState(question);

    useEffect(() => {
        setState(question);
    }, [question]);


    return (
        <div className='phone-preview'>
            <div className='phone-header'>
                <div>{getHour()}</div>
                <HeaderIcons />
            </div>
            <div className='phone-container'>
                <div className='phone-question-index'>Question 1</div>
                
                
                <div className='phone-title'>{state?.title}</div>
                {
                    image && ((typeof (image) === 'object') ?
                        <img src={URL.createObjectURL(image)} id="output" alt='' /> :
                        <img src={image || defaultImage} alt='' />)
                }
                <div className='phone-description'>{state?.description}</div>

                <div className='my-4'>
                    {
                        state?.options && state.options.map((o, i) =>
                            <div className='option' key={i}>
                                <span className='option-letter'>{`${o?.letter})`}</span><span>{`${o?.description}`}</span>
                            </div>)
                    }
                </div>
                <div className='d-flex justify-content-end cursor-pointer'>
                    <NextIcon/>
                </div>
            </div>
        </div>
    )
}
