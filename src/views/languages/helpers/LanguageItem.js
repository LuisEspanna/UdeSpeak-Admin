import React from 'react';

export default function LanguageItem({language, handleEdit}) {
  return (
    <div>
        <div>{JSON.stringify(language)}</div>
        <div>Imagen</div>
        <div>Nombre</div>
        <div>id</div>
        <div onClick={handleEdit}>Editar</div>
    </div>
  )
}
