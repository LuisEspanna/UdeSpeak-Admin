import { useState, useEffect } from 'react';
import PencilIcon from '../../../components/icons/PencilIcon';
import TrashIcon from '../../../components/icons/TrashIcon';
import { getDisplayName } from '../../../functions';
import GroupInput from './GroupInput';
import usePermissions from '../../../hooks/usePermissions';
import Button from '../../../components/button/Button';


export default function GroupItem({ group, onSave, onDelete, className, onClick }) {
  const [state, setState] = useState({ ...group });
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin, isTeacher } = usePermissions();

  useEffect(() => {
    setState({ ...group });
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
              <div className='col-5 title-container'>
                <h5 className='group-title'>{state.name}</h5>
                <span className='mt-4'>Creado por:</span>
                <p className='m-0 p-0'>{(state.displayName ? getDisplayName(state.displayName) : '')}</p>
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
