import React from 'react';
import Card from '../../components/card/Card';
import LanguageItem from './helpers/LanguageItem';
import useLanguageView from './hooks/useLanguageView';

export default function Languages() {
  const { languages, currentLanguage, isLoading, isEditing, handleEdit } = useLanguageView();

  return (
    <div className=''>
        <Card>
          <div>Idiomas</div>

          {
            languages.map((language, index) => <LanguageItem key={index} language={language} handleEdit={()=>handleEdit(index)}/>)
          }
        </Card>
    </div>
  )
}
