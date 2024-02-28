import { useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import TextField from '../../../components/form/textField/TextField';
import CloseIcon from '../../../components/icons/CloseIcon';
import SaveIcon from '../../../components/icons/SaveIcon';
import { TYPES } from '../../../constants';

export default function QuestionInput({ onSave, question, onCancel, className }) {
  const [types, setTypes] = useState([]);
  
  useEffect(() => {
    let localItems = []
    for (const key in TYPES) {
      if (Object.hasOwnProperty.call(TYPES, key)) {
        localItems.push(TYPES[key]);
      }
    }
    setTypes(localItems);
  }, [])

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
      <select style={{textTransform: 'capitalize'}} onChange={handleChange} className="form-select" defaultValue={types[0]} name='type'>
        {
          types?.map((item, i) => 
            <option key={i} style={{textTransform: 'capitalize'}} value={item}>{item}</option>
          )
        }
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
