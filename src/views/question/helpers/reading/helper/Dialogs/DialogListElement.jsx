import React, { useState } from 'react';
import TextField from '../../../../../../components/form/textField/TextField';
import TogleeButton from '../../../../../../components/togleeButton/TogleeButton';
import './styles.scss';

export default function DialogListElement({option, setChanges}) {
    const [state, setState] = useState(option);

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
        if (setChanges)
            setChanges({...state, [e.target.name]: e.target.value});
    }

    return (
        <div className='dialog-list-element'>
            <p className='dialog-title'>Elemento de lista desplegable</p>
            <TextField 
                placeholder='Descripción' 
                value={state.description} 
                name='description' 
                onChange={handleChange} 
                maxLength = {20}
            />
            <div className='toglee-area'>
                <p className='mt-4'>Tipo de respuesta</p> 
                <TogleeButton 
                    isActive={state.isValid} 
                    state1={'Correcta'} state2={'Incorrecta'} 
                    onChange={handleChange} name='isValid'
                />
            </div>
        </div>
    )
}
