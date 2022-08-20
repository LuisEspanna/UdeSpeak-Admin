import { useState, useEffect } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import TrashIcon from '../../../components/icons/TrashIcon';
import GroupInput from './GroupInput';


export default function GroupItem({ group, onSave, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...group });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setState({...group});
  }, [group]);


  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancel = () => {
    setIsEditing(false);
    setState({ ...group });
  }

  const handleSave = (editedgroup) => {
    setIsEditing(false);
    const newgroup = {
      ...editedgroup,
      id: group.id
    };
    setState(newgroup);
    if (onSave) onSave(newgroup);
  }

  const handleDelete = () => {
    if (onDelete) onDelete(state);
  }

  const handleClick = () => {
    if (onClick) onClick(state);
  }


  if (isEditing) {
    return (
      <GroupInput
        onSave={handleSave}
        group={state}
        onCancel={handleCancel}
        className='mb-3'
      />)
  } else {
    return (
      <div className={`group-item ${className ? className : ''}`}>
        <div className='row align-items-center'>
          <div className='col' onClick={handleClick}>
            <div className='row align-items-center'>
              <div className='col-2 title-container'>
                <h5 className='group-title'>{state.name}</h5>
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
