import React, { useRef } from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useLevelsView from './hooks/useLevelsView';
import LevelInput from './helpers/LevelInput';
import LevelItem from './helpers/LevelItem';
import './styles.scss';

export default function LevelsAndGroups() {
  const ref = useRef();
  const {
    results,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick
} = useLevelsView(ref);

  return (
    <div className='levels-view' ref={ref}>
        <Card>
          <h4>Niveles</h4>
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
            results.map((level, index) => 
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
