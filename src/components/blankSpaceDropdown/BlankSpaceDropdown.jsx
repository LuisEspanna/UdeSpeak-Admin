import React, { useEffect, useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import './styles.scss';
import { useState } from 'react';


function BlankSpaceDropDown({ options, xWPos, yWpos, className }) {
    const ref = useRef();
    const [show, setShow] = useState(false);
    useOnClickOutside(ref, () => setShow(false));
    const [mainText, setMainText] = useState('');

    useEffect(() => {
      setMainText('texto usuario');
    }, [options]);
    

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div
            ref={ref}
            className={`blank-space-dropdown ${className} ${show ? 'active' : ''} `}
        >
            <div className='cover' onClick={handleShow} />
            <p className='typewriter'>{mainText}</p>
            {
                show &&
                <div className='dropdown-window' style={{ left: xWPos, top: yWpos }}>
                    <p className='label mb-3'><u>Respuestas:</u></p>
                    {
                        options?.map((option, i) =>
                            <p
                                key={i}
                                className='dd-option'
                            >{option.description}</p>
                        )
                    }
                </div>
            }
        </div>
    )
}

BlankSpaceDropDown.defaultProps = {
    left: '-50px'
};

export default BlankSpaceDropDown;