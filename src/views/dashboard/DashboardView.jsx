import React from 'react';
import UseDashboardView from './hooks/UseDashboardView';
import InfoCard from '../../components/infocard/InfoCard';
import Card from '../../components/card/Card';
import './styles.scss';
import ProgressGraph from '../../components/progressGraph/ProgressGraph';

export default function Dashboard() {

  const {groups, questionnaries, questions} = UseDashboardView();

  return (
    <div className='dashboard-view'>

      <div className='row'>
        <div className='col-12 col-lg-8 mb-4'>
          <div className='row'>
            <div className='col mb-4'>
              <InfoCard type='dark' title={questionnaries+''} description='Cuestionarios'/>
            </div>
            <div className='col mb-4'>
              <InfoCard type='primary' title={groups.length+''} description='Grupos'/>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <Card/>
            </div>
          </div>
        </div>

        <div className='col-lg-4 col'>
          <InfoCard 
            type='dark' 
            title={questions.length+''} 
            description='Preguntas'
            className='mb-4'
          />
          <Card className='p-4'>
            <div className='mb-4'>
              <ProgressGraph labelLeft='Listening' labelRight='20/300' value={0.5}/>
              <ProgressGraph labelLeft='Reading' labelRight='20/300' value={0.1}/>
              <ProgressGraph labelLeft='Speaking' labelRight='20/300' value={0.2}/>
              <ProgressGraph labelLeft='Writing' labelRight='20/300' value={0.3}/>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
