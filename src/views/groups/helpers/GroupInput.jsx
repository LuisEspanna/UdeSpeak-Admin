import { useState } from 'react';
import Button from '../../../components/button/Button';
import TextField from '../../../components/form/textField/TextField';
import CloseIcon from '../../../components/icons/CloseIcon';
import SaveIcon from '../../../components/icons/SaveIcon';
import { idGenerator } from '../../../functions';


export default function GroupInput({onSave, group, onCancel, className}) {
  const [state, setState] = useState({
    name: group ? group.name : '',
    description: group ? group.description : '',
    access_key: group ? group.access_key : '',
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: (e.target.value) });
  }

  const handleSave = () => {
      if(state.name.length > 0 && state.description.length > 0){
          if(onSave)onSave(state);
          if(group?.id === null || group?.id === undefined) setState({name: '', description: '', access_key: '' });
      }else{
          console.log('Error');
      }
  }

  const handleCancel = () => {
      if(onCancel)onCancel();
  }

  const handleGenerateAccessCode = () => {
    setState({...state, access_key: idGenerator(6)});
  }

  return (
    <div className={`group-item ${className ? className : ''}`}>
      <TextField placeholder='Nombre del grupo' onChange={handleChange} name='name' value={state.name}/>
        <TextField className='mt-3' placeholder='Descripción' onChange={handleChange} name='description' value={state.description} />
        <div className='row mt-3 w-100 p-0 m-0'>
          <div className='col p-0 m-0'>
            <TextField placeholder='Clave de acceso' onChange={handleChange} name='access_key' value={state.access_key} />
          </div>
          <div className='col-4 p-0 m-0 ps-2'>
            <Button type='primary' title='Generar clave aleatoria' className='w-100 p-3 my-2' onClick={handleGenerateAccessCode}/>
          </div>
          <span>Nota: si NO crea una clave, cualquier persona puede entrar al grupo</span>
        </div>
        <div className='d-flex justify-content-end mt-4'>
          <Button type='primary' className='p-1 me-2' onClick={handleSave}>
            <SaveIcon className='icon' />
            <span className='mx-1'>Guardar</span>
          </Button>
          <Button type='danger' className='p-1' onClick={handleCancel}>
            <CloseIcon className='icon' />
            <span className='mx-1'>Cancelar</span>
          </Button>
        </div>
    </div>
  )
}
