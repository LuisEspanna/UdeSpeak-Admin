import React from 'react';
import './styles.scss';
import QuestionField from '../questionField/QuestionField';

export default function OptionsArea({questions, onDeleteQuestion, onEditQuestion}) {
  return (
    <div className='questions-area'>
        {
            questions?.map((q, i) => 
                <QuestionField 
                    key={i} question={q} 
                    onChange={onEditQuestion} 
                    onDelete={onDeleteQuestion}
                />
            )
        }     
    </div>
  )
}

