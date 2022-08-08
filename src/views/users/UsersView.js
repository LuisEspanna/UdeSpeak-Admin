import React from 'react';
import Card from '../../components/card/Card';
import InfoCard from '../../components/infocard/InfoCard';
import UserInfo from './helpers/UserInfo';
import useUsersView from './hooks/useUsersView';
import './styles.scss';

export default function Users() {

  const viewProps = useUsersView();
  const { users } = viewProps;

  return (
    <div>
      <div className='row g-3 mb-3'>
        <div className='col'><InfoCard type='dark'/></div>
        <div className='col'><InfoCard type='primary'/></div>
        <div className='col'><InfoCard type='primary'/></div>
      </div>
      <div>
        <Card>
          <p className='view-title'>Estudiantes</p>
          {
            users.map((user, i)=>
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
