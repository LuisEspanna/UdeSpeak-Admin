import React from 'react';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import LanguageInput from './helpers/LanguageInput';
import LanguageItem from './helpers/LanguageItem';
import useLanguageView from './hooks/useLanguageView';
import './styles.scss';
import { useRef } from 'react';

export default function LanguagesView() {
  const ref = useRef();

  const {
    isLoading,
    isCreating,
    handleSave,
    handleDelete,
    handleCreate,
    handleClick,
    results
  } = useLanguageView(ref);

  return (
    <div className='language-view' ref={ref}>
        <Card>
          <h4>Idiomas</h4>
          {!isCreating ? 
            <div className='d-flex justify-content-center my-3'>
              <Button
                type='primary'
                title={'Crear idioma'}
                className='px-2'
                onClick={handleCreate}
              />
            </div> :
            <LanguageInput
              onSave={handleSave}
              className='mb-3'
              onCancel={handleCreate}
            />}
          {
            isLoading ? <div>Cargando...</div> : 
            results.map((language, index) => 
              <LanguageItem
                key={index}
                language={language}
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
