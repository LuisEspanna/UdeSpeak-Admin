import React from 'react';
import Card from '../../components/card/Card';
import InfoCard from '../../components/infocard/InfoCard';
import UserInfo from './helpers/UserInfo';
import useUsersView from './hooks/useUsersView';
import './styles.scss';

export default function Users() {

  const viewProps = useUsersView();
  const { filteredUsers, counters, filterApplied, handleFilter } = viewProps;

  return (
    <div>
      <div className='row g-3 mb-3'>
        <div className='col'>
          <InfoCard
            type='dark'
            title={counters.Administrador || 0}
            description='Administradores'
            onClick={()=>handleFilter('Administrador')}/>
        </div>
        <div className='col'>
          <InfoCard 
            type='primary'
            title={counters.Docente || 0}
            description='Docentes'
            onClick={()=>handleFilter('Docente')}/>
        </div>
        <div className='col'>
          <InfoCard
            type='primary' 
            title={counters.Estudiante || 0} 
            description='Estudiantes'
            onClick={()=>handleFilter('Estudiante')}/>
        </div>
      </div>
      <div>
        <Card>
          <p className='view-title'>{filterApplied}</p>
          {
            filteredUsers.map((user, i)=>
              <UserInfo
                key = {i}
                user = {user}
                userIndex = {i}
                {...viewProps}
              />
            )
          }
        </Card>
      </div>
    </div>
  )
}
