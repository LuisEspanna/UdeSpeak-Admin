import React from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useLevelsView from './hooks/useLevelsView';
import LevelInput from './helpers/LevelInput';
import LevelItem from './helpers/LevelItem';
import './styles.scss';
import NavigationButtons from '../../components/navigationButtons/NavigationButtons';

export default function LevelsAndGroups() {

  const {
    levels,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick
} = useLevelsView();

  return (
    <div className='levels-view'>
        <Card>
          <h4>Niveles</h4>
          <NavigationButtons/>
          {!isCreating ? 
            <div className='d-flex justify-content-center my-3'>
              <Button
                type='primary'
                title={'Crear nivel'}
                className='px-2'
                onClick={handleCreate}
              />
            </div> :
            <LevelInput
              onSave={handleSave}
              className='mb-3'
              onCancel={handleCreate}
            />}
          {
            isLoading ? <div>Cargando...</div> : 
            levels.map((level, index) => 
              <LevelItem
                key={index}
                level={level}
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
