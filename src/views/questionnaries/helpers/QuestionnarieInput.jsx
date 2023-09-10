import { useState } from 'react';
import Button from '../../../components/button/Button';
import TextField from '../../../components/form/textField/TextField';
import CloseIcon from '../../../components/icons/CloseIcon';
import SaveIcon from '../../../components/icons/SaveIcon';


export default function QuestionnarieInput({onSave, questionnarie, onCancel, className}) {
  const [state, setState] = useState({
    name: questionnarie ? questionnarie.name : '',
    description: questionnarie ? questionnarie.description : ''
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: (e.target.value) });
  }

  const handleSave = () => {
      if(state.name.length > 0 && state.description.length > 0){
          if(onSave)onSave(state);
          if(questionnarie?.id === null || questionnarie?.id === undefined) setState({name: '', description: ''});
      }else{
          console.log('Error');
      }
  }

  const handleCancel = () => {
      if(onCancel)onCancel();
  }

  return (
    <div className={`questionnarie-item ${className ? className : ''}`}>
        <TextField placeholder='Nombre del cuestionario' onChange={handleChange} name='name' value={state.name}/>
        <TextField className='mt-3' placeholder='Descripción' onChange={handleChange} name='description' value={state.description} />
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
