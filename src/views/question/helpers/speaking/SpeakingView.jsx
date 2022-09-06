import React from 'react';
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import './styles.scss';
import TrashIcon from '../../../../components/icons/TrashIcon';
import useSpeakingView from './hooks/useSpeakingView';

export default function Speaking({question}) {
  const { state, handleChange } = useSpeakingView(question);

  return (
    <div className='speaking-view'>
      <h5><b>Speaking</b></h5>
      <div className='mt-4' />
      <TextField placeholder='Título' value={state?.title} name='title' className='mb-4' onChange={handleChange}/>
      <span className='my-4'>Subir imagen</span>
      <Button type='primary' className='mx-4 d-inline-block'>
        <TrashIcon className='icon'/>
      </Button>
      <input type='file' accept='image/*'
      //onChange={loadFile} 
      placeholder='imagen' name='image' className='mb-4 d-inline-block'/>
      <div>
        <span className='my-4'>Descripción</span>
      </div>
      <textarea id="w3review" name="w3review" rows="4" className='w-100' />
      <span className='my-4'>Respuestas correctas</span>
      <div></div>
      <Button type='primary' title='Agregar posible respuesta' className='px-2' />
      <div className='d-flex justify-content-center mt-4'>
        <Button type='primary' title='Guardar' className='px-4' />
      </div>
    </div>
  )
}
