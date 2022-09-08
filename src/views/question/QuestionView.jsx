import React from 'react';
import './styles.scss';
import useQuestionView from './hooks/useQuestionView';

export default function QuestionView() {
  const { currentView } = useQuestionView();

  return (
    <div className='question-view'>
      {
          currentView
      }
    </div>
  )
}
