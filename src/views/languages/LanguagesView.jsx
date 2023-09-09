import React from 'react';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import LanguageInput from './helpers/LanguageInput';
import LanguageItem from './helpers/LanguageItem';
import useLanguageView from './hooks/useLanguageView';
import './styles.scss';

export default function LanguagesView() {
  const {
    languages,
    isLoading,
    isCreating,
    handleSave,
    handleDelete,
    handleCreate,
    handleClick
  } = useLanguageView();

  return (
    <div className='language-view'>
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
            languages.map((language, index) => 
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
