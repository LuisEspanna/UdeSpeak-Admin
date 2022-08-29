import React from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useGroupsView from './hooks/useGroupsView';
import GroupInput from './helpers/GroupInput';
import GroupItem from './helpers/GroupItem';
import './styles.scss';
import NavigationButtons from '../../components/navigationButtons/NavigationButtons';

export default function GroupsView() {

  const {
    groups,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick
} = useGroupsView();

  return (
    <div className='groups-view'>
        <Card>
          <h4>Grupos</h4>
          <NavigationButtons/>
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
            groups.map((group, index) => 
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
