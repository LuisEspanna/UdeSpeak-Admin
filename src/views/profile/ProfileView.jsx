import React, { useRef } from 'react';
import Card from '../../components/card/Card';
import TextField from '../../components/form/textField/TextField';
import useProfileView from './hooks/useProfileView';
import Avatar from '../../components/avatar/Avatar';
import './styles.scss';
import { useSelector } from 'react-redux';
import { getDisplayName } from '../../functions';
import Button from '../../components/button/Button';


export default function ProfileView() {
  const ref = useRef();
  const user = useSelector(state => state.user);
  const {handleDeleteAccount} = useProfileView();

  return (
    <div ref={ref}>
      <Card className='profile-view'>

        <span className='view-title'>
          Mi Cuenta
        </span>

        <div className='user-card my-4 row p-4'>
          <div className='col-3'>
            <Avatar photoURL={user.photoURL}/>
          </div>
          <div className='col'>
            <div className='my-2 fs1'><b>{getDisplayName(user.displayName)}</b></div>
            <div className='my-2'>{user.email}</div>
            <div>
              <span>Permisos: </span> <span>{user.permission}</span>
            </div>         
          </div>
        </div>

        <span className='fs2 fbold mt-4'>
          Información general
        </span>

        <div className='cform'>
          <TextField className='mt-2' placeholder='Nombre completo'  name='name' value={user.displayName}/>
          <TextField className='mt-3' placeholder='Correo electrónico'  name='name' value={user.email}/>
        </div>

        <br/>
        <Button type='danger' title='Eliminar cuenta' className='px-2 my-2' onClick={handleDeleteAccount}/>
      </Card>
    </div>
  )
}
