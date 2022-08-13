import React from 'react';
import Card from '../../components/card/Card';
import LanguageInput from './helpers/LanguageInput';
import LanguageItem from './helpers/LanguageItem';
import useLanguageView from './hooks/useLanguageView';
import './styles.scss';

export default function LanguagesView() {
  const { languages, currentLanguage, isLoading, isCreating, handleEdit } = useLanguageView();

  return (
    <div className='language-view'>
        <Card>
          <div>Idiomas</div>
          {!isCreating && <LanguageInput/>}
          {
            isLoading ? <div>Cargando...</div> : 
            languages.map((language, index) => 
              <LanguageItem
                key={index}
                language={language}
                handleEdit={()=>handleEdit(index)}
                currentLanguage={currentLanguage}
            />)
          }
          
        </Card>
    </div>
  )
}
