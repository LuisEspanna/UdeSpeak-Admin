import React from 'react';
import './styles.scss';
import Card from '../../components/card/Card';
import useQuestionView from './hooks/useQuestionView';
import NavigationButtons from '../../components/navigationButtons/NavigationButtons';

export default function QuestionView() {
  const { currentView } = useQuestionView();
  return (
    <div className='question-view'>
      <NavigationButtons/>
      <Card>
        {
          currentView
        }
      </Card>
    </div>
  )
}
