import React, { useState, useEffect } from 'react';
import { getHour } from '../../../../../functions';
import HeaderIcons from './HeaderIcons';
import defaultImage from '../../../../../assets/images/image.png';
import SoundIconPlay from '../../../../../components/icons/SoundIcon';
import SoundIconPause from '../../../../../components/icons/SoundIconPause';

export default function PreviewSpeaking({ image, question, sound, isPlaying, handlePlaying }) {
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
                <div className='phone-sound-icon'>
                    {
                        isPlaying ? <SoundIconPause onClick={handlePlaying} /> : <SoundIconPlay onClick={handlePlaying} />
                    }
                </div>
                {
                    sound && isPlaying && ((typeof (sound) === 'object') ?
                        <audio controls="controls" className='hidden-audio-reproductor' autoPlay>
                            <source src={URL.createObjectURL(sound)} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio> :
                        <audio controls="controls" className='hidden-audio-reproductor' autoPlay>
                            <source src={sound} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>)
                }

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
            </div>
        </div>
    )
}
