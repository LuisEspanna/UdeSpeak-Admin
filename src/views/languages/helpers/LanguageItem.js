import React from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';

export default function LanguageItem({language, onEdit, currentLanguage, onSave}) {
    return (
        (currentLanguage && currentLanguage.id === language.id) ?
        <div className='language-item'>
            <div>{JSON.stringify(language)}</div>
            <div>Imagen</div>
            <div>Nombre</div>
            <div>id</div>
            <div onClick={onEdit}>Editar</div>
        </div>
        : 
        <div className='language-item'>
            <div className='row align-items-center'>
                <div className='image-container'>
                    <img src={language.image} alt='' />
                </div>                
                <div className='col align-items-center'>
                    <p>{language.name}</p>
                </div>
                <div className='col-1'>
                    <PencilIcon className={'icon'}/>
                </div>
            </div>
        </div>
    )
}