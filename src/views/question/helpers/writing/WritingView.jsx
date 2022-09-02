import React from 'react';
import Button from '../../../../components/button/Button';
import TextField from '../../../../components/form/textField/TextField';
import './styles.scss';
import useWritingView from './hooks/useWritingView';

export default function ListeningTab({question}) {
  const { state, handleChange } = useWritingView(question);

  return (
    <div className='speaking-view'>
      <h5><b>Speaking</b></h5>
      <div className='mt-4' />
      <TextField placeholder='Título' value={state?.title} name='title' className='mb-4' onChange={handleChange}/>
      <span className='my-4'>Descripción</span>
      <textarea id="w3review" name="w3review" rows="4" className='w-100' />
      <span className='my-4'>Subir imagen</span>
      <Button type='primary' title='Cargar' className='px-4' />
      <span className='my-4'>Descripción 2</span>
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
