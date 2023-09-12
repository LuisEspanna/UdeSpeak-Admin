import React from 'react';
import UseDashboardView from './hooks/UseDashboardView';
import InfoCard from '../../components/infocard/InfoCard';
import Card from '../../components/card/Card';
import './styles.scss';
import ProgressGraph from '../../components/progressGraph/ProgressGraph';
import MyBarChart from './helpers/MyBarChart';
import MyDoughnutChart from './helpers/MyDoughnutChart';

export default function Dashboard() {

  const { groups, questionnaries, questions, lineChartValues, doughnutChartValues } = UseDashboardView();

  const getCounter = (type) => {
    return questions.filter(q => q.type === type).length;
  }

  return (
    <div className='dashboard-view'>
      <div className='row'>
        <div className='col-12 col-lg-8 mb-4'>
          <div className='row'>
            <div className='col mb-4'>
              <InfoCard
                type='dark'
                title={questionnaries.length}
                description={`Cuestionario${questionnaries.length > 1?'s': ''}`}
              />
            </div>
            <div className='col mb-4'>
              <InfoCard
                type='primary'
                title={groups.length + ''}
                description={`Grupo${groups.length > 1?'s': ''}`}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <Card className='mb-4'>
                <MyBarChart values={lineChartValues}/>
              </Card>

              <Card>
                <MyDoughnutChart values={doughnutChartValues}/>
              </Card>
            </div>
          </div>
        </div>

        <div className='col-lg-4 col'>
          <InfoCard
            type='dark'
            title={questions.length + ''}
            description={`Pregunta${questions.length > 1?'s': ''}`}
            className='mb-4'
          />
          <Card className='p-4 mb-4'>
            <div className='mb-4'>
              <ProgressGraph
                labelLeft='Listening'
                labelRight={`${getCounter('listening')}/${questions.length}`}
                value={(getCounter('listening') / questions.length)}
              />
              <ProgressGraph
                labelLeft='Reading'
                labelRight={`${getCounter('reading')}/${questions.length}`}
                value={(getCounter('reading') / questions.length)}
              />
              <ProgressGraph
                labelLeft='Speaking'
                labelRight={`${getCounter('speaking')}/${questions.length}`}
                value={(getCounter('speaking') / questions.length)}
              />
              <ProgressGraph
                labelLeft='Writing'
                labelRight={`${getCounter('writing')}/${questions.length}`}
                value={(getCounter('writing') / questions.length)}
              />
            </div>
          </Card>

          {
            // TODO:
            /*
            <Card>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Grupo</th>
                  <th scope="col">Estudiantes</th>
                </tr>
              </thead>
              <tbody>
                {
                  groups.map((g, i) => 
                    <tr key={i}>
                      <td>{g.name}</td>
                      <td>{g.counter}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </Card>
            */
          }
        </div>
      </div>
    </div>
  )
}
