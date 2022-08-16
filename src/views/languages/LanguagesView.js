import React from 'react';
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
    handleSave } = useLanguageView();

  return (
    <div className='language-view'>
        <Card>
          <div>Idiomas</div>
          {!isCreating && <LanguageInput onSave={handleSave}/>}
          {
            isLoading ? <div>Cargando...</div> : 
            languages.map((language, index) => 
              <LanguageItem
                key={index}
                language={language}
                onSave={handleSave}
            />)
          }
          
        </Card>
    </div>
  )
}
