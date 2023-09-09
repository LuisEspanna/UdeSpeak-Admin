import React, { useRef, useState } from 'react';
import CloseIconChip from './helpers/CloseIconChip';
import './styles.scss';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export default function Chip({ value, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, () => setIsEditing(false));

    const onEnterKey = (e) => {
        if(e.key === 'Enter'){
            setIsEditing(false);
        }
    }

    return (
        <div className='chip' ref={ref}>
            {
                isEditing
                    ?
                    <input type='text' placeholder='Escribe algo aquí' value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={onEnterKey}/>
                    :
                    <>
                        <div className='chip-text' onClick={() => setIsEditing(true)}>
                            {value}
                        </div>
                        <CloseIconChip onClick={onDelete}/>
                    </>
            }
        </div>
    )
}
