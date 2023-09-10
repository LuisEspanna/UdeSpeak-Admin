import React, { useRef } from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useQuestionsView from './hooks/useQuestionsView';
import QuestionInput from './helpers/QuestionInput';
import QuestionItem from './helpers/QuestionItem';
import './styles.scss';

export default function QuestionsView() {
  const ref = useRef();
  const {
    results,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick
} = useQuestionsView(ref);

  return (
    <div className='questions-view' ref={ref}>
        <Card>
          <h4>Preguntas</h4>
          {!isCreating ? 
            <div className='d-flex justify-content-center my-3'>
              <Button
                type='primary'
                title={'Crear pregunta'}
                className='px-2'
                onClick={handleCreate}
              />
            </div> :
            <QuestionInput
              onSave={handleSave}
              className='mb-3'
              onCancel={handleCreate}
            />}
          {
            isLoading ? <div>Cargando...</div> : 
            results.map((question, index) => 
              <QuestionItem
                key={index}
                question={question}
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
