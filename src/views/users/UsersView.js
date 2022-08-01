import React from 'react'
import Card from '../../components/card/Card'
import UserInfo from './helpers/UserInfo';
import useUsersView from './hooks/useUsersView'

export default function Users() {

  const { users } = useUsersView();

  return (
    <div>
      <div className='row g-3 mb-3'>
        <div className='col'><Card/></div>
        <div className='col'><Card/></div>
        <div className='col'><Card/></div>
      </div>
      <div className='content'>
        <Card>
          <p className='title'>Estudiantes</p>
          {
            users.map((user, i)=> //<div key={i}>{JSON.stringify(user)}</div>
              <UserInfo key={i} user={user}/>
            )
          }
        </Card>
      </div>
    </div>
  )
}
