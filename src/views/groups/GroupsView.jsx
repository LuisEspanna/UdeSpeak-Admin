import React from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useGroupsView from './hooks/useGroupsView';
import GroupInput from './helpers/GroupInput';
import GroupItem from './helpers/GroupItem';
import './styles.scss';
import { useRef } from 'react';

export default function GroupsView() {
  const ref = useRef();
  const {
    results,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick
} = useGroupsView(ref);

  return (
    <div className='groups-view' ref={ref}>
        <Card>
          <h4>Grupos</h4>
          {!isCreating ? 
            <div className='d-flex justify-content-center my-3'>
              <Button
                type='primary'
                title={'Crear grupo'}
                className='px-2'
                onClick={handleCreate}
              />
            </div> :
            <GroupInput
              onSave={handleSave}
              className='mb-3'
              onCancel={handleCreate}
            />}
          {
            isLoading ? <div>Cargando...</div> : 
            results.map((group, index) => 
              <GroupItem
                key={index}
                group={group}
                onSave={handleSave}
                onDelete={handleDelete}
                className='mb-3'
                onClick={handleClick}
            />)
          }          
        </Card>
    </div>
  )
}
