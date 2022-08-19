import { useState } from 'react';
import Button from '../../../components/button/Button';
import TextField from '../../../components/form/textField/TextField';
import CloseIcon from '../../../components/icons/CloseIcon';
import SaveIcon from '../../../components/icons/SaveIcon';


export default function LevelInput({onSave, level, onCancel, className}) {
  const [state, setState] = useState({
    title: level ? level.title : '',
    description: level ? level.description : ''
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: (e.target.value) });
  }

  const handleSave = () => {
      if(state.title.length > 0 && state.description.length > 0){
          if(onSave)onSave(state);
          if(level?.id === null || level?.id === undefined) setState({title: '', description: ''});
      }else{
          console.log('Error');
      }
  }

  const handleCancel = () => {
      if(onCancel)onCancel();
  }


  return (
    <div className={`level-item ${className ? className : ''}`}>
      <div className='row align-items-center'>
        <div className='title-container col-2'>
          <TextField placeholder='Nivel' onChange={handleChange} name='title' value={state.title}/>
        </div>
        <div className='col align-items-center'>
          <TextField placeholder='Descripción' onChange={handleChange} name='description' value={state.description} />
        </div>
        <div className='d-flex justify-content-end mt-2'>
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
    </div>
  )
}
