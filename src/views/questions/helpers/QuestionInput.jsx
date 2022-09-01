import { useState } from 'react';
import Button from '../../../components/button/Button';
import TextField from '../../../components/form/textField/TextField';
import CloseIcon from '../../../components/icons/CloseIcon';
import SaveIcon from '../../../components/icons/SaveIcon';


export default function QuestionInput({ onSave, question, onCancel, className }) {
  const [state, setState] = useState({
    title: question ? question.title : '',
    type: question ? question.type : 'speaking'
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: (e.target.value) });
  }

  const handleSave = () => {
    if (state.title.length > 0 && state.type.length > 0) {
      if (onSave) onSave(state);
      if (question?.id === null || question?.id === undefined) setState({ title: '', type: '' });
    } else {
      console.log('Error');
    }
  }

  const handleCancel = () => {
    if (onCancel) onCancel();
  }

  return (
    <div className={`question-item ${className ? className : ''}`}>
      <TextField placeholder='Título' onChange={handleChange} name='title' value={state.title} />
      <select onChange={handleChange} className="form-select" defaultValue={'speaking'} name='type'>
        <option value={'speaking'}>Speaking</option>
        <option value={'listening'}>Listening</option>
        <option value={'reading'}>Reading</option>
        <option value={'writing'}>Writing</option>
      </select>
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
