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

    const getOptions = (word) => {
        let options = [];
        if(state?.questions){
            state?.questions?.forEach((q) => {
                if(q.title === word.replace('@', '')){
                    options = q.options;
                }
            });
        }
        return options;
    }

    return (
        <div className='phone-preview'>
            <div className='phone-header'>
                <div>{getHour()}</div>
                <HeaderIcons />
            </div>
            <div className='phone-container'>

                <div className='phone-title'>{state?.title}</div>
                {
                    image && ((typeof (image) === 'object') ?
                        <img src={URL.createObjectURL(image)} id="output" alt='' /> :
                        <img src={image || defaultImage} alt='' />)
                }
                <div className='phone-description'>
                    {
                        state?.description && state?.description?.split(' ').map((word, i) => {
                            if (word.includes('@')) {
                                return (
                                    <select key={i} className="form-select me-2" aria-label="Default select example">
                                    {   
                                        getOptions(word).map( (opt, j) =>
                                        <option key={j}>
                                            {opt?.description}
                                        </option> )              
                                    }
                                    </select>
                                );                                
                            } else {
                                return <div key={i} className='me-2'>{word}</div>
                            }
                        })
                    }
                </div>

                <div className='my-4'>
                    {
                        state?.questions && state.questions.filter(q => q.type === 'question').map((q, i) =>
                            <div className='mb-4' key={i}>
                                {q.title}
                                <div className='my-2'>
                                    {
                                        q?.options && q.options.map((o, j) =>
                                            <div className='option' key={j}>
                                                <span className='option-letter'>{o.letter}</span>
                                                {o.description}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>)
                    }
                </div>
            </div>
            <div className='d-flex justify-content-end cursor-pointer me-4'>
                <NextIcon />
            </div>
        </div>
    )
}
