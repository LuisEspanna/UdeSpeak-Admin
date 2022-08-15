import React from 'react';

export default function LanguageItem({language, onEdit, currentLanguage, onSave}) {
    return (
        currentLanguage.id === language.id ?
        <div className='language-item'>
            <div>{JSON.stringify(language)}</div>
            <div>Imagen</div>
            <div>Nombre</div>
            <div>id</div>
            <div onClick={onEdit}>Editar</div>
        </div> : <div>
            <input type='text' placeholder='Nombre'/>
        </div>
    )
}