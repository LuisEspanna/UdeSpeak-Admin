import React from 'react';
import './styles.scss';
import TrashIcon from '../../icons/TrashIcon';
import AudioImage from '../../icons/AudioImage';
import Button from '../../button/Button';


export default function AudioField({ className, audio, onChange, name, label }) {
    return (
        <div className={`audio-field ${className ? className : ''}`}>
            <p className='label'>{label ? label : 'Audio'}</p>
            <div className='d-flex'>
                {
                    audio && ((typeof (audio) === 'object') ?
                        <audio controls="controls" className='hidden-audio-reproductor'>
                            <source src={URL.createObjectURL(audio)} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio> :
                        <audio controls="controls" className='hidden-audio-reproductor'>
                            <source src={audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>)
                }

                {
                    audio ?
                        <Button className='action-btn1' type='danger' onClick={onChange}>
                            <TrashIcon className='icon' />
                        </Button> :
                        <div className='img'>
                            <AudioImage />
                            <input type='file' accept='audio/*' onChange={onChange} name={name} className='mt-1 d-inline-block' />
                        </div>
                }
            </div>
        </div>
    )
}
