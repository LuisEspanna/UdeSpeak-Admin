import { useState, useEffect } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import TrashIcon from '../../../components/icons/TrashIcon';
import LevelInput from './LevelInput';


export default function LevelItem({ level, onSave, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...level });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setState({...level});
  }, [level]);


  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancel = () => {
    setIsEditing(false);
    setState({ ...level });
  }

  const handleSave = (editedlevel) => {
    setIsEditing(false);
    const newlevel = {
      ...editedlevel,
      id: level.id
    };
    setState(newlevel);
    if (onSave) onSave(newlevel);
  }

  const handleDelete = () => {
    if (onDelete) onDelete(state);
  }

  const handleClick = () => {
    if (onClick) onClick(state);
  }


  if (isEditing) {
    return (
      <LevelInput
        onSave={handleSave}
        level={state}
        onCancel={handleCancel}
        className='mb-3'
      />)
  } else {
    return (
      <div className={`level-item ${className ? className : ''}`}>
        <div className='row align-items-center'>
          <div className='col' onClick={handleClick}>
            <div className='row align-items-center'>
              <div className='col-2 title-container'>
                <h5 className='level-title'>{state.title}</h5>
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
