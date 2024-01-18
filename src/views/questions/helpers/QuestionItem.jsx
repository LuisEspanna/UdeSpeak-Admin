import { useState, useEffect } from 'react';
import TrashIcon from '../../../components/icons/TrashIcon';
import Button from '../../../components/button/Button';
import { toDateFormat } from '../../../functions/index';


export default function QuestionItem({ question, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...question });

  useEffect(() => {
    setState({ ...question });
  }, [question]);


  const handleDelete = () => {
    if (onDelete) onDelete(state);
  }

  const handleClick = () => {
    if (onClick) onClick(state);
  }

  return (
    <div className={`question-item ${className ? className : ''}`}>
      <div className='row align-items-center'>
        <div className='col' onClick={handleClick}>
          <div className='row align-items-center'>
            <div className='col-12 title-container'>
              <h5 className='question-title'>{state.title}</h5>
            </div>
            <div className='col align-items-center d-flex'>
              <span className='q-label'>Tipo: </span>
              <span className='q-type ms-2'>{state.type}</span>
            </div>
            <div className='col align-items-center d-flex'>
              <span className='q-label'>Creado en: </span>
              <span className='q-type ms-2'>{state.created_at && toDateFormat(new Date(state.created_at))}</span>
            </div>
            <div className='col align-items-center d-flex'>
              <span className='q-label'>
                {
                  state.edited_at ? 'Editado en: ' : 'Ejercicio sin contenido'
                } 
              </span>
              <span className='q-type ms-2'>{state.edited_at && toDateFormat(new Date(state.edited_at))}</span>
            </div>
          </div>
        </div>
        <div className='col-sm-2 d-flex justify-content-end'>
          <Button type='danger' className='ms-2'>
            <TrashIcon className={'icon'} onClick={handleDelete} />
          </Button>
        </div>
      </div>
    </div>
  )
}
