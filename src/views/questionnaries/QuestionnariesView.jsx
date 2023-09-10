import React from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useQuestionnariesView from './hooks/useQuestionnariesView';
import QuestionnarieInput from './helpers/QuestionnarieInput';
import QuestionnarieItem from './helpers/QuestionnarieItem';
import './styles.scss';
import { useRef } from 'react';

export default function QuestionnariesView() {
  const ref = useRef();
  const {
    results,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick
} = useQuestionnariesView(ref);

  return (
    <div className='questionnaries-view' ref={ref}>
        <Card>
          <h4>Cuestionarios</h4>
          {!isCreating ? 
            <div className='d-flex justify-content-center my-3'>
              <Button
                type='primary'
                title={'Crear cuestionario'}
                className='px-2'
                onClick={handleCreate}
              />
            </div> :
            <QuestionnarieInput
              onSave={handleSave}
              className='mb-3'
              onCancel={handleCreate}
            />}
          {
            isLoading ? <div>Cargando...</div> : 
            results.map((questionnarie, index) => 
              <QuestionnarieItem
                key={index}
                questionnarie={questionnarie}
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
