import { useState, useEffect } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import TrashIcon from '../../../components/icons/TrashIcon';
import QuestionInput from './QuestionInput';


export default function QuestionItem({ question, onSave, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...question });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setState({...question});
  }, [question]);


  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancel = () => {
    setIsEditing(false);
    setState({ ...question });
  }

  const handleSave = (editedquestion) => {
    setIsEditing(false);
    const newquestion = {
      ...editedquestion,
      id: question.id
    };
    setState(newquestion);
    if (onSave) onSave(newquestion);
  }

  const handleDelete = () => {
    if (onDelete) onDelete(state);
  }

  const handleClick = () => {
    if (onClick) onClick(state);
  }

  if (isEditing) {
    return (
      <QuestionInput
        onSave={handleSave}
        question={state}
        onCancel={handleCancel}
        className='mb-3'
      />)
  } else {
    return (
      <div className={`question-item ${className ? className : ''}`}>
        <div className='row align-items-center'>
          <div className='col' onClick={handleClick}>
            <div className='row align-items-center'>
              <div className='col-5 title-container'>
                <h5 className='question-title'>{state.name}</h5>
              </div>
              <div className='col align-items-center'>
                <div>{state.description}</div>
              </div>
            </div>
          </div>
          <div className='col-2 d-flex'>
            <PencilIcon className={'auto-hide-icon mx-1'} onClick={handleEdit} />
            <TrashIcon className={'auto-hide-icon'} onClick={handleDelete} />
          </div>
        </div>
      </div>
    )
  }
}
