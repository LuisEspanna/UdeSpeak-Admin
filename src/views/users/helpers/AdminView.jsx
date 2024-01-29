import React, { useRef } from 'react';
import Card from '../../../components/card/Card';
import InfoCard from '../../../components/infocard/InfoCard';
import UserInfo from './UserInfo';
import useUsersView from '../hooks/useUsersView';
import './styles.scss';
import { PERMISSIONS } from '../../../constants';
import { useSelector } from 'react-redux';

export default function AdminView() {
  const ref = useRef();
  const viewProps = useUsersView(ref);
  const { counters, results, handleSearch, filterApplied, allUsers } = viewProps;
  const user = useSelector(state => state.user);


  return (
    <div ref={ref} className='users-view'>
      <div className='row g-3 mb-3'>
        {
          user.permission === PERMISSIONS.ADMIN &&
          <>
            <div className='col'>
              <InfoCard
                type='dark'
                title={counters.Administrador || 0}
                description={`Administrador${allUsers.filter(r => r.permission === 'Administrador').length === 1 ? '' : 'es'}`}
                onClick={() => handleSearch('Administrador')} />
            </div>
            <div className='col'>
              <InfoCard
                type='primary'
                title={counters.Docente || 0}
                description={`Docente${allUsers.filter(r => r.permission === 'Docente').length === 1 ? '' : 's'}`}
                onClick={() => handleSearch('Docente')} />
            </div>
            <div className='col'>
              <InfoCard
                type='primary'
                title={counters.Estudiante || 0}
                description={`Estudiante${allUsers.filter(r => r.permission === 'Estudiante').length === 1 ? '' : 's'}`}
                onClick={() => handleSearch('Estudiante')} />
            </div>
          </>
        }
      </div>
      <div>
        <Card>
          {
            filterApplied.length > 0 && <p className='view-title'>Resultados:  {filterApplied}</p>
          }
          {
            results.map((user, i) =>
              <UserInfo
                key={i}
                user={user}
                userIndex={i}
                {...viewProps}
              />
            )
          }
        </Card>
      </div>
    </div>
  )
}
