import React, { useState } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import LanguageInput from './LanguageInput';

export default function LanguageItem({language, onSave}) {
    const [state, setState] = useState({...language});
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setState({...language});
    }

    const handleSave = (editedLanguage) => {
        setIsEditing(false);
        const newLanguage = {...editedLanguage ,id: language.id, prevImage: language.image};
        setState(newLanguage);
        if(onSave)onSave(newLanguage);
    }

    return (
        isEditing ?
        <LanguageInput onSave={handleSave} language={state} onCancel={handleCancel}/>
        : 
        <div className='language-item'>
            <div className='row align-items-center'>
                <div className='image-container'>
                    <img src={typeof(state.image) === 'string' ? state.image : URL.createObjectURL(state.image)} alt='' />
                </div>
                <div className='col align-items-center'>
                    <p>{state.name}</p>
                </div>
                <div className='col-1'>
                    <PencilIcon className={'icon'} id='edit-icon' onClick={handleEdit}/>
                </div>
            </div>
        </div>
    )
}