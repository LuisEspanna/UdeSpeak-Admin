import React, { useRef } from 'react';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import useQuestionsView from './hooks/useQuestionsView';
import QuestionInput from './helpers/QuestionInput';
import QuestionItem from './helpers/QuestionItem';
import './styles.scss';
import FilterIcon from "../../components/icons/FilterIcon";

export default function QuestionsView() {
  const ref = useRef();
  const {
    results,
    isCreating,
    isLoading,
    handleCreate,
    handleSave,
    handleDelete,
    handleClick,
    handleFilter,
    filter
} = useQuestionsView(ref);

  return (
    <div className='questions-view' ref={ref}>
        <Card>
          <h4>Ejercicios</h4>
          <div className='d-flex justify-content-end'>
            <Button type='primary' className='px-2' onClick={handleFilter}>
              <FilterIcon className='icon'/> 
              {filter ? 'Título' : 'Última edición'}
            </Button>
          </div>
          {!isCreating ? 
            <div className='d-flex justify-content-center my-3'>
              <Button
                type='primary'
                title={'Crear ejercicio'}
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
