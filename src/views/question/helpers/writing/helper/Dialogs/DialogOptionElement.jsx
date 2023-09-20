import React, { useState } from 'react';
import TextField from '../../../../../../components/form/textField/TextField';
import './styles.scss';

export default function DialogListElement({option, setChanges}) {
    const [state, setState] = useState(option);

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
        if (setChanges)
            setChanges({...state, [e.target.name]: e.target.value});
    }

    return (
        <div className='dialog-option-element mx-2'>
            <p className='dialog-title'>Posible respuesta</p>
            <TextField 
                placeholder='Respuesta correcta' 
                value={state.description} 
                name='description' 
                onChange={handleChange}
                className='mt-3'
            />
        </div>
    )
}
