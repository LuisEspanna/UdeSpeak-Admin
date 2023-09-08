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
        <div className='dialog-option-element'>
            <p className='dialog-title'>Opción de respuesta</p>
            <TextField 
                className='txt-letter'
                placeholder='Letra' 
                value={state.letter} 
                name='letter' 
                onChange={(e) => handleChange({target: {name: 'letter', value: e.target.value.toUpperCase()}})} 
                maxLength = {1}
            />
            <TextField 
                placeholder='Descripción' 
                value={state.description} 
                name='description' 
                onChange={handleChange} 
                maxLength = {20}
                className='mt-3'
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
