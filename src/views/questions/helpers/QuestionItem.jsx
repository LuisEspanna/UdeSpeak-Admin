import { useState, useEffect } from 'react';
import TrashIcon from '../../../components/icons/TrashIcon';


export default function QuestionItem({ question, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...question });

  useEffect(() => {
    setState({...question});
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
            <div className='col align-items-center'>
              <div>{state.type}</div>
            </div>
          </div>
        </div>
        <div className='col-2 d-flex'>
          <TrashIcon className={'icon auto-hide-icon'} onClick={handleDelete} />
        </div>
      </div>
    </div>
  )
}
