import React from 'react';
import Card from '../../components/card/Card';
import UserInfo from './helpers/UserInfo';
import useUsersView from './hooks/useUsersView';
import './styles.scss';

export default function Users() {

  const viewProps = useUsersView();
  const { users } = viewProps;

  return (
    <div>
      <div className='row g-3 mb-3'>
        <div className='col'><Card/></div>
        <div className='col'><Card/></div>
        <div className='col'><Card/></div>
      </div>
      <div>
        <Card>
          <p className='view-title'>Estudiantes</p>
          {
            users.map((user, i)=>
              <UserInfo
                key={i}
                user={user}
                {...viewProps}
              />
            )
          }
        </Card>
      </div>
    </div>
  )
}
