import { useState, useEffect } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import TrashIcon from '../../../components/icons/TrashIcon';
import QuestionnarieInput from './QuestionnarieInput';
import usePermissions from '../../../hooks/usePermissions';
import Button from '../../../components/button/Button';


export default function QuestionnarieItem({ questionnarie, onSave, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...questionnarie });
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin, isTeacher } = usePermissions();

  useEffect(() => {
    setState({ ...questionnarie });
  }, [questionnarie]);


  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancel = () => {
    setIsEditing(false);
    setState({ ...questionnarie });
  }

  const handleSave = (editedquestionnarie) => {
    setIsEditing(false);
    const newquestionnarie = {
      ...editedquestionnarie,
      id: questionnarie.id
    };
    setState(newquestionnarie);
    if (onSave) onSave(newquestionnarie);
  }

  const handleDelete = () => {
    if (onDelete) onDelete(state);
  }

  const handleClick = () => {
    if (onClick) onClick(state);
  }

  if (isEditing) {
    return (
      <QuestionnarieInput
        onSave={handleSave}
        questionnarie={state}
        onCancel={handleCancel}
        className='mb-3'
      />)
  } else {
    return (
      <div className={`questionnarie-item ${className ? className : ''}`}>
        <div className='row align-items-center'>
          <div className='col' onClick={handleClick}>
            <div className='row align-items-center'>
              <div className='col-5 title-container'>
                <h5 className='questionnarie-title'>{state.name}</h5>
              </div>
              <div className='col align-items-center'>
                <div>{state.description}</div>
              </div>
            </div>
          </div>
          {
            (isAdmin || isTeacher) &&
            <div className='col-sm-2 d-flex justify-content-end'>
              <Button type='primary'>
                <PencilIcon className={'icon'} onClick={handleEdit} />
              </Button>
              <Button type='danger' className='ms-2'>
                <TrashIcon className={'icon'} onClick={handleDelete} />
              </Button>
            </div>
          }
        </div>
      </div>
    )
  }
}
